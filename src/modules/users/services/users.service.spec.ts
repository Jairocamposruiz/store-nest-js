import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  FilterUserDto,
  FilterOrdersByUserDto,
} from '../dtos/users.dtos';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';

describe('UsersService', () => {
  let service: UsersService;
  let sandbox: sinon.SinonSandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: sinon.createStubInstance(Repository),
        },
        {
          provide: getRepositoryToken(Order),
          useValue: sinon.createStubInstance(Repository),
        },
        {
          provide: getRepositoryToken(Customer),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    sandbox.restore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAll with expected params', async () => {
    const findAllStub = sandbox.stub(service, 'findAll');
    const filter = new FilterUserDto();
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
    const createBrandDto = new CreateUserDto();
    await service.create(createBrandDto);
    expect(createStub.calledWith(createBrandDto)).toBe(true);
  });

  it('should call update with expected params', async () => {
    const updateStub = sandbox.stub(service, 'update');
    const updateBrandDto = new UpdateUserDto();
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

  it('should call getOrdersByUser with expected params', async () => {
    const getOrdersByUserStub = sandbox.stub(service, 'getOrdersByUser');
    const filter = new FilterOrdersByUserDto();
    const id = 1;
    await service.getOrdersByUser(id, filter);
    expect(getOrdersByUserStub.calledWith(id, filter)).toBe(true);
  });

  it('should call findByEmail with expected params', async () => {
    const findByEmailStub = sandbox.stub(service, 'findByEmail');
    const email = 'test@email.com';
    await service.findByEmail(email);
    expect(findByEmailStub.calledWith(email)).toBe(true);
  });
});
