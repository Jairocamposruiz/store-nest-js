import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
  FilterBrandDto,
} from '../dtos/brands.dtos';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findAll(params?: FilterBrandDto) {
    const { limit, offset, order, orderBy } = params;
    const findOptions: FindManyOptions<Brand> = {};
    const where: FindConditions<Brand> = {};

    if (orderBy && order) {
      findOptions.order = { [orderBy]: order };
    } else if (order) {
      findOptions.order = { id: order };
    }
    findOptions.where = where;
    findOptions.skip = offset;
    findOptions.take = limit;

    return await this.brandRepository.find(findOptions);
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOne(id, {
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return brand;
  }

  async create(payload: CreateBrandDto) {
    if (await this.existName(payload.name)) {
      throw new BadRequestException(
        `Brand with name ${payload.name} already exists`,
      );
    }
    const newBrand = this.brandRepository.create(payload);
    return await this.brandRepository.save(newBrand);
  }

  async update(id: number, payload: UpdateBrandDto) {
    const brand = await this.brandRepository.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    if (payload.name && brand.name !== payload.name) {
      if (await this.existName(payload.name)) {
        throw new BadRequestException(
          `Brand with name ${payload.name} already exists`,
        );
      }
    }
    this.brandRepository.merge(brand, payload);
    return await this.brandRepository.save(brand);
  }

  async delete(id: number) {
    const brand = await this.brandRepository.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return await this.brandRepository.remove(brand);
  }

  private async existName(name: string) {
    const existName = await this.brandRepository.findOne({
      where: { name },
    });
    return !!existName;
  }
}
