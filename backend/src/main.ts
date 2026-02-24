import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (for React frontend)
  app.enableCors();

  // Global API prefix
  app.setGlobalPrefix('api');

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown properties
      forbidNonWhitelisted: true, // throws error if unknown fields sent
      transform: true, // auto-transform payloads to DTO types
    }),
  );

  await app.listen(3000);
}

void bootstrap();
