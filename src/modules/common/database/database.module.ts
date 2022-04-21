import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../../../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { database } = configService;
        if (database.ssl) {
          return {
            type: 'postgres',
            url: database.url,
            entities: [database.entities],
            synchronize: false, //TODO: false in production
            autoLoadEntities: true,
            ssl: {
              rejectUnauthorized: true,
            },
          };
        } else {
          return {
            type: 'postgres',
            url: database.url,
            synchronize: false, //TODO: false in production
            autoLoadEntities: true,
          };
        }
      },
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
