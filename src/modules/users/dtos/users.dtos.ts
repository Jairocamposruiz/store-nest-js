import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  readonly customerId?: number;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly password?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly role?: string;
}
