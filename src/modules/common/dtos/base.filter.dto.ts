import { IsEnum, IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsPositive()
  readonly limit?: number;

  @ApiProperty()
  @IsOptional()
  @Min(0)
  readonly offset?: number;

  @ApiProperty({ enum: ['ASC', 'DESC'] })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  readonly order?: 'ASC' | 'DESC';
}
