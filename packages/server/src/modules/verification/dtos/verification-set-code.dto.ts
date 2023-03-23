import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class SetCodeParamsDto {
  @ApiPropertyOptional({
    description: 'Max attempts for verification object',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  maxAttempts?: number;

  @ApiPropertyOptional({
    description: 'Life time for verification object',
    example: 15000,
  })
  @IsOptional()
  @IsNumber()
  lifeTime?: number;

  @ApiPropertyOptional({
    description: 'Hold time for verification object',
    example: 12000,
  })
  @IsOptional()
  @IsNumber()
  holdTime?: number;
}

export class VerificationSetCodeDto {
  @ApiProperty({
    example: 'somecode',
    description: 'Code for verification object',
  })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({
    example: 'someentry',
    description: 'Entry for verification object',
  })
  @IsNotEmpty()
  @IsString()
  entry!: string;

  @ApiProperty({
    description: 'Available attempts for next checking, null - unlimited',
  })
  @IsDefined()
  params!: SetCodeParamsDto;
}
