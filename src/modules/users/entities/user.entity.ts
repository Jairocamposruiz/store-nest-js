import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne, JoinColumn, Index } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Role } from '../../auth/models/role.model';
import { Customer } from './customer.entity';

@Entity({ name: 'users' })
@Index(['role'])
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 10 })
  role: Role;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
