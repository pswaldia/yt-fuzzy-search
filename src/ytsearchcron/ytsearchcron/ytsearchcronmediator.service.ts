import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoEntity } from '../model/video.entity';

@Injectable()
export class YtSearchCronMediatorService {
    private readonly logger = new Logger(YtSearchCronMediatorService.name);
    constructor(
        @InjectRepository(VideoEntity)
        private userRepository: Repository<VideoEntity>
    ) {}
    
    searchAndPersistVideos(){
        
    }
}
