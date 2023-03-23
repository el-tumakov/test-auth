import { Injectable, NotFoundException } from '@nestjs/common';

import { MikroORM, UseRequestContext } from '@mikro-orm/core';

import { Notification } from '@notifications/notification.entity';

import { TemplatesService } from '@templates/templates.service';

import { EmailSender } from '@notifications/providers';

import {
  PrepareNotificationDto,
  SetNotificationDto,
} from '@notifications/dtos';

import {
  NotificationSenderTypeEnum,
  NotificationStatusEnum,
} from '@notifications/enums';

import { SenderCheckResult, SenderSendResult } from '@notifications/interfaces';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly orm: MikroORM,
    private readonly templateService: TemplatesService,
    private readonly emailSender: EmailSender,
  ) {}

  @UseRequestContext()
  async findProcessNotifications(): Promise<Notification[]> {
    return this.orm.em.find(Notification, {
      status: [
        NotificationStatusEnum.PROCESS,
        NotificationStatusEnum.SENT,
        NotificationStatusEnum.SENT_WITH_ERRORS,
      ],
    });
  }

  @UseRequestContext()
  async prepareNotification(
    prepareNotificationDto: PrepareNotificationDto,
  ): Promise<Notification> {
    const { senderType, destinations, title, body, template, layout, payload } =
      prepareNotificationDto;

    const templateData =
      template || layout
        ? await this.templateService.buildHtmlTemplate({
            template,
            layout,
            body,
          })
        : null;

    const notification = this.orm.em.create(Notification, {
      senderType,
      destinations,
      title,
      body: templateData || body,
      payload,
    });

    await this.orm.em.persistAndFlush(notification);

    return notification;
  }

  @UseRequestContext()
  async setNotification(
    setNotificationDto: SetNotificationDto,
  ): Promise<Notification> {
    const { id, ...data } = setNotificationDto;

    const notification = await this.orm.em.findOne(Notification, { id });

    if (!notification) {
      throw new NotFoundException('Notification was not found');
    }

    this.orm.em.assign(notification, data);

    await this.orm.em.persistAndFlush(notification);

    return notification;
  }

  async sendNotification(notification: Notification): Promise<Notification> {
    let result: SenderSendResult = null;

    await this.setNotification({ id: notification.id, startAt: new Date() });

    switch (notification.senderType) {
      case NotificationSenderTypeEnum.MAIL:
        result = await this.emailSender.send(notification);
        break;
      default:
        throw new NotFoundException('Invalid sender type');
    }

    await this.setNotification({
      id: notification.id,
      externalIds: result.externalIds,
      status: !result.errors
        ? NotificationStatusEnum.SENT
        : NotificationStatusEnum.SENT_WITH_ERRORS,
      errors: {
        send: result.errors,
      },
    });

    return notification;
  }

  async checkNotification(notification: Notification): Promise<Notification> {
    const result: SenderCheckResult = { errors: null };

    switch (notification.senderType) {
      case NotificationSenderTypeEnum.MAIL:
        break;
      default:
        throw new NotFoundException('Invalid sender type');
    }

    await this.setNotification({
      id: notification.id,
      status: !result.errors
        ? NotificationStatusEnum.DELIVERED
        : NotificationStatusEnum.DELIVERED_WITH_ERRORS,
      errors: {
        ...notification.errors,
        check: result.errors,
      },
      finishedAt: new Date(),
    });

    return notification;
  }
}
