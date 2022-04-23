import {
  IsString,
  IsUrl,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { BaseFilterDto } from '../../common/dtos/base.filter.dto';

export class CreateBrandDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

export class FilterBrandDto extends BaseFilterDto {
  @ApiProperty({ enum: ['name', 'id'] })
  @IsOptional()
  @IsEnum(['name', 'id'])
  readonly orderBy?: string;
}
