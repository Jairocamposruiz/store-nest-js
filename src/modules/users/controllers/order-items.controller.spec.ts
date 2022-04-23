import { Test, TestingModule } from '@nestjs/testing';

import { OrderItemsService } from '../services/order-items.service';
import { OrderItemsController } from './order-items.controller';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
  FilterOrderItemDto,
} from '../dtos/order-item.dtos';

describe('OrderItemsController', () => {
  let controller: OrderItemsController;
  let spyService: OrderItemsService;

  beforeEach(async () => {
    const ApiSercieProvider = {
      provide: OrderItemsService,
      useValue: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemsController],
      providers: [OrderItemsService, ApiSercieProvider],
    }).compile();

    controller = module.get<OrderItemsController>(OrderItemsController);
    spyService = module.get<OrderItemsService>(OrderItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calling findAll', () => {
    expect(controller.get(new FilterOrderItemDto())).not.toEqual(null);
    expect(spyService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should calling findOne', () => {
    expect(controller.getOne(1)).not.toEqual(null);
    expect(spyService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should calling create', () => {
    expect(controller.create(new CreateOrderItemDto())).not.toEqual(null);
    expect(spyService.create).toHaveBeenCalledTimes(1);
  });

  it('should calling update', () => {
    expect(controller.update(1, new UpdateOrderItemDto())).not.toEqual(null);
    expect(spyService.update).toHaveBeenCalledTimes(1);
  });

  it('should calling delete', () => {
    expect(controller.delete(1)).not.toEqual(null);
    expect(spyService.delete).toHaveBeenCalledTimes(1);
  });
});
