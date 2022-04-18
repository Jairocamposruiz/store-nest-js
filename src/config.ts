import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    app: {
      port: parseInt(process.env.PORT, 10),
    },
    database: {
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
    },
  };
});
