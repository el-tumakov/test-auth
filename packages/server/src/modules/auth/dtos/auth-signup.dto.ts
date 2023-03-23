import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { User } from '@users/user.entity';

import { Unique } from '@common/decorators';

export class AuthSignupDto {
  @ApiProperty({ format: 'email' })
  @IsEmail()
  @MaxLength(50)
  @Unique(User, { isLowerCase: true })
  email: string;

  @ApiPropertyOptional({ example: 'John Snow' })
  @IsString()
  @IsOptional()
  name?: string;

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
  password: string;
}
