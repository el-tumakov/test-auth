import * as uuid from 'uuid';

import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

import { User } from '@users/user.entity';

@Entity()
export class Session {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid.v4();

  @ManyToOne({ nullable: true })
  user?: User;

  @Property({ nullable: true })
  token?: string;

  @Property({ type: 'timestamptz' })
  expiresAt: Date;

  @Property({ type: 'timestamptz' })
  lastActiveAt: Date = new Date();

  @Property({ type: 'timestamptz' })
  createdAt = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt = new Date();
}
