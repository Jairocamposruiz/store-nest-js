import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private readonly apiKey: string, // Prueba inyectando un valor
    @Inject('TASKS') private readonly tasks: any[], // Prueba inyectando algo asíncrono
    @Inject('DATABASE_CONNECTION') private readonly db: any, // Prueba inyectando algo de un modulo global
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
}
