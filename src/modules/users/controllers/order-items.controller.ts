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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { OrderItemsService } from '../services/order-items.service';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
  FilterOrderItemDto,
} from '../dtos/order-item.dtos';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/role.model';

@ApiTags('Order Items')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @ApiOperation({ summary: 'Get all order items' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get()
  get(@Query() params: FilterOrderItemDto) {
    return this.orderItemsService.findAll(params);
  }

  @ApiOperation({ summary: 'Get order item by id' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new order item' })
  @Public()
  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @ApiOperation({ summary: 'Update an order item' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete an order item' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.delete(id);
  }

  //TODO: update my order items
  //TODO: delete my order items
}
