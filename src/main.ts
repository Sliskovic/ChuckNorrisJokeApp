import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { HttpExceptionFilter } from './common-exceptions/global-filter/http-exception.filter';
import { AllExceptionsFilter } from './common-exceptions/global-filter/all-exceptions.filter';

const logger = new Logger('bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const port = configService.get<number>('PORT', 3000);

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Chuck Norris Joke app')
    .setDescription('API documentation for Chuck Norris Joke app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  delete document.paths['/'];
  SwaggerModule.setup('api', app, document);

  // Global filters
  app.useGlobalFilters(
    new HttpExceptionFilter(configService),
    new AllExceptionsFilter(httpAdapterHost),
  );
  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, skipMissingProperties: true }),
  );
  // Favicon ignore
  app.use(function (req, res, next) {
    if (req.originalUrl && req.originalUrl.split('/').pop() === 'favicon.ico') {
      return res.sendStatus(204);
    }
    next();
  });
  await app.listen(port);
  logger.verbose(`Application is running on: http://localhost:${port}`);
  logger.verbose(`Database is running on: http://localhost:8080`);
  logger.verbose(`Swagger is running on: http://localhost:${port}/api`);
}

bootstrap().catch((error) => {
  logger.error('Failed to start the application:', error);
});
