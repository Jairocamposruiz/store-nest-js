import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../models/role.model';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const payloadToken = request.user as PayloadToken;
    if (!payloadToken) {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }
    const isAuth = roles.some((role) => role === payloadToken.role);
    if (!isAuth) {
      throw new ForbiddenException(
        'You do not have the role necessary to access this resource',
      );
    }
    return true;
  }
}
