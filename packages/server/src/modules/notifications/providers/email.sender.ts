import bluebird from 'bluebird';
import nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Notification } from '@notifications/notification.entity';

import { BaseSender } from '@notifications/providers/base.sender';

import { SenderSendResult } from '@notifications/interfaces';

@Injectable()
export class EmailSender extends BaseSender {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async send(notification: Notification): Promise<SenderSendResult> {
    const errors = {};
    const externalIds = [];

    const transporter = nodemailer.createTransport({
      host: this.configService.get('NOTIFICATION_MAIL_HOST'),
      port: this.configService.get('NOTIFICATION_MAIL_PORT'),
      secure: this.configService.get('NOTIFICATION_MAIL_SECURE'),
      auth: {
        user: this.configService.get('NOTIFICATION_MAIL_USER'),
        pass: this.configService.get('NOTIFICATION_MAIL_PASS'),
      },
    });

    await bluebird.map(notification.destinations, async (destination) => {
      await transporter
        .sendMail({
          from: this.configService.get('NOTIFICATION_MAIL_FROM'),
          to: destination,
          subject: notification.title
            ? this.buildMessageByDestination(
                destination,
                notification.title,
                notification.payload,
              )
            : null,
          html: notification.body
            ? this.buildMessageByDestination(
                destination,
                notification.body,
                notification.payload,
              )
            : null,
        })
        .then((response) => {
          externalIds.push(response.messageId);
        })
        .catch((error) => {
          errors[destination] = error.message;
        });

      await bluebird.delay(500);
    });

    return {
      externalIds,
      errors: Object.keys(errors).length ? errors : null,
    };
  }
}
