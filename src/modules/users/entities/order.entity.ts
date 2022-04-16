import { User } from './user.entity';
import { Product } from '../../products/entities/product.entity';

export class Order {
  id: number;
  date: Date;
  user: User;
  products: Product[];
}
