import { Injectable } from '@nestjs/common';

import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { Verification } from '@verification/verification.entity';

import type {
  VerificationCheckCodeDto,
  VerificationCodeDto,
  VerificationSetCodeDto,
  VerificationValidateCodeDto,
} from '@verification/dtos';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private readonly repo: EntityRepository<Verification>,
  ) {}

  public async getCode(entry: string): Promise<VerificationCodeDto> {
    const verification = await this.repo.findOne({ entry });

    if (verification) {
      const holdTime = this.getHoldTime(verification);

      if (holdTime > 0) {
        return {
          updated: false,
          lifeTime: this.getLifeTime(verification),
          holdTime,
        };
      }

      return this.createSendResult(verification);
    }

    return { updated: true };
  }

  public async setCode(
    setCodeDto: VerificationSetCodeDto,
  ): Promise<VerificationCodeDto> {
    const { code, entry, params } = setCodeDto;

    const attemptsMax =
      params.maxAttempts && params.maxAttempts > 0
        ? params.maxAttempts
        : undefined;

    const holdExpiresAt =
      params.holdTime && params.holdTime > 0
        ? new Date(Date.now() + params.holdTime)
        : undefined;

    const lifeExpiresAt =
      params.lifeTime && params.lifeTime > 0
        ? new Date(Date.now() + params.lifeTime)
        : undefined;

    let verification = await this.repo.findOne({ entry });

    if (verification) {
      const holdTime = this.getHoldTime(verification);

      if (holdTime > 0) {
        return {
          updated: false,
          lifeTime: this.getLifeTime(verification),
          holdTime,
        };
      }

      this.repo.assign(verification, {
        code,
        attempts: 0,
        attemptsMax,
        holdExpiresAt,
        lifeExpiresAt,
      });
    } else {
      verification = this.repo.create({
        entry,
        code,
        attempts: 0,
        attemptsMax,
        holdExpiresAt,
        lifeExpiresAt,
      });
    }

    await this.repo.persistAndFlush(verification);

    return this.createSendResult(verification);
  }

  public async checkCode(
    entry: string,
    code: string,
  ): Promise<VerificationCheckCodeDto> {
    const verification = await this.repo.findOne({ entry });

    if (!verification) {
      return this.createCheckResult(false);
    }

    verification.attempts++;

    await this.repo.persistAndFlush(verification);

    if (
      (verification.attemptsMax &&
        verification.attempts > verification.attemptsMax) ||
      verification.code !== code
    ) {
      return this.createCheckResult(false, verification);
    }

    return this.createCheckResult(true, verification);
  }

  public async validCode(
    code: string,
    entry: string,
  ): Promise<VerificationValidateCodeDto> {
    const verification = await this.repo.findOne({ entry });

    if (
      !verification ||
      (verification.attemptsMax &&
        verification.attempts > verification.attemptsMax) ||
      verification.code !== code
    ) {
      return { valid: false };
    }

    return { valid: true };
  }

  protected getHoldTime(verification: Verification): number | null {
    if (!verification.holdExpiresAt) {
      return 0;
    }

    const holdExpirationTime =
      new Date(verification.holdExpiresAt).getTime() - Date.now();

    return Math.max(holdExpirationTime, 0);
  }

  protected getLifeTime(verification: Verification): number | null {
    if (!verification.lifeExpiresAt) {
      return 0;
    }

    const lifeExpirationTime =
      new Date(verification.lifeExpiresAt).getTime() - Date.now();

    return Math.max(lifeExpirationTime, 0);
  }

  protected createSendResult(verification: Verification): VerificationCodeDto {
    return {
      updated: true,
      lifeTime: this.getLifeTime(verification),
      holdTime: this.getHoldTime(verification),
    };
  }

  protected createCheckResult(
    valid: boolean,
    verification?: Verification,
  ): VerificationCheckCodeDto {
    const attempts = verification
      ? verification.attemptsMax
        ? verification.attemptsMax - verification.attempts
        : null
      : 0;

    return {
      valid,
      reset: !!(attempts && attempts < 0),
      attempts: Math.max(attempts ? attempts : 0, 0),
      lifeTime: verification ? this.getLifeTime(verification) : null,
      holdTime: verification ? this.getHoldTime(verification) : null,
    };
  }
}
