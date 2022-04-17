import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    app: {
      port: parseInt(process.env.PORT, 10),
    },
    postgres: {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
    },
  };
});
