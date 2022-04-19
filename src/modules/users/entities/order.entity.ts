import { ManyToOne, OneToMany, Entity, JoinColumn, Index } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { BaseEntity } from '../../common/entities/base.entity';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'orders' })
@Index(['customer'])
export class Order extends BaseEntity {
  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Expose()
  get products() {
    if (!this.orderItems) {
      return [];
    }
    return this.orderItems
      .filter((item) => !!item)
      .map((item) => {
        const { createAt, updateAt, ...rest } = item;
        return {
          ...rest,
          itemId: item.id,
          quantity: item.quantity,
        };
      });
  }

  @Expose()
  get total() {
    if (!this.orderItems) {
      return 0;
    }
    return this.orderItems
      .filter((item) => !!item)
      .reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
