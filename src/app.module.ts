import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios'; //Solo para prueba
import { firstValueFrom } from 'rxjs'; //Solo para prueba

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './modules/common/database/database.module';

//Pruebas con inyección de dependencias
const API_KEY = '123456';
const API_KEY_PROD = 'PROD_123456';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 1000,
        maxRedirects: 5,
      }),
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      //Al no ser una clase tenemos que inyectarlo de esta manera
      provide: 'API_KEY', //Nombre de la inyección de dependencias
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY, //Valor de la inyección de dependencias
    },
    {
      //Prueba de inyección de dependencias de algo asíncrono
      //No es aconsejable llamar a APIs de terceros con esto porque detiene el servicio hasta conseguir la respuesta
      //Se suele usar para conexiones con bases de datos
      provide: 'TASKS',
      inject: [HttpService],
      useFactory: async (http: HttpService) => {
        const tasks = await http.get(
          'https://jsonplaceholder.typicode.com/todos',
        );
        return Promise.resolve(firstValueFrom(tasks));
      },
    },
  ],
})
export class AppModule {}
