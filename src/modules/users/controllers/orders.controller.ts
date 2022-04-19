import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { OrdersService } from '../services/orders.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  FilterOrderDto,
} from '../dtos/orders.dtos';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  get(@Query() params: FilterOrderDto) {
    return this.ordersService.findAll(params);
  }

  @ApiOperation({ summary: 'Get order by id' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new order' })
  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @ApiOperation({ summary: 'Update order' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete order' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.delete(id);
  }
}
