import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { YtsearchcronModule } from './ytsearchcron/ytsearchcron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    YtsearchcronModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
