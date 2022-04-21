import * as Joi from 'joi';

export const configSchema = Joi.object({
  //App
  PORT: Joi.number().required(),
  SECRET_JWT: Joi.string().required(),
  DATABASE_LOGGING: Joi.boolean().required(),
  //Database
  DATABASE_URL: Joi.string().required(),
  DATABASE_SSL: Joi.boolean().required(),
});
