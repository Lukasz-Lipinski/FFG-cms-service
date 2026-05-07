import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { AppDataSource } from './core/database/db';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT ?? 3000);
}
try {
  AppDataSource.initialize();
  console.log('Data Source has been initialized!');
  bootstrap();
} catch (error) {
  console.error('Error during Data Source initialization', error);
}
