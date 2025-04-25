import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'dev.env' });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(8000);
  console.log('Server running on http://localhost:8000/api');
  const server = app.getHttpServer();
  const router = server._events.request._router;

}
bootstrap();