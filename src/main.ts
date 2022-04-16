import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  //Documentación de la API
  const config = new DocumentBuilder()
    .setTitle('Store API')
    .setDescription('Example of API with NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //Habilitar CORS
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
