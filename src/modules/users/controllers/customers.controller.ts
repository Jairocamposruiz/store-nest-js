import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/models/role.model';
import { PayloadToken } from '../../auth/models/token.model';
import {
  CreateCustomerDto,
  FilterCustomerDto,
  UpdateCustomerDto,
} from '../dtos/customers.dtos';

import { CustomersService } from '../services/customers.service';

@ApiTags('Customers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'Get all customers' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get()
  get(@Query() params: FilterCustomerDto) {
    return this.customersService.findAll(params);
  }

  @ApiOperation({ summary: 'Get my customer' })
  @Roles(Role.CUSTOMER, Role.ADMIN, Role.SUPER_ADMIN)
  @Get('my-customer')
  getMyCustomer(@Req() req: Request) {
    const payloadToken = req.user as PayloadToken;
    const userId = payloadToken.sub;
    return this.customersService.findByUserId(userId);
  }

  @ApiOperation({ summary: 'Get customer by id' })
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new customer' })
  @Public()
  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @ApiOperation({ summary: 'Update my customer' })
  @Roles(Role.CUSTOMER, Role.ADMIN, Role.SUPER_ADMIN)
  @Put('my-customer')
  updateMyCustomer(@Body() payload: UpdateCustomerDto, @Req() req: Request) {
    const payloadToken = req.user as PayloadToken;
    const userId = payloadToken.sub;
    return this.customersService.updateCustomerByUserId(userId, payload);
  }

  @ApiOperation({ summary: 'Update customer' })
  @Roles(Role.SUPER_ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete customer' })
  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.delete(id);
  }
}
