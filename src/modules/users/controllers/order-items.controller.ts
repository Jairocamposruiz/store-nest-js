import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { OrderItemsService } from '../services/order-items.service';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
  FilterOrderItemDto,
} from '../dtos/order-item.dtos';

@ApiTags('Order Items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @ApiOperation({ summary: 'Get all order items' })
  @Get()
  get(@Query() params: FilterOrderItemDto) {
    return this.orderItemsService.findAll(params);
  }

  @ApiOperation({ summary: 'Get order item by id' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new order item' })
  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @ApiOperation({ summary: 'Update an order item' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete an order item' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.delete(id);
  }
}
