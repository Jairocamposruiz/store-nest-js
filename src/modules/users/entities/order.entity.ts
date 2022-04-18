import { ManyToOne, OneToMany, Entity } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Customer } from './customer.entity';
import { OrderItem } from './orderItem.entity';

@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
