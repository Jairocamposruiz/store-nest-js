import { Test, TestingModule } from '@nestjs/testing';

import { OrdersService } from '../services/orders.service';
import { OrdersController } from './orders.controller';
import {
  CreateOrderDto,
  UpdateOrderDto,
  FilterOrderDto,
} from '../dtos/orders.dtos';

describe('OrdersController', () => {
  let controller: OrdersController;
  let spyService: OrdersService;
  const request: any = {
    user: {
      sub: 1,
      role: 'test',
    },
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: OrdersService,
      useValue: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        getOrdersByUserId: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, ApiServiceProvider],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    spyService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calling findAll', () => {
    expect(controller.get(new FilterOrderDto())).not.toEqual(null);
    expect(spyService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should calling findOne', () => {
    expect(controller.getOne(1)).not.toEqual(null);
    expect(spyService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should calling create', () => {
    expect(controller.create(new CreateOrderDto())).not.toEqual(null);
    expect(spyService.create).toHaveBeenCalledTimes(1);
  });

  it('should calling update', () => {
    expect(controller.update(1, new UpdateOrderDto())).not.toEqual(null);
    expect(spyService.update).toHaveBeenCalledTimes(1);
  });

  it('should calling delete', () => {
    expect(controller.delete(1)).not.toEqual(null);
    expect(spyService.delete).toHaveBeenCalledTimes(1);
  });

  it('should calling getOrdersByUserId', () => {
    expect(controller.getMyOrders(request)).not.toEqual(null);
    expect(spyService.getOrdersByUserId).toHaveBeenCalledTimes(1);
  });
});
