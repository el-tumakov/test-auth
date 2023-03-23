import { IsEmail, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AuthSigninDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ format: 'password' })
  @IsString()
  password: string;
}
