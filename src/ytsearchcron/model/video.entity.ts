import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'video_data'
})
export class VideoEntity{
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Index()
    @Column({
        name: 'published_at',
        type: 'timestamptz'
    })
    publishedAt: Date;

    @Index()
    @Column()
    title: string;

    @Column()
    description: string;
    
    @Index()
    @Column({name: 'channel_name'})
    channelName: string;

    @Column("text", { array: true })
    thumbnails: string[];
}