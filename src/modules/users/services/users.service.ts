import { Injectable } from '@nestjs/common';

import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(private readonly productsService: ProductsService) {}

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

  getOrdersByUser(id: number): Order[] {
    this.productsService.findAll();
    return;
  }
}
