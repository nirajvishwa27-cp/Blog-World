import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Better Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
  }));

  // 2. Fixed CORS (Removed /feed path, added localhost)
  app.enableCors({
    origin: ['https://blog-world-eight.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 3. Dynamic Port for Render (Crucial)
  const port = process.env.PORT || 4000;
  await app.listen(port);
  
  console.log(`🚀 Studio Backend running on port ${port}`);
}
bootstrap();
