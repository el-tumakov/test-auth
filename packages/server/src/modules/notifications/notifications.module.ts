import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Notification } from '@notifications/notification.entity';

import { TemplatesModule } from '@templates/templates.module';

import { SendNotificationsSchedule } from '@notifications/schedules/send-notifications.schedule';

import { NotificationsService } from '@notifications/notifications.service';

import { EmailSender } from '@notifications/providers/email.sender';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forFeature([Notification]),
    TemplatesModule,
  ],
  providers: [SendNotificationsSchedule, NotificationsService, EmailSender],
  exports: [NotificationsService],
})
export class NotificationsModule {}
