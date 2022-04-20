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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  FilterUserDto,
  FilterOrdersByUserDto,
} from '../dtos/users.dtos';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/role.model';

@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get()
  get(@Query() params: FilterUserDto) {
    return this.usersService.findAll(params);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Get orders by user id' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get(':id/orders')
  getOrders(
    @Query() params: FilterOrdersByUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.getOrdersByUser(id, params);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @Public()
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @ApiOperation({ summary: 'Update user' })
  @Roles(Role.SUPER_ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
