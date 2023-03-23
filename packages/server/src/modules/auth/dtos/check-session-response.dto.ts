import { ApiProperty } from '@nestjs/swagger';

export class AuthSigninResponseDto {
  @ApiProperty()
  exist: boolean;

  @ApiProperty()
  auth: boolean;
}
