import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';

@Injectable()
export class CategoriesService {
  findAll(): Category[] {
    return;
  }

  findOne(id: number): Category {
    return;
  }

  create(payload: CreateCategoryDto): Category {
    return;
  }

  update(id: number, payload: UpdateCategoryDto): Category {
    return;
  }

  delete(id: number): Category {
    return;
  }
}
