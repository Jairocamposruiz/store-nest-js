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

import { CategoriesService } from '../services/categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto,
} from '../dtos/categories.dtos';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  get(@Query() params: FilterCategoryDto) {
    return this.categoriesService.findAll(params);
  }

  @ApiOperation({ summary: 'Get category by id' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new category' })
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @ApiOperation({ summary: 'Update a category' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a category' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }
}
