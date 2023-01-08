import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { VideoEntity } from 'src/ytsearchcron/model/video.entity';
import { Repository } from 'typeorm';


@Injectable()
export class SearchService {

  private readonly logger = new Logger(SearchService.name);

    constructor(        
        @InjectRepository(VideoEntity)
        private videoDataRepository: Repository<VideoEntity>,
        private elasticSearchService: ElasticsearchService,
    ){}
    
    async fuzzySearch(queryterm: string, count: number){
        const methodName = "#fuzzySearch"
        this.logger.log(`${methodName}: Request received to find the all the youtube videos matching the queried term supporting fuzzy search.`);
        let results = new Set();
        let response = null;
        try{
          response = await this.elasticSearchService.search({
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
      }catch(err){
        this.logger.error(`${methodName}: Encountered error while interacting with elastic search to get the search result.`);
        throw err;
      }
      const hits = response.hits.hits;
      hits.map((item) => {
        results.add(item._source as VideoEntity);
      });
      return {items: Array.from(results)};
    }
    async findPaginatedVideos(options: IPaginationOptions): Promise<Pagination<VideoEntity>> {
        const methodName = "#findPaginatedVideos"
        this.logger.log(`${methodName}: Request received to find the youtube video data in reverse chronological order of published_at time and return them in paginated form.`);
        const queryBuilder = this.videoDataRepository.createQueryBuilder('video_data');
        queryBuilder.orderBy('video_data.published_at', 'DESC');
        return paginate<VideoEntity>(queryBuilder, options);
      }
    
}
