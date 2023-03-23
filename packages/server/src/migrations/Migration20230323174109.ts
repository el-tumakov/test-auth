import { Migration } from '@mikro-orm/migrations';

export class Migration20230323174109 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "notification" ("id" uuid not null, "sender_type" smallint not null, "status" smallint not null default 1, "destinations" text[] not null, "external_ids" text[] null, "title" varchar(255) null, "body" text not null, "payload" jsonb null, "errors" jsonb null, "start_at" timestamptz(0) null, "finished_at" timestamptz(0) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "notification_pkey" primary key ("id"));',
    );
    this.addSql(
      'create index "notifications_senderType_idx" on "notification" ("sender_type");',
    );
    this.addSql(
      'create index "notifications_status_idx" on "notification" ("status");',
    );
    this.addSql(
      'create index "notifications_finishedAt_idx" on "notification" ("finished_at");',
    );

    this.addSql(
      'create table "user" ("id" uuid not null, "email" varchar(50) not null, "name" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, constraint "user_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");',
    );
    this.addSql(
      'create index "user_deleted_at_index" on "user" ("deleted_at");',
    );

    this.addSql(
      'create table "session" ("id" uuid not null, "user_id" uuid null, "token" varchar(255) null, "expires_at" timestamptz(0) not null, "last_active_at" timestamptz(0) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "session_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "verification" ("entry" varchar(256) not null, "code" varchar(256) not null, "attempts" int not null, "attempts_max" int null, "hold_expires_at" timestamptz(0) null, "life_expires_at" timestamptz(0) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "verification_pkey" primary key ("entry"));',
    );

    this.addSql(
      'alter table "session" add constraint "session_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "session" drop constraint "session_user_id_foreign";',
    );

    this.addSql('drop table if exists "notification" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "session" cascade;');

    this.addSql('drop table if exists "verification" cascade;');
  }
}
