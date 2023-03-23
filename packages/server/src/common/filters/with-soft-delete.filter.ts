import { Filter } from '@mikro-orm/core';

export const WithSoftDelete = (): ClassDecorator => {
  return Filter({
    name: 'softDelete',
    cond: {
      deletedAt: null,
    },
    default: true,
  });
};
