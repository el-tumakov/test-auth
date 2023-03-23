import { ApiProperty } from '@nestjs/swagger';

export class AuthSigninResponseDto {
  @ApiProperty()
  token: string;
}
