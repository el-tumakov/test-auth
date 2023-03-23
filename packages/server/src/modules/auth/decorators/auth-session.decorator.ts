import { UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiResponse,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthType } from '@auth/enums';

import { AuthGuard } from '@auth/guards';

export function AuthSession() {
  return applyDecorators(
    UseGuards(AuthGuard(AuthType.AUTH)),
    ApiUnauthorizedResponse({
      status: 401,
      description: 'Authorization required',
    }),
    ApiResponse({ status: 426, description: 'App version is outdated' }),
    ApiServiceUnavailableResponse({ description: 'Service Unavailable' }),
  );
}
