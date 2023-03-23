import { Module } from '@nestjs/common';

import { AuthModule } from '@auth/auth.module';
import { SessionsModule } from '@sessions/sessions.module';

import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [AuthModule, SessionsModule],
  controllers: [AuthController],
})
export class ClientHttpModule {}
