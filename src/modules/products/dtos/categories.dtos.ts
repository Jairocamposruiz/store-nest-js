import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { BaseFilterDto } from '../../common/dtos/base.filter.dto';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class FilterCategoryDto extends BaseFilterDto {
  @ApiProperty({ enum: ['name', 'id'] })
  @IsOptional()
  @IsEnum(['name', 'id'])
  readonly orderBy: string;
}
