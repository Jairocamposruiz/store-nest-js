import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sinon from 'sinon';

import { CategoriesService } from './categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto,
} from '../dtos/categories.dtos';
import { Category } from '../entities/category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let sandbox: sinon.SinonSandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  afterAll(async () => {
    sandbox.restore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAll with expected params', async () => {
    const findAllStub = sandbox.stub(service, 'findAll');
    const filter = new FilterCategoryDto();
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
    const createBrandDto = new CreateCategoryDto();
    await service.create(createBrandDto);
    expect(createStub.calledWith(createBrandDto)).toBe(true);
  });

  it('should call update with expected params', async () => {
    const updateStub = sandbox.stub(service, 'update');
    const updateBrandDto = new UpdateCategoryDto();
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
