import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from 'pg';
import config from '../../../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, port, user, password, database } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database,
          synchronize: true, //TODO: remove in production
          autoLoadEntities: true, //TODO: remove in production
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, port, user, password, database } = configService.postgres;
        const client = new Client({
          user,
          password,
          database,
          host,
          port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}
