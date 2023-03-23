import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { configValidationSchema } from '@config/validation.schema';

import { ClientHttpModule } from '@api/client-http/client-http.module';
import { AuthModule } from '@auth/auth.module';
import { NotificationsModule } from '@notifications/notifications.module';
import { SessionsModule } from '@sessions/sessions.module';
import { TemplatesModule } from '@templates/templates.module';
import { UsersModule } from '@users/users.module';
import { VerificationModule } from '@verification/verification.module';

import { UniqueValidator } from '@common/validators';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      validationSchema: configValidationSchema,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgresql',
          autoLoadEntities: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          user: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          dbName: configService.get('DB_DATABASE'),
        };
      },
    }),
    ScheduleModule.forRoot(),
    // Modules
    VerificationModule,
    TemplatesModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    NotificationsModule,
    // APIs
    ClientHttpModule,
  ],
  providers: [UniqueValidator],
})
export class AppModule {}
