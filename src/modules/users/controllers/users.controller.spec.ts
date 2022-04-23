import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';
import {
  CreateUserDto,
  UpdateUserDto,
  FilterUserDto,
  FilterOrdersByUserDto,
  CreateMyUserDto,
  UpdateMyUserDto,
} from '../dtos/users.dtos';

describe('UsersController', () => {
  let controller: UsersController;
  let spyService: UsersService;
  const request: any = {
    user: {
      sub: 1,
      role: 'test',
    },
  };

  beforeEach(async () => {
    const ApyServiceProvider = {
      provide: UsersService,
      useValue: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        getOrdersByUser: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, ApyServiceProvider],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    spyService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get should calling findAll', () => {
    expect(controller.get(new FilterUserDto())).not.toEqual(null);
    expect(spyService.findAll).toHaveBeenCalledTimes(1);
  });

  it('getOne should calling findOne', () => {
    expect(controller.getOne(1)).not.toEqual(null);
    expect(spyService.findOne).toHaveBeenCalledTimes(1);
  });

  it('should calling create', () => {
    expect(controller.create(new CreateUserDto())).not.toEqual(null);
    expect(spyService.create).toHaveBeenCalledTimes(1);
  });

  it('update should calling update', () => {
    expect(controller.update(1, new UpdateUserDto())).not.toEqual(null);
    expect(spyService.update).toHaveBeenCalledTimes(1);
  });

  it('delete should calling delete', () => {
    expect(controller.delete(1)).not.toEqual(null);
    expect(spyService.delete).toHaveBeenCalledTimes(1);
  });

  it('getMyUser should calling findOne', () => {
    expect(controller.getMyUser(request)).not.toEqual(null);
    expect(spyService.findOne).toHaveBeenCalledTimes(1);
  });

  it('getOrders should calling getOrdersByUser', () => {
    expect(
      controller.getOrders(new FilterOrdersByUserDto(), request),
    ).not.toEqual(null);
    expect(spyService.getOrdersByUser).toHaveBeenCalledTimes(1);
  });

  it('createMyUser should calling create', () => {
    expect(controller.createMyUser(new CreateMyUserDto())).not.toEqual(null);
    expect(spyService.create).toHaveBeenCalledTimes(1);
  });

  it('updateMyUser should calling update', () => {
    expect(controller.updateMyUser(new UpdateMyUserDto(), request)).not.toEqual(
      null,
    );
    expect(spyService.update).toHaveBeenCalledTimes(1);
  });
});
