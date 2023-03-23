import { config } from 'dotenv';

import { ConfigService } from '@nestjs/config';

import { Options } from '@mikro-orm/core';

config({ path: `.env.${process.env.NODE_ENV}` });

const configService = new ConfigService();

const MikroOrmConfig: Options = {
  type: 'postgresql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  user: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  dbName: configService.get('DB_DATABASE'),
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    tableName: 'migration',
    path: 'dist/src/migrations',
    pathTs: 'src/migrations',
    snapshot: false,
  },
};

export default MikroOrmConfig;
