import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Customer } from './customer.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 10 })
  role: string;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn()
  customer: Customer;
}
