import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrderItemsService } from '../services/order-items.service';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from '../dtos/order-item.dtos';

@ApiTags('Order Items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  //TODO: Implement more methods
}
