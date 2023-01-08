import { Module } from '@nestjs/common';
import { SearchService } from './service/search.service';
import { SearchController } from './controller/search.controller';
import { VideoEntity } from 'src/ytsearchcron/model/video.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([VideoEntity])
  ],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule {}
