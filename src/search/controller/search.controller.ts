import { Controller, Get, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from 'src/ytsearchcron/model/video.entity';
import { YtSearchCronMediatorService } from 'src/ytsearchcron/service/ytsearchcronmediator.service';
import { Repository } from 'typeorm';
import { SearchService } from '../service/search.service';

@Controller('search')
export class SearchController {
    private readonly logger = new Logger(SearchController.name);

    constructor(
        private searchService: SearchService
    ) {}

    @Get()
    async searchVideos(){
        return await this.searchService.findAll();
    }
    
}
