import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SetNewPasswordDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    format: 'password',
    pattern: `^(?=.*?[\p{L}])(?=.*?[\p{N}]).{0,}$`,
    minLength: 8,
    example: 'password123',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*?[\p{L}])(?=.*?[\p{N}]).{0,}$/u, {
    message: 'Password is too weak',
  })
  newPassword: string;

  @ApiProperty()
  @IsString()
  code: string;
}
