import { IsBoolean, IsDefined, IsOptional } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VerificationCodeDto {
  @ApiProperty({
    example: false,
    description: 'Code updated or previous code is on hold',
  })
  @IsDefined()
  @IsBoolean()
  updated!: boolean;

  @ApiPropertyOptional({
    example: null,
    description:
      'Timeout in milliseconds when code will be valid. If null - infinite',
  })
  @IsOptional()
  lifeTime?: number | null;

  @ApiPropertyOptional({
    example: null,
    description:
      'Timeout in milliseconds when code can be updated. If null - immediately',
  })
  @IsOptional()
  holdTime?: number | null;
}
