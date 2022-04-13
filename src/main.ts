import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Validación de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Ignora los atributos no especificados en el DTO
      forbidNonWhitelisted: true, //Alerta de los atributos no especificados en el DTO
    }),
  );
  await app.listen(3000);
}

bootstrap();
