import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    if (await this.existName(payload.name)) {
      throw new BadRequestException(
        `Product with name ${payload.name} already exist`,
      );
    }
    const newProduct = this.productRepository.create(payload);
    return await this.productRepository.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    if (payload.name && product.name !== payload.name) {
      if (await this.existName(payload.name)) {
        throw new BadRequestException(
          `Product with name ${payload.name} already exist`,
        );
      }
    }
    this.productRepository.merge(product, payload);
    return await this.productRepository.save(product);
  }

  async delete(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return await this.productRepository.remove(product);
  }

  private async existName(name: string) {
    const existName = await this.productRepository.findOne({
      where: { name: name },
    });
    return !!existName;
  }
}
