import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    
}
