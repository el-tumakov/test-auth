import {
  IsDate,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { NotificationStatusEnum } from '@notifications/enums';

export class SetNotificationDto {
  @IsUUID(4)
  id: string;

  @IsEnum(NotificationStatusEnum)
  @IsOptional()
  status?: NotificationStatusEnum;

  @IsString({ each: true })
  @IsOptional()
  externalIds?: string[];

  @IsObject()
  @IsOptional()
  errors?: {
    send?: { [contact: string]: string };
    check?: { [contact: string]: string };
  };

  @IsDate()
  @IsOptional()
  startAt?: Date;

  @IsDate()
  @IsOptional()
  finishedAt?: Date;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
