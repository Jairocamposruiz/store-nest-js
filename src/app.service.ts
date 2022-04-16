import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private readonly apiKey: string, // Prueba inyectando un valor
    @Inject('TASKS') private readonly tasks: any[], // Prueba inyectando algo asíncrono
    @Inject('DATABASE_CONNECTION') private readonly db: any, // Prueba inyectando algo de un modulo global
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  //Solo de pruebas para ver como funciona la inyección de valores
  getApiKey() {
    return {
      apiKey: this.apiKey,
    };
  }

  getTasks() {
    console.log(this.tasks);
  }

  getDatabaseConnection() {
    console.log(this.db);
  }

  getEnv() {
    console.log(this.configService.apiKey);
    console.log(this.configService.database.name);
  }
}
