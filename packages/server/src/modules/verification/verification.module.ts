import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Verification } from '@verification/verification.entity';

import { VerificationService } from '@verification/verification.service';

@Module({
  imports: [MikroOrmModule.forFeature([Verification])],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
