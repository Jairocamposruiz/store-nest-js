import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto,
} from '../dtos/categories.dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(params?: FilterCategoryDto) {
    const { limit, offset, orderBy, order } = params;
    const findOptions: FindManyOptions<Category> = {};
    const where: FindConditions<Category> = {};

    if (orderBy && order) {
      findOptions.order = { [orderBy]: order };
    } else if (order) {
      findOptions.order = { id: order };
    }
    findOptions.where = where;
    findOptions.skip = offset;
    findOptions.take = limit;

    return await this.categoryRepository.find(findOptions);
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async create(payload: CreateCategoryDto) {
    if (await this.existName(payload.name)) {
      throw new BadRequestException(
        `Category with name ${payload.name} already exists`,
      );
    }
    const newCategory = this.categoryRepository.create(payload);
    return await this.categoryRepository.save(newCategory);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    if (payload.name && category.name !== payload.name) {
      if (await this.existName(payload.name)) {
        throw new BadRequestException(
          `Category with name ${payload.name} already exists`,
        );
      }
    }
    this.categoryRepository.merge(category, payload);
    return await this.categoryRepository.save(category);
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return await this.categoryRepository.remove(category);
  }

  private async existName(name: string) {
    const existName = await this.categoryRepository.findOne({
      where: { name },
    });
    return !!existName;
  }
}
