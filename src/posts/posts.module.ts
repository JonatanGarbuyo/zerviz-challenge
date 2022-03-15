import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from 'src/posts/cron.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, CronService],
})
export class PostsModule {}
