import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  NOTIFICATION_MAIL_HOST: Joi.string().required(),
  NOTIFICATION_MAIL_PORT: Joi.number().default(465),
  NOTIFICATION_MAIL_SECURE: Joi.boolean().default(true),
  NOTIFICATION_MAIL_USER: Joi.string().required(),
  NOTIFICATION_MAIL_PASS: Joi.string().required(),
  NOTIFICATION_MAIL_FROM: Joi.string().required(),
});
