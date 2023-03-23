import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Session } from '@sessions/session.entity';

import { UsersModule } from '@users/users.module';

import { SessionsService } from '@sessions/sessions.service';

@Module({
  imports: [MikroOrmModule.forFeature([Session]), UsersModule],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
