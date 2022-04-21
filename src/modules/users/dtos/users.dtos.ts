import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPositive,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { BaseFilterDto } from '../../common/dtos/base.filter.dto';
import { Role } from '../../auth/models/role.model';

export class CreateMyUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  readonly customerId?: number;
}

export class UpdateMyUserDto extends PartialType(CreateMyUserDto) {}

export class CreateUserDto extends CreateMyUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FilterUserDto extends BaseFilterDto {
  @ApiProperty({ enum: ['role', 'id'] })
  @IsOptional()
  @IsEnum(['role', 'id'])
  readonly orderBy: string;
}

export class FilterOrdersByUserDto extends BaseFilterDto {}
