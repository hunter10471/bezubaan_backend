import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Bezubaan API')
    .setDescription('API documentation for the Bezubaan application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
