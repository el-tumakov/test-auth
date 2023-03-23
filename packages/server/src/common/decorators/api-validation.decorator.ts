import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

export function ApiValidation() {
  return applyDecorators(
    ApiBadRequestResponse({ description: 'Specified incorrect data' }),
  );
}
