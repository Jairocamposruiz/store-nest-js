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
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { PayloadToken } from '../../auth/models/token.model';

import { UsersService } from '../services/users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  FilterUserDto,
  FilterOrdersByUserDto,
  CreateMyUserDto,
  UpdateMyUserDto,
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

  @ApiOperation({ summary: 'Get my user' })
  @Roles(Role.CUSTOMER, Role.ADMIN, Role.SUPER_ADMIN)
  @Get('my-user')
  getMyUser(@Req() req: Request) {
    const payloadToken = req.user as PayloadToken;
    const userId = payloadToken.sub;
    return this.usersService.findOne(userId);
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

  @ApiOperation({ summary: 'Create my user' })
  @Roles(Role.CUSTOMER, Role.ADMIN, Role.SUPER_ADMIN)
  @Post('my-user')
  createMyUser(@Body() user: CreateMyUserDto) {
    return this.usersService.create({ ...user, role: Role.CUSTOMER });
  }

  @ApiOperation({ summary: 'Create a new user' })
  @Roles(Role.SUPER_ADMIN)
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  //TODO: En caso de quere meter verificación de contraseña
  @ApiOperation({ summary: 'Update my user' })
  @Roles(Role.CUSTOMER, Role.ADMIN, Role.SUPER_ADMIN)
  @Put('my-user')
  updateMyUser(@Body() user: UpdateMyUserDto, @Req() req: Request) {
    const payloadToken = req.user as PayloadToken;
    const userId = payloadToken.sub;
    return this.usersService.update(userId, user);
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
