import { Test, TestingModule } from '@nestjs/testing';

import { ProductsService } from '../services/products.service';
import { ProductsController } from './products.controller';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dtos';

describe('ProductsController', () => {
  let controller: ProductsController;
  let spyService: ProductsService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ProductsService,
      useValue: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        removeCategoryToProduct: jest.fn(),
        addCategoryToProduct: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, ApiServiceProvider],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    spyService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calling findAll', () => {
    expect(controller.get(new FilterProductsDto())).not.toEqual(null);
    expect(spyService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should calling findOne', () => {
    expect(controller.getOne(1)).not.toEqual(null);
    expect(spyService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should calling create', () => {
    expect(controller.create(new CreateProductDto())).not.toEqual(null);
    expect(spyService.create).toHaveBeenCalledTimes(1);
  });

  it('should calling update', () => {
    expect(controller.update(1, new UpdateProductDto())).not.toEqual(null);
    expect(spyService.update).toHaveBeenCalledTimes(1);
  });

  it('should calling delete', () => {
    expect(controller.delete(1)).not.toEqual(null);
    expect(spyService.delete).toHaveBeenCalledTimes(1);
  });

  it('should calling removeCategoryToProduct', () => {
    expect(controller.removeCategory(1, 1)).not.toEqual(null);
    expect(spyService.removeCategoryToProduct).toHaveBeenCalledTimes(1);
  });

  it('should calling addCategoryToProduct', () => {
    expect(controller.addCategory(1, 1)).not.toEqual(null);
    expect(spyService.addCategoryToProduct).toHaveBeenCalledTimes(1);
  });
});
