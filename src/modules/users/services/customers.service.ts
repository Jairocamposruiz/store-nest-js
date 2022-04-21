import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { User } from '../entities/user.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  FilterCustomerDto,
} from '../dtos/customers.dtos';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(params?: FilterCustomerDto) {
    const { limit, offset, order, orderBy } = params;
    const findOptions: FindManyOptions<Customer> = {};
    const where: FindConditions<Customer> = {};

    if (orderBy && order) {
      findOptions.order = { [orderBy]: order };
    } else if (order) {
      findOptions.order = { id: order };
    }
    findOptions.where = where;
    findOptions.skip = offset;
    findOptions.take = limit;
    return await this.customerRepository.find(findOptions);
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  async create(payload: CreateCustomerDto) {
    const newCustomer = this.customerRepository.create(payload);
    return await this.customerRepository.save(newCustomer);
  }

  async update(id: number, payload: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    this.customerRepository.merge(customer, payload);
    return await this.customerRepository.save(customer);
  }

  async delete(id: number) {
    const customer = await this.customerRepository.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return await this.customerRepository.remove(customer);
  }

  async updateCustomerByUserId(userId: number, payload: UpdateCustomerDto) {
    const user = await this.userRepository.findOne(userId, {
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`Your user not found`);
    }
    const customer = await this.customerRepository.findOne({
      id: user.customer.id,
    });
    if (!customer) {
      throw new NotFoundException(`Your customer not found`);
    }
    this.customerRepository.merge(customer, payload);
    return await this.customerRepository.save(customer);
  }

  async findByUserId(userId: number) {
    const user = await this.userRepository.findOne(userId, {
      relations: ['customer'],
    });
    if (!user || !user.customer) {
      throw new NotFoundException(`Your customer not found`);
    }
    return user.customer;
  }
}
