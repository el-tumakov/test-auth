import * as uuid from 'uuid';

import {
  Entity,
  Enum,
  Index,
  JsonType,
  PrimaryKey,
  Property,
  TextType,
} from '@mikro-orm/core';

import {
  NotificationSenderTypeEnum,
  NotificationStatusEnum,
} from '@notifications/enums';

@Entity()
export class Notification {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid.v4();

  @Enum({ items: () => NotificationSenderTypeEnum })
  @Index({ name: 'notifications_senderType_idx' })
  senderType: NotificationSenderTypeEnum;

  @Enum({ items: () => NotificationStatusEnum })
  @Index({ name: 'notifications_status_idx' })
  status: NotificationStatusEnum = NotificationStatusEnum.PROCESS;

  @Property()
  destinations: string[];

  @Property({ nullable: true })
  externalIds?: string[];

  @Property({ nullable: true, length: 255 })
  title?: string;

  @Property({ type: TextType })
  body: string;

  @Property({ type: JsonType, nullable: true })
  payload?: { [key: string]: any };

  @Property({ type: JsonType, nullable: true })
  errors?: {
    send?: { [contact: string]: string };
    check?: { [contact: string]: string };
  };

  @Property({ type: 'timestamptz', nullable: true })
  startAt?: Date;

  @Property({ type: 'timestamptz', nullable: true })
  @Index({ name: 'notifications_finishedAt_idx' })
  finishedAt?: Date;

  @Property({ type: 'timestamptz' })
  createdAt = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt = new Date();
}
