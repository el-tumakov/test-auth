import { IsBoolean, IsDefined, IsOptional } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VerificationCheckCodeDto {
  @ApiProperty({ example: false, description: 'Code is valid' })
  @IsDefined()
  @IsBoolean()
  valid!: boolean;

  @ApiPropertyOptional({
    example: false,
    description: `Code is exhausted and can't be used next`,
  })
  @IsOptional()
  @IsBoolean()
  reset?: boolean;

  @ApiPropertyOptional({
    example: 0,
    description: 'Available attempts for next checking, null - unlimited',
  })
  @IsOptional()
  attempts?: number;

  @ApiPropertyOptional({
    example: null,
    description: 'Timeout in milliseconds when code will be valid',
  })
  @IsOptional()
  lifeTime?: number | null;

  @ApiPropertyOptional({
    example: null,
    description: 'Timeout in milliseconds when code can be updated',
  })
  @IsOptional()
  holdTime?: number | null;
}
