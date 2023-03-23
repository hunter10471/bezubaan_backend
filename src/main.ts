import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () =>
    Logger.log(`App successfully running on port ${PORT}.`),
  );
}
bootstrap();
