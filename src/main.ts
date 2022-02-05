import { NestFactory } from '@nestjs/core';
import fmp from 'fastify-multipart';
import { AppModule } from './app.module';
import { createAdmin } from './common/create.admin';
import { AllExceptionsFilter } from './exeptions/error.handler';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PORT, USE_FASTIFY } from './common/config';
import { CustomLogger } from './logging/custom.logger';
import express from 'express';
import Logger from './logging/winston.log';

async function start() {
  try {
    let app;
    if (USE_FASTIFY === 'true') {
      app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        { logger: new CustomLogger() },
      );
      app.register(fmp);
    } else {
      app = await NestFactory.create(AppModule, {
        logger: new CustomLogger(),
      });
      app.use(express.json());
    }
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter());
    const config = new DocumentBuilder()
      .setTitle('Nest Application')
      .setDescription('Nest server with file downloading')
      .setVersion('1.0')
      .addTag('nest')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(PORT || 4000);
    await createAdmin();
  } catch (err) {
    Logger.error(err);
    process.exit(1);
  }
}
start();
