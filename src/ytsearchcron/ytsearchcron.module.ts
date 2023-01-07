import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './model/video.entity';
import { YtSearchCronService } from './ytsearchcron/ytsearchcron.service';
import { YtSearchCronMediatorService } from './ytsearchcron/ytsearchcronmediator.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoEntity])
  ],
  providers: [YtSearchCronService, YtSearchCronMediatorService]
})
export class YtsearchcronModule {}
