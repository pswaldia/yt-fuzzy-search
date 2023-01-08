import { Module } from '@nestjs/common';
import { SearchService } from './service/search.service';
import { SearchController } from './controller/search.controller';
import { VideoEntity } from 'src/ytsearchcron/model/video.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoEntity])
  ],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule {}
