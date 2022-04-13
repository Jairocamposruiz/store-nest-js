import { Injectable } from '@nestjs/common';

import { Customer } from '../entity/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dtos';

@Injectable()
export class CustomersService {
  findAll(): Customer[] {
    return;
  }

  findOne(id: number): Customer {
    return;
  }

  create(payload: CreateCustomerDto): Customer {
    return;
  }

  update(id: number, payload: UpdateCustomerDto): Customer {
    return;
  }

  delete(id: number): Customer {
    return;
  }
}
