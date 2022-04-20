import { Role } from './role.model';

export interface PayloadToken {
  role: Role;
  sub: number;
}
