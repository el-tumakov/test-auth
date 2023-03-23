import { ApiProperty } from '@nestjs/swagger';

export class CheckSessionResponseDto {
  @ApiProperty()
  exist: boolean;

  @ApiProperty()
  auth: boolean;
}
