import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { VideoEntity } from 'src/ytsearchcron/model/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {

    constructor(        
        @InjectRepository(VideoEntity)
        private videoDataRepository: Repository<VideoEntity>
    ){}

    async findAll(): Promise<VideoEntity[]> {
        return await this.videoDataRepository.find({
            order: {
                "publishedAt": "DESC"
            }
        })
    }

    async findPaginatedVideos(options: IPaginationOptions): Promise<Pagination<VideoEntity>> {
        const queryBuilder = this.videoDataRepository.createQueryBuilder('video_data');
        queryBuilder.orderBy('video_data.published_at', 'DESC');
        return paginate<VideoEntity>(queryBuilder, options);
      }
    
}
