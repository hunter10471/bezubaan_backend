import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from 'swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiPrefix = 'api';
  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(process.env.PORT || 5000, () =>
    Logger.log(`App successfully running on port ${process.env.PORT || 5000}.`),
  );
}
bootstrap();
