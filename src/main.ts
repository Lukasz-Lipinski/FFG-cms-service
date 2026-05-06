import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { AppDataSource } from './core/database/db';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Server is running on: ', process.env.PORT ?? 3000);

  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization', error);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
