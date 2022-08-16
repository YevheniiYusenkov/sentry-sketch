import * as Tracing from '@sentry/tracing';
import * as Sentry from '@sentry/node';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Sentry.init({
    dsn: process.env.SENTRY_URI,
    tracesSampleRate: 1.0,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
