import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';
import { LoginDto } from '../dtos/auth.dtos';

describe('AuthController', () => {
  let controller: AuthController;
  let spyService: AuthService;
  const request: any = {
    user: {
      sub: 1,
      role: 'test',
    },
  };

  beforeEach(async () => {
    const ApyServiceProvider = {
      provide: AuthService,
      useValue: {
        generateJWT: jest.fn(),
        refreshJWT: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, ApyServiceProvider],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    spyService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login should call generateJWT method of auth service', async () => {
    await controller.login(new LoginDto(), request);
    expect(spyService.generateJWT).toHaveBeenCalled();
  });

  it('refresh should call refreshJWT method of auth service', async () => {
    await controller.refresh(request);
    expect(spyService.refreshJWT).toHaveBeenCalled();
  });
});
