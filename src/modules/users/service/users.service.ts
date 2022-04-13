import { Injectable } from '@nestjs/common';

import { User } from '../entity/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

@Injectable()
export class UsersService {
  findAll(): User[] {
    return;
  }

  findOne(id: number): User {
    return;
  }

  create(payload: CreateUserDto): User {
    return;
  }

  update(id: number, payload: UpdateUserDto): User {
    return;
  }

  delete(id: number): User {
    return;
  }
}
