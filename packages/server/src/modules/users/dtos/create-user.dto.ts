import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { User } from '@users/user.entity';

import { Unique } from '@common/decorators';

export class CreateUserDto {
  @ApiProperty({ format: 'email' })
  @IsEmail()
  @MaxLength(50)
  @Unique(User, { isLowerCase: true })
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
    message: 'password is too weak',
  })
  password: string;

  @ApiPropertyOptional({ example: 'John Snow' })
  @IsString()
  name?: string;
}
