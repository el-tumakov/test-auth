import { IsBoolean, IsDefined } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class VerificationValidateCodeDto {
  @ApiProperty({ example: false, description: 'Code is valid' })
  @IsDefined()
  @IsBoolean()
  valid!: boolean;
}
