import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('apikey')
  getApiKey() {
    return this.appService.getApiKey();
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }

  @Get('db')
  getDb() {
    return this.appService.getDatabaseConnection();
  }
}
