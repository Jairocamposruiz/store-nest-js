import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
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

  //TODO: Implement more methods
}
