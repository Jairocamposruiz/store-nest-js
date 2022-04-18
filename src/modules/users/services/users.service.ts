import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { CustomersService } from './customers.service';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly customersService: CustomersService,
    private readonly productsService: ProductsService,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      relations: ['customer'],
    });
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

    if (payload.customerId) {
      const customer = await this.customersService.findOne(payload.customerId);
      if (!customer) {
        throw new NotFoundException(
          `Customer with ID "${payload.customerId}" not found`,
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

  async getOrdersByUser(id: number) {
    //TODO: implement
    await this.productsService.findAll();
    return;
  }

  private async existEmail(email: string) {
    const existEmail = await this.userRepository.findOne({
      where: { email },
    });
    return !!existEmail;
  }
}
