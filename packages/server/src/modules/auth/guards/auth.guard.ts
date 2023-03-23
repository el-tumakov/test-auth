import { Injectable, UnauthorizedException, mixin } from '@nestjs/common';
import { Type } from '@nestjs/common';
import { IAuthGuard, AuthGuard as NestAuthGuard } from '@nestjs/passport';

import { AuthType } from '@auth/enums';

export const AuthGuard = (type: AuthType): Type<IAuthGuard> => {
  @Injectable()
  class Guard extends NestAuthGuard(type) {
    constructor() {
      super();
    }

    handleRequest(err, identity) {
      if (err || !identity) {
        throw (
          err ||
          new UnauthorizedException({
            statusCode: 401,
            message:
              type === AuthType.AUTH
                ? 'Authorization required'
                : 'Session required',
          })
        );
      }

      return identity;
    }
  }

  return mixin(Guard);
};
