import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { YtSearchCronMediatorService } from './ytsearchcronmediator.service';

@Injectable()
export class YtSearchCronService {
    private readonly logger = new Logger(YtSearchCronService.name);

    constructor(private ytSearchCronMediator: YtSearchCronMediatorService){}

    @Cron('*/5 * * * *')
    searchVideos(){
        const methodName: string = "#searchVideos"
        this.logger.log("Request received to run the job to search for youtube videos for predefined search query.", [methodName]);
        this.ytSearchCronMediator.searchAndPersistVideos();
    }
}
