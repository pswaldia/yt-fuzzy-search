import { Controller, DefaultValuePipe, Get, Logger, ParseIntPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { VideoEntity } from 'src/ytsearchcron/model/video.entity';
import { YtSearchCronMediatorService } from 'src/ytsearchcron/service/ytsearchcronmediator.service';
import { Repository } from 'typeorm';
import { SearchService } from '../service/search.service';

@Controller('v1/search')
export class SearchController {
    private readonly logger = new Logger(SearchController.name);

    constructor(
        private searchService: SearchService
    ) {}

    @Get()
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<VideoEntity>>{
        return await this.searchService.findPaginatedVideos({
            page,
            limit,
            route: 'http://localhost:8080/yt-fuzzy-search/v1/search',
          });
    }
    
}