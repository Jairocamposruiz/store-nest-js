import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber('ES')
  phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
