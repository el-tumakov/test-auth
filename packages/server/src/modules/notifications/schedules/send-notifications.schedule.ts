import bluebird from 'bluebird';

import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

import { Notification } from '@notifications/notification.entity';

import { NotificationsService } from '@notifications/notifications.service';

import { NotificationStatusEnum } from '@notifications/enums';

@Injectable()
export class SendNotificationsSchedule {
  constructor(
    private readonly notificationService: NotificationsService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  private readonly logger = new Logger(SendNotificationsSchedule.name);

  private processNotificationSendTimeout;

  async onModuleInit() {
    this.startProcessNotificationsSend();

    this.schedulerRegistry.addTimeout(
      'NotificationSend',
      this.processNotificationSendTimeout,
    );
  }

  onModuleDestroy() {
    this.schedulerRegistry.deleteTimeout('NotificationSend');
  }

  private startProcessNotificationsSend() {
    this.processNotificationSendTimeout = setTimeout(
      () =>
        this.processNotificationsSend()
          .then(() => this.startProcessNotificationsSend())
          .catch((error) => {
            this.logger.error('Error: ' + error.message, error.stack);

            this.startProcessNotificationsSend();
          }),
      1000 * 5,
    );
  }

  private async processNotificationsSend() {
    const notifications =
      await this.notificationService.findProcessNotifications();

    return bluebird.map(notifications, (notification) =>
      this.processNotificationSend(notification),
    );
  }

  private async processNotificationSend(notification: Notification) {
    switch (notification.status) {
      case NotificationStatusEnum.PROCESS:
        return this.notificationService.sendNotification(notification);
      case NotificationStatusEnum.SENT:
      case NotificationStatusEnum.SENT_WITH_ERRORS:
        return this.notificationService.checkNotification(notification);
    }
  }
}
