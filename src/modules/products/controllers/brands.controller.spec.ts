import { Test, TestingModule } from '@nestjs/testing';

import { BrandsService } from '../services/brands.service';
import { BrandsController } from './brands.controller';
import {
  CreateBrandDto,
  UpdateBrandDto,
  FilterBrandDto,
} from '../dtos/brands.dtos';

describe('BrandsController', () => {
  let controller: BrandsController;
  let spyService: BrandsService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: BrandsService,
      useValue: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [BrandsService, ApiServiceProvider],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    spyService = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calling findAll', () => {
    expect(controller.get(new FilterBrandDto())).not.toEqual(null);
    expect(spyService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should calling findOne', () => {
    expect(controller.getOne(1)).not.toEqual(null);
    expect(spyService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should calling create', () => {
    expect(controller.create(new CreateBrandDto())).not.toEqual(null);
    expect(spyService.create).toHaveBeenCalledTimes(1);
  });

  it('should calling update', () => {
    expect(controller.update(1, new UpdateBrandDto())).not.toEqual(null);
    expect(spyService.update).toHaveBeenCalledTimes(1);
  });

  it('should calling delete', () => {
    expect(controller.delete(1)).not.toEqual(null);
    expect(spyService.delete).toHaveBeenCalledTimes(1);
  });
});
