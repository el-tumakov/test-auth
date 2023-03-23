import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { IIdentity } from '@common/interfaces';

export const GetIdentity = createParamDecorator(
  (_data, ctx: ExecutionContext): IIdentity => {
    const req = ctx.switchToHttp().getRequest();

    return req.identity;
  },
);
