import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

import { CustomersService } from './customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  FilterCustomerDto,
} from '../dtos/customers.dtos';
import { Customer } from '../entities/customer.entity';
import { User } from '../entities/user.entity';

describe('CustomersService', () => {
  let service: CustomersService;
  let sandbox: sinon.SinonSandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: sinon.createStubInstance(Repository),
        },
        {
          provide: getRepositoryToken(User),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  afterAll(async () => {
    sandbox.restore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAll with expected params', async () => {
    const findAllStub = sandbox.stub(service, 'findAll');
    const filter = new FilterCustomerDto();
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
    const createBrandDto = new CreateCustomerDto();
    await service.create(createBrandDto);
    expect(createStub.calledWith(createBrandDto)).toBe(true);
  });

  it('should call update with expected params', async () => {
    const updateStub = sandbox.stub(service, 'update');
    const updateBrandDto = new UpdateCustomerDto();
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

  it('should call updateCustomerByUserId with expected params', async () => {
    const updateCustomerByUserIdStub = sandbox.stub(
      service,
      'updateCustomerByUserId',
    );
    const userId = 1;
    const updateCustomerDto = new UpdateCustomerDto();
    await service.updateCustomerByUserId(userId, updateCustomerDto);
    expect(
      updateCustomerByUserIdStub.calledWith(userId, updateCustomerDto),
    ).toBe(true);
  });

  it('should call findByUserId with expected params', async () => {
    const findByUserIdStub = sandbox.stub(service, 'findByUserId');
    const userId = 1;
    await service.findByUserId(userId);
    expect(findByUserIdStub.calledWith(userId)).toBe(true);
  });
});
