import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from 'swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = new ConfigService();
  const PORT = configService.get('PORT') || 5000;
  const apiPrefix = 'api';
  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(PORT, () =>
    Logger.log(`App successfully running on port ${PORT}.`),
  );
}
bootstrap();
