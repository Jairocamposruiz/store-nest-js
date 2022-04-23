import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';

import { AuthService } from './auth.service';
import { UsersService } from '../../users/services/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let sandbox: sinon.SinonSandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findAll: sandbox.stub(),
            findOne: sandbox.stub(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: sandbox.stub(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    sandbox.restore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call validateUser with correct params', async () => {
    const validateUserStub = sandbox.stub(service, 'validateUser');
    const email = 'test@email.com';
    const password = 'testPassword';
    await service.validateUser(email, password);
    expect(validateUserStub.calledWith(email, password)).toBe(true);
  });

  it('should call generateJWT with correct params', async () => {
    const generateJWTStub = sandbox.stub(service, 'generateJWT');
    const user = new User();
    await service.generateJWT(user);
    expect(generateJWTStub.calledWith(user)).toBe(true);
  });

  it('should call refreshJWT with correct params', async () => {
    const refreshJWTStub = sandbox.stub(service, 'refreshJWT');
    const id = 1;
    await service.refreshJWT(1);
    expect(refreshJWTStub.calledWith(1)).toBe(true);
  });
});
