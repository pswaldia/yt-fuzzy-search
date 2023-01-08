import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoEntity } from '../model/video.entity';
import {google} from 'googleapis';
import { VideoI } from '../model/video.interface';

@Injectable()
export class YtSearchCronMediatorService {
    private readonly logger = new Logger(YtSearchCronMediatorService.name);

    constructor(
        @InjectRepository(VideoEntity)
        private videoDataRepository: Repository<VideoEntity>
    ) {}
    
    async searchAndPersistVideos(){
        const methodName: string = "#searchAndPersistVideos"
        this.logger.log(`${methodName}: Request received to call youtubedatav3Search API to search and save youtube video data in persistence storage.`);
        const response: VideoEntity[] = await this.callYoutubeV3SearchAPI();
        await this.persistVideosInfo(response);
    }

    async callYoutubeV3SearchAPI(): Promise<VideoEntity[]>{
        const methodName = "#callYoutubeV3SearchAPI";
        this.logger.log(`${methodName}: Request recieved to call youtubevSearch api.`);
        let response = null;
        try{
            response = await google.youtube("v3").search.list({
                key: process.env.YOUTUBE_TOKEN,
                q: process.env.SEARCH_QUERY,
                part: ['snippet'],
                type: ['video'],
                maxResults: parseInt(process.env.MAX_RESULTS)
            });
        }catch(err){
            this.logger.error("Error encountered while calling youtubev3Search api.", [methodName, err]);
        }
        this.logger.log(`${methodName}: Recieved successful response from youtubev3Search API.`);
        return this.createVideoEntityArray(response);
    }
    
    createVideoEntityArray(response: any): VideoEntity[]{
        const methodName = "#createVideoEntityArray";
        this.logger.log(`${methodName}: Request recieved to create array of video entities from obtained response.`);
        const videoMetadataArray: VideoEntity[] = [];
        response.data.items.forEach((item) => {
            const thumbnails = [];
            Object.entries(item.snippet.thumbnails).forEach(
                ([key, value]: any) => thumbnails.push(value.url)
            );
            const videoMetadata: VideoEntity = {
                publishedAt: new Date(item.snippet.publishedAt),
                title: item.snippet.title,
                description: item.snippet.description,
                channelName: item.snippet.channelTitle,
                thumbnails: thumbnails
            }
            console.log("asadad", videoMetadata)
            videoMetadataArray.push(videoMetadata);
        });
        return videoMetadataArray;
    }

    async persistVideosInfo(videoMetadata: VideoEntity[]){
        const methodName = "#persistVideosInfo";
        this.logger.log(`${methodName}: Request recieved to persist array of video entities into persistence storage.`);
        videoMetadata.forEach(async videoData => {
            await this.videoDataRepository.save(videoData);
        })
    }
}
