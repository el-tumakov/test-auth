import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { NotificationSenderTypeEnum } from '@notifications/enums';

export class PrepareNotificationDto {
  @ApiProperty({ enum: NotificationSenderTypeEnum })
  @IsEnum(NotificationSenderTypeEnum)
  senderType: NotificationSenderTypeEnum;

  @ApiProperty()
  @IsString({ each: true })
  destinations: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  body?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  template?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  layout?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: { [key: string]: any };
}
