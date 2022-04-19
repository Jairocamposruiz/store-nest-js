import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { BaseFilterDto } from '../../common/dtos/base.filter.dto';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class FilterOrderDto extends BaseFilterDto {}
