import { IsEmail } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RequestNewPasswordDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
