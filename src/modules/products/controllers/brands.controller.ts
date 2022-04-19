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

import { BrandsService } from '../services/brands.service';
import {
  CreateBrandDto,
  UpdateBrandDto,
  FilterBrandDto,
} from '../dtos/brands.dtos';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOperation({ summary: 'Get all brands' })
  @Get()
  get(@Query() params: FilterBrandDto) {
    return this.brandsService.findAll(params);
  }

  @ApiOperation({ summary: 'Get a brand by id' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new brand' })
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @ApiOperation({ summary: 'Update a brand' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a brand' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.delete(id);
  }
}
