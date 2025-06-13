import { NestFactory } from '@nestjs/core';
import { ChatroomsGatewayModule } from './chatrooms-gateway.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ChatroomsGatewayModule, {
    cors: {
      credentials: true,
      origin: true,
    },
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      forbidUnknownValues: true,
    }),
  );

  app.use(helmet());
  app.use(cookieParser());

  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
