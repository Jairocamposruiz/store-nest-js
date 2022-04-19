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

import { CustomersService } from '../services/customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  FilterCustomerDto,
} from '../dtos/customers.dtos';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'Get all customers' })
  @Get()
  get(@Query() params: FilterCustomerDto) {
    return this.customersService.findAll(params);
  }

  @ApiOperation({ summary: 'Get customer by id' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new customer' })
  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @ApiOperation({ summary: 'Update customer' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete customer' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.delete(id);
  }
}
