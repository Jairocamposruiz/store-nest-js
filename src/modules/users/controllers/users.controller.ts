import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  FilterUserDto,
  FilterOrdersByUserDto,
} from '../dtos/users.dtos';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  get(@Query() params: FilterUserDto) {
    return this.usersService.findAll(params);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Get orders by user id' })
  @Get(':id/orders')
  getOrders(
    @Query() params: FilterOrdersByUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.getOrdersByUser(id, params);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @ApiOperation({ summary: 'Update user' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
