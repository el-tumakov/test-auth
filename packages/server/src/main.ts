import { config } from 'aws-sdk';
import { useContainer } from 'class-validator';

import {
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import SwaggerConfig from '@config/swagger.config';

import { AppModule } from './app.module';

import { ValidationException, ValidationFilter } from '@common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errMsg = {};

        const validate = (
          nestedErrors: ValidationError[],
          propertyName: string | null = null,
        ) => {
          nestedErrors.forEach((err) => {
            const property = propertyName
              ? `${propertyName}.${err.property}`
              : err.property;

            if (err.children?.length) {
              validate(err.children, property);
            } else {
              errMsg[property] = [...Object.values(err.constraints)];
            }
          });
        };

        validate(errors);

        return new ValidationException(errMsg);
      },
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: false,
    defaultVersion: '1.0',
  });

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api', app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);

  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  app.enableCors();

  await app.listen(3200);
}
bootstrap();
