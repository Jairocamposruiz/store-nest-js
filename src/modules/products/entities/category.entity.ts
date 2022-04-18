import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;
}
