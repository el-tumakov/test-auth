import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { NotificationsModule } from '@notifications/notifications.module';
import { SessionsModule } from '@sessions/sessions.module';
import { UsersModule } from '@users/users.module';
import { VerificationModule } from '@verification/verification.module';

import { AuthService } from '@auth/auth.service';

import { AuthSessionStrategy } from './strategies';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      property: 'identity',
    }),
    SessionsModule,
    UsersModule,
    NotificationsModule,
    VerificationModule,
  ],
  providers: [AuthService, AuthSessionStrategy],
  exports: [AuthService, AuthSessionStrategy, ConfigModule, PassportModule],
})
export class AuthModule {}
