import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import upperFirst from 'lodash/upperFirst';

import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly em: EntityManager) {}

  async validate(value: string, args: ValidationArguments) {
    const opts = args[1];

    const user = opts?.isLowerCase
      ? await this.em.find(args.constraints[0], {
          [args.property]: value,
        })
      : await this.em
          .createQueryBuilder(args.constraints[0])
          .select('id')
          .where({ [`lower(${args.property})`]: value.toLowerCase() })
          .execute('get');

    if (user) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${upperFirst(args.property)} already exists`;
  }
}
