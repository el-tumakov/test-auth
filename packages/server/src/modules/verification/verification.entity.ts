import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Verification {
  @PrimaryKey({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  entry: string;

  @Property({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  code: string;

  @Property({
    type: 'int4',
    nullable: false,
  })
  attempts: number;

  @Property({
    type: 'int4',
    nullable: true,
  })
  attemptsMax?: number;

  @Property({
    type: 'timestamptz',
    nullable: true,
  })
  holdExpiresAt?: Date;

  @Property({
    type: 'timestamptz',
    nullable: true,
  })
  lifeExpiresAt?: Date;

  @Property({ type: 'timestamptz' })
  createdAt = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt = new Date();
}
