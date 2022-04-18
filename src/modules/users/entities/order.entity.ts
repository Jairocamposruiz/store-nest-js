import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { User } from './user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Order extends BaseEntity {
  @Column({ type: 'date' })
  date: Date;

  @Column() //TODO: change type
  user: string;

  @Column() //TODO: change type
  products: string;
}
