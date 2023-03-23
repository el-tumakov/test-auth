import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSessionResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  token: string;

  @ApiPropertyOptional({ format: 'uuid' })
  userId: string;
}
