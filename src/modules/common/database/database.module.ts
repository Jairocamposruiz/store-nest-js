import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useValue: 'Esta es la conexión a la base de datos',
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
