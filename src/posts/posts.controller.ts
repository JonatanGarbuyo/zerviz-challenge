import {
  // Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  // Post,
  // Put,
} from '@nestjs/common';

// import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  async getPosts() {
    return await this.postService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id) {
    const post = await this.postService.getPost(id);
    if (!post) throw new NotFoundException('Post do not exist');
    return post;
  }

  @Delete(':id')
  async deletePostbyId(@Param('id') id) {
    const response = await this.postService.deletePost(id);
    if (!response.modifiedCount)
      throw new NotFoundException('Post do not exist');
    return {
      statusCode: 200,
      message: 'Post deleted',
      error: '',
    };
  }
}
