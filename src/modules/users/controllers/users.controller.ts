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

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  get(
    @Query('limit', ParseIntPipe) limit = 100,
    @Query('offset', ParseIntPipe) offset = 10,
  ) {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  getOrders(
    @Query('limit', ParseIntPipe) limit = 100,
    @Query('offset', ParseIntPipe) offset = 10,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.getOrdersByUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
