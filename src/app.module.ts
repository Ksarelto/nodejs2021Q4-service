import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import connectionData from './common/ormconfig';
import { UsersModule } from './routes/users/users.module';
import { BoardsModule } from './routes/boards/boards.module';
import { TasksModule } from './routes/tasks/tasks.module';
import { AllExceptionsFilter } from './exeptions/error.handler';
import { AuthModule } from './routes/registration/auth.module';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { FilesModule } from './routes/files/files.module';
import { CustomLogger } from './logging/custom.logger';
import { ColumnsModule } from './routes/columns/columns.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionData),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule,
    FilesModule,
    ColumnsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CustomLogger,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
