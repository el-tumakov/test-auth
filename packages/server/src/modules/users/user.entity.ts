import * as uuid from 'uuid';

import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';

import { WithSoftDelete } from '@common/filters';

@Entity()
@WithSoftDelete()
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid.v4();

  @Property({ unique: true, length: 50 })
  email: string;

  @Property()
  name: string;

  @Property({ hidden: true })
  password: string;

  @Property({ type: 'timestamptz' })
  createdAt = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Index()
  @Property({ nullable: true, type: 'timestamptz', hidden: true })
  deletedAt?: Date;
}
