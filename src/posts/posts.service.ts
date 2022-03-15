import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
  ) {}

  getAllPosts() {
    return this.postModel.find(
      { is_deleted: false },
      { is_deleted: 0, _id: 0 },
    );
  }

  getPost(id) {
    return this.postModel.findOne(
      { objectID: id, is_deleted: false },
      { is_deleted: 0, _id: 0 },
    );
  }

  insertMany(arr) {
    return this.postModel.insertMany(arr, { ordered: false });
  }

  deletePost(id) {
    return this.postModel.updateOne({ objectID: id }, { is_deleted: true });
  }
}
