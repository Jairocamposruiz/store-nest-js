import * as Joi from 'joi';

export const configSchema = Joi.object({
  //App
  PORT: Joi.number().required(),
  SECRET_JWT: Joi.string().required(),
  //Database
  DATABASE_URL: Joi.string().required(),
  DATABASE_SSL: Joi.boolean().required(),
  //TypeORM
  TYPEORM_CONNECTION: Joi.string().required(),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
  TYPEORM_LOGGING: Joi.string().required(),
  TYPEORM_ENTITIES: Joi.string().required(),
  //TypeORM Migrations
  TYPEORM_MIGRATIONS: Joi.string().required(),
  TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
  TYPEORM_MIGRATIONS_TABLE_NAME: Joi.string().required(),
});
