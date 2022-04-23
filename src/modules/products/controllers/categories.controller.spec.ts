import { Test, TestingModule } from '@nestjs/testing';

import { CategoriesService } from '../services/categories.service';
import { CategoriesController } from './categories.controller';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto,
} from '../dtos/categories.dtos';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let spyService: CategoriesService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: CategoriesService,
      useValue: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService, ApiServiceProvider],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    spyService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calling findAll', () => {
    expect(controller.get(new FilterCategoryDto())).not.toEqual(null);
    expect(spyService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should calling findOne', () => {
    expect(controller.getOne(1)).not.toEqual(null);
    expect(spyService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should calling create', () => {
    expect(controller.create(new CreateCategoryDto())).not.toEqual(null);
    expect(spyService.create).toHaveBeenCalledTimes(1);
  });

  it('should calling update', () => {
    expect(controller.update(1, new UpdateCategoryDto())).not.toEqual(null);
    expect(spyService.update).toHaveBeenCalledTimes(1);
  });

  it('should calling delete', () => {
    expect(controller.delete(1)).not.toEqual(null);
    expect(spyService.delete).toHaveBeenCalledTimes(1);
  });
});
