import { IsOptional, IsUUID } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class SetSessionDto {
  @ApiPropertyOptional({ format: 'uuid' })
  @IsUUID()
  @IsOptional()
  userId?: string;
}
