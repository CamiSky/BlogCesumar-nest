import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validate } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades não decoradas
    forbidNonWhitelisted: true, // Retorna erro se houver propriedades não permitidas
    transform: true, // Transforma os objetos de entrada em instâncias de DTO
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
