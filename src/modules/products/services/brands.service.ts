import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';

@Injectable()
export class BrandsService {
  findAll(): Brand[] {
    return;
  }

  findOne(id: number): Brand {
    return;
  }

  create(payload: CreateBrandDto): Brand {
    return;
  }

  update(id: number, payload: UpdateBrandDto): Brand {
    return;
  }

  delete(id: number): Brand {
    return;
  }
}
