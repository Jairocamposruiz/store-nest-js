import { Test, TestingModule } from '@nestjs/testing';

import { CustomersService } from '../services/customers.service';
import { CustomersController } from './customers.controller';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  FilterCustomerDto,
} from '../dtos/customers.dtos';

describe('CustomersController', () => {
  let controller: CustomersController;
  let spyService: CustomersService;
  const request: any = {
    user: {
      sub: 1,
      role: 'test',
    },
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: CustomersService,
      useValue: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findByUserId: jest.fn(),
        updateCustomerByUserId: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService, ApiServiceProvider],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    spyService = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calling findAll', () => {
    expect(controller.get(new FilterCustomerDto())).not.toEqual(null);
    expect(spyService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should calling findOne', () => {
    expect(controller.getOne(1)).not.toEqual(null);
    expect(spyService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should calling create', () => {
    expect(controller.create(new CreateCustomerDto())).not.toEqual(null);
    expect(spyService.create).toHaveBeenCalledTimes(1);
  });

  it('should calling update', () => {
    expect(controller.update(1, new UpdateCustomerDto())).not.toEqual(null);
    expect(spyService.update).toHaveBeenCalledTimes(1);
  });

  it('should calling delete', () => {
    expect(controller.delete(1)).not.toEqual(null);
    expect(spyService.delete).toHaveBeenCalledTimes(1);
  });

  it('should calling getMyCustomer', () => {
    expect(controller.getMyCustomer(request)).not.toEqual(null);
    expect(spyService.findByUserId).toHaveBeenCalledTimes(1);
  });

  it('should calling updateMyCustomer', () => {
    expect(
      controller.updateMyCustomer(new UpdateCustomerDto(), request),
    ).not.toEqual(null);
    expect(spyService.updateCustomerByUserId).toHaveBeenCalledTimes(1);
  });
});
