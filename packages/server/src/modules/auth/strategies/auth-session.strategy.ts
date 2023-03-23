import { Strategy } from 'passport-http-bearer';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { SessionsService } from '@sessions/sessions.service';

import { AuthType } from '@auth/enums';

@Injectable()
export class AuthSessionStrategy extends PassportStrategy(
  Strategy,
  AuthType.AUTH,
) {
  constructor(private readonly sessionsService: SessionsService) {
    super();
  }
  async validate(token: string) {
    const session = await this.sessionsService.findByToken(token);

    if (!session || !session?.user?.id) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Authorization required',
      });
    }

    return {
      sessionId: session.id,
      userId: session.user.id,
      token: session.token,
    };
  }
}
