import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './model/video.entity';
import { YtSearchCronService } from './service/ytsearchcron.service';
import { YtSearchCronMediatorService } from './service/ytsearchcronmediator.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoEntity])
  ],
  providers: [YtSearchCronService, YtSearchCronMediatorService]
})
export class YtsearchcronModule {}
