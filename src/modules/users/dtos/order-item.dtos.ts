import { IsNumber, IsNotEmpty, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { BaseFilterDto } from '../../common/dtos/base.filter.dto';

export class CreateOrderItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly orderId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}

export class FilterOrderItemDto extends BaseFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly orderId: number;
}
