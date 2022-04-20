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

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  //TODO: Quitar este campo y poner por defecto el rol user
  //TODO: Crear un nuevo servicio y un nuevo controlador para aumentar rol
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  readonly customerId?: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FilterUserDto extends BaseFilterDto {
  @ApiProperty({ enum: ['role', 'id'] })
  @IsOptional()
  @IsEnum(['role', 'id'])
  readonly orderBy: string;
}

export class FilterOrdersByUserDto extends BaseFilterDto {}
