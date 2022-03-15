import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PostsService } from './posts.service';

@Injectable()
export class CronService {
  private readonly DATA_URL =
    'http://hn.algolia.com/api/v1/search_by_date?query=nodejs';
  constructor(
    private postService: PostsService,
    private httpService: HttpService,
  ) {}

  // @Cron('*/10 * * * * *') // every 10 seconds
  @Cron('0 * * * *') // every 1 hour
  syncPosts() {
    console.log('cron running'); //
    this.httpService.get(this.DATA_URL).subscribe(async ({ data }) => {
      const posts = data.hits.map((post) => {
        const {
          created_at,
          title,
          url,
          author,
          points,
          story_text,
          comment_text,
          num_comments,
          story_id,
          story_title,
          story_url,
          parent_id,
          created_at_i,
          objectID,
        } = post;
        return {
          created_at,
          title,
          url,
          author,
          points,
          story_text,
          comment_text,
          num_comments,
          story_id,
          story_title,
          story_url,
          parent_id,
          created_at_i,
          objectID,
        };
      });

      await this.postService.insertMany(posts).catch((err) => console.log(err));
    });
  }
}
