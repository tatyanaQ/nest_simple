import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import 'reflect-metadata';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/modules/configs/configs.module'
import { CatsModule } from './cats/cats.module';
import { UtilsModule } from './common/modules/utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ScheduledService } from './scheduled/scheduled.service';

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    CatsModule,
    UtilsModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    ScheduledService,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private connection: Connection) { }
}
