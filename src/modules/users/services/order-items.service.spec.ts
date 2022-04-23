import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

import { OrderItemsService } from './order-items.service';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
  FilterOrderItemDto,
} from '../dtos/order-item.dtos';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../../products/entities/product.entity';

describe('OrderItemsService', () => {
  let service: OrderItemsService;
  let sandbox: sinon.SinonSandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemsService,
        {
          provide: getRepositoryToken(OrderItem),
          useValue: sinon.createStubInstance(Repository),
        },
        {
          provide: getRepositoryToken(Order),
          useValue: sinon.createStubInstance(Repository),
        },
        {
          provide: getRepositoryToken(Product),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
    }).compile();

    service = module.get<OrderItemsService>(OrderItemsService);
  });

  afterAll(async () => {
    sandbox.restore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAll with expected params', async () => {
    const findAllStub = sandbox.stub(service, 'findAll');
    const filter = new FilterOrderItemDto();
    await service.findAll(filter);
    expect(findAllStub.calledWith(filter)).toBe(true);
  });

  it('should call findOne with expected params', async () => {
    const findOneStub = sandbox.stub(service, 'findOne');
    const id = 1;
    await service.findOne(id);
    expect(findOneStub.calledWith(id)).toBe(true);
  });

  it('should call create with expected params', async () => {
    const createStub = sandbox.stub(service, 'create');
    const createBrandDto = new CreateOrderItemDto();
    await service.create(createBrandDto);
    expect(createStub.calledWith(createBrandDto)).toBe(true);
  });

  it('should call update with expected params', async () => {
    const updateStub = sandbox.stub(service, 'update');
    const updateBrandDto = new UpdateOrderItemDto();
    const id = 1;
    await service.update(id, updateBrandDto);
    expect(updateStub.calledWith(id, updateBrandDto)).toBe(true);
  });

  it('should call delete with expected params', async () => {
    const deleteStub = sandbox.stub(service, 'delete');
    const id = 1;
    await service.delete(id);
    expect(deleteStub.calledWith(id)).toBe(true);
  });
});
