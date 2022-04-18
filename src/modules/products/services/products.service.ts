import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id, {
      relations: ['brand', 'categories'],
    });
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
    const brand = await this.brandRepository.findOne(payload.brandId);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${payload.brandId} not found`);
    }
    const categories = await this.categoryRepository.findByIds(
      payload.categoriesId,
    );
    if (categories.length < 1) {
      throw new NotFoundException(
        `Categories with ids ${payload.categoriesId} not found`,
      );
    }
    newProduct.brand = brand;
    newProduct.categories = categories;
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
    if (payload.brandId) {
      const brand = await this.brandRepository.findOne(payload.brandId);
      if (!brand) {
        throw new NotFoundException(
          `Brand with id ${payload.brandId} not found`,
        );
      }
      product.brand = brand;
    }
    if (payload.categoriesId) {
      const categories = await this.categoryRepository.findByIds(
        payload.categoriesId,
      );
      if (categories.length < 1) {
        throw new NotFoundException(
          `Categories with ids ${payload.categoriesId} not found`,
        );
      }
      product.categories = categories;
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

  async removeCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne(productId, {
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }
    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return await this.productRepository.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne(productId, {
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }
    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    if (
      product.categories.filter((category) => category.id === categoryId)
        .length > 0
    ) {
      throw new BadRequestException(
        `Product with id ${productId} already has category with id ${categoryId}`,
      );
    }
    product.categories.push(category);
    return await this.productRepository.save(product);
  }

  private async existName(name: string) {
    const existName = await this.productRepository.findOne({
      where: { name },
    });
    return !!existName;
  }
}
