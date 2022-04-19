import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';

import {
  CreateOrderDto,
  UpdateOrderDto,
  FilterOrderDto,
} from '../dtos/orders.dtos';
import { Order } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(params?: FilterOrderDto) {
    const { limit, offset, order } = params;
    const findOptions: FindManyOptions<Order> = {};
    const where: FindConditions<Order> = {};

    if (order) findOptions.order = { id: order };
    findOptions.where = where;
    findOptions.skip = offset;
    findOptions.take = limit;

    return await this.orderRepository.find(findOptions);
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne(id, {
      relations: ['customer', 'orderItems', 'orderItems.product'], //Relación de segundo nivel
    });
    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return order;
  }

  async create(payload: CreateOrderDto) {
    const order = new Order();
    const customer = await this.customerRepository.findOne(payload.customerId);
    if (!customer) {
      throw new NotFoundException(
        `Customer with ID "${payload.customerId}" not found`,
      );
    }
    order.customer = customer;
    return await this.orderRepository.save(order);
  }

  async update(id: number, payload: UpdateOrderDto) {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    if (payload.customerId) {
      const customer = await this.customerRepository.findOne(
        payload.customerId,
      );
      if (!customer) {
        throw new NotFoundException(
          `Customer with ID "${payload.customerId}" not found`,
        );
      }
      order.customer = customer;
    }
    return await this.orderRepository.save(order);
  }

  async delete(id: number) {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }
    return await this.orderRepository.remove(order);
  }
}
