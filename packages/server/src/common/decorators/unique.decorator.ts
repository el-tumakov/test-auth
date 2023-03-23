import { ValidationOptions, registerDecorator } from 'class-validator';

import { AnyEntity, EntityClass } from '@mikro-orm/core';

import { UniqueValidator } from '@common/validators';

export function Unique(
  entity: EntityClass<AnyEntity>,
  opts?: {
    isLowerCase?: boolean;
  },
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueValidator,
      constraints: [entity, opts],
    });
  };
}
