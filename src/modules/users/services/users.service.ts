import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  FilterUserDto,
  FilterOrdersByUserDto,
} from '../dtos/users.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(params?: FilterUserDto) {
    const { limit, offset, order, orderBy } = params;
    const findOptions: FindManyOptions<User> = {};
    const where: FindConditions<User> = {};

    if (orderBy && order) {
      findOptions.order = { [orderBy]: order };
    } else if (order) {
      findOptions.order = { id: order };
    }
    findOptions.where = where;
    findOptions.skip = offset;
    findOptions.take = limit;
    findOptions.relations = ['customer'];

    return await this.userRepository.find(findOptions);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    if (await this.existEmail(payload.email)) {
      throw new BadRequestException(
        `User with email "${payload.email}" already exists`,
      );
    }
    const newUser = this.userRepository.create(payload);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    if (payload.customerId) {
      const customer = await this.customerRepository.findOne(
        payload.customerId,
        {
          relations: ['user'],
        },
      );
      if (!customer) {
        throw new NotFoundException(
          `Customer with ID "${payload.customerId}" not found`,
        );
      }
      if (customer.user) {
        throw new BadRequestException(
          `Customer with ID "${payload.customerId}" already has a user`,
        );
      }
      newUser.customer = customer;
    }
    return await this.userRepository.save(newUser);
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    if (payload.email && user.email !== payload.email) {
      if (await this.existEmail(payload.email)) {
        throw new BadRequestException(
          `User with email "${payload.email}" already exists`,
        );
      }
    }
    this.userRepository.merge(user, payload);
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return await this.userRepository.remove(user);
  }

  async getOrdersByUser(id: number, params: FilterOrdersByUserDto) {
    const { limit, offset, order } = params;
    const findOptions: FindManyOptions<Order> = {};
    const where: FindConditions<Order> = {};
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    if (order) {
      findOptions.order = { id: order };
    }
    findOptions.where = where;
    findOptions.skip = offset;
    findOptions.take = limit;
    findOptions.relations = ['customer', 'orderItems', 'orderItems.product'];

    return await this.orderRepository.find(findOptions);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  private async existEmail(email: string) {
    const existEmail = await this.userRepository.findOne({
      where: { email },
    });
    return !!existEmail;
  }
}
