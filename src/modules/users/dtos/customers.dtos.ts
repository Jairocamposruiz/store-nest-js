import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { BaseFilterDto } from '../../common/dtos/base.filter.dto';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('ES')
  readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class FilterCustomerDto extends BaseFilterDto {
  @ApiProperty({ enum: ['name', 'lastName', 'id'] })
  @IsOptional()
  @IsEnum(['name', 'lastName', 'id'])
  readonly orderBy: string;
}
