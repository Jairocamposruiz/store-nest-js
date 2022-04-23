import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

import { OrdersService } from './orders.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  FilterOrderDto,
} from '../dtos/orders.dtos';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { Customer } from '../entities/customer.entity';

describe('OrdersService', () => {
  let service: OrdersService;
  let sandbox: sinon.SinonSandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: sinon.createStubInstance(Repository),
        },
        {
          provide: getRepositoryToken(User),
          useValue: sinon.createStubInstance(Repository),
        },
        {
          provide: getRepositoryToken(Customer),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  afterAll(async () => {
    sandbox.restore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAll with expected params', async () => {
    const findAllStub = sandbox.stub(service, 'findAll');
    const filter = new FilterOrderDto();
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
    const createBrandDto = new CreateOrderDto();
    await service.create(createBrandDto);
    expect(createStub.calledWith(createBrandDto)).toBe(true);
  });

  it('should call update with expected params', async () => {
    const updateStub = sandbox.stub(service, 'update');
    const updateBrandDto = new UpdateOrderDto();
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

  it('should call getOrdersByUserId with expected params', async () => {
    const getOrdersByUserIdStub = sandbox.stub(service, 'getOrdersByUserId');
    const userId = 1;
    await service.getOrdersByUserId(userId);
    expect(getOrdersByUserIdStub.calledWith(userId)).toBe(true);
  });
});
