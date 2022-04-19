import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';

import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
  FilterOrderItemDto,
} from '../dtos/order-item.dtos';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(params?: FilterOrderItemDto) {
    const { limit, offset, order, orderId } = params;
    const findOptions: FindManyOptions<OrderItem> = {};
    const where: FindConditions<OrderItem> = {};

    if (orderId) where.order = { id: orderId };
    if (order) findOptions.order = { id: order };
    findOptions.where = where;
    findOptions.skip = offset;
    findOptions.take = limit;

    return this.orderItemRepository.find(findOptions);
  }

  async findOne(id: number) {
    const orderItem = await this.orderItemRepository.findOne(id, {
      relations: ['order', 'product'],
    });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with ID "${id}" not found`);
    }
    return orderItem;
  }

  async create(payload: CreateOrderItemDto) {
    const order = await this.orderRepository.findOne(payload.orderId);
    if (!order) {
      throw new NotFoundException(`Order with id ${payload.orderId} not found`);
    }
    const product = await this.productRepository.findOne(payload.productId);
    if (!product) {
      throw new NotFoundException(
        `Product with id ${payload.productId} not found`,
      );
    }
    const orderItem = new OrderItem();
    orderItem.order = order;
    orderItem.product = product;
    orderItem.quantity = payload.quantity;
    return await this.orderItemRepository.save(orderItem);
  }

  async update(id: number, payload: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepository.findOne(id, {
      relations: ['order', 'product'],
    });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with ID "${id}" not found`);
    }
    if (payload.orderId) {
      const order = await this.orderRepository.findOne(payload.orderId);
      if (!order) {
        throw new NotFoundException(
          `Order with id ${payload.orderId} not found`,
        );
      }
      orderItem.order = order;
    }
    if (payload.productId) {
      const product = await this.productRepository.findOne(payload.productId);
      if (!product) {
        throw new NotFoundException(
          `Product with id ${payload.productId} not found`,
        );
      }
      orderItem.product = product;
    }
    if (payload.quantity) orderItem.quantity = payload.quantity;
    return await this.orderItemRepository.save(orderItem);
  }

  async delete(id: number) {
    const orderItem = await this.orderItemRepository.findOne(id);
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with ID "${id}" not found`);
    }
    return await this.orderItemRepository.remove(orderItem);
  }
}
