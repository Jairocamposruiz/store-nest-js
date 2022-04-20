import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Validation DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        //Si los query params son números válidos los transforma a números, sino los mantiene como strings
        enableImplicitConversion: true,
      },
    }),
  );

  //Serialización
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Store API')
    .setDescription('Example of API with NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //Helmet
  app.use(helmet());

  //Cors
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
