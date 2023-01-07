import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoEntity } from '../model/video.entity';
import { YtSearchCronService } from './ytsearchcron.service';

@Injectable()
export class YtSearchCronMediatorService {
    private readonly logger = new Logger(YtSearchCronMediatorService.name);

    constructor(
        @InjectRepository(VideoEntity)
        private userRepository: Repository<VideoEntity>
    ) {}
    
    searchAndPersistVideos(){
        const methodName: string = "#searchAndPersistVideos"
        this.logger.log("Request received to call youtubedatav3Search API to search and save youtube video data in persistence storage", [methodName]);
    }
}
