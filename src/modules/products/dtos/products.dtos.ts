import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  ArrayMinSize,
  IsOptional,
  ValidateIf,
  Min,
  IsEnum,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { BaseFilterDto } from '../../common/dtos/base.filter.dto';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly brandId: number;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  readonly categoriesId: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto extends BaseFilterDto {
  @ApiProperty()
  @IsOptional()
  @Min(0)
  readonly minPrice: number;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  readonly maxPrice: number;

  @ApiProperty({ enum: ['price', 'id'] })
  @IsOptional()
  @IsEnum(['price', 'id'])
  readonly orderBy: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly brandId: number;
}
