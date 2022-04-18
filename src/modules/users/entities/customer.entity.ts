import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Order } from './order.entity';
import { User } from './user.entity';

@Entity()
export class Customer extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
