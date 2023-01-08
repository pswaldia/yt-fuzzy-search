import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { VideoEntity } from 'src/ytsearchcron/model/video.entity';
import { Repository } from 'typeorm';



@Injectable()
export class SearchService {

    constructor(        
        @InjectRepository(VideoEntity)
        private videoDataRepository: Repository<VideoEntity>,
        private elasticSearchService: ElasticsearchService,
    ){}
    
    async fuzzySearch(queryterm: string, count: number){
        let results = new Set();
        const response = await this.elasticSearchService.search({
          index: process.env.ELASTICSEARCH_INDEX,
          body: {
            size: count,
            query: {
                multi_match : {
                  query: queryterm, 
                  fields: ["title", "description"], 
                  fuzziness: "AUTO" // configurable. 
                }
        }
          },
        });
        const hits = response.hits.hits;
        hits.map((item) => {
          results.add(item._source as VideoEntity);
        });
        return {items: Array.from(results)};
    }
    async findPaginatedVideos(options: IPaginationOptions): Promise<Pagination<VideoEntity>> {
        const queryBuilder = this.videoDataRepository.createQueryBuilder('video_data');
        queryBuilder.orderBy('video_data.published_at', 'DESC');
        return paginate<VideoEntity>(queryBuilder, options);
      }
    
}
