import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const kafka = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_URL],
      },
    },
  });
  console.log(process.env.KAFKA_URL, 'kafkaaaa a aa');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove unknown properties
      forbidNonWhitelisted: true, // Throw an error if unknown properties exist
      transform: true, // Automatically transform request payloads
    }),
  );
  app.use(helmet());
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
