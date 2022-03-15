import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  created_at?: string;
  @Prop()
  title?: string;
  @Prop()
  url?: string;
  @Prop()
  author?: string;
  @Prop()
  points?: number;
  @Prop()
  story_text?: string;
  @Prop()
  comment_text?: string;
  @Prop()
  num_comments?: number;
  @Prop()
  story_id?: number;
  @Prop()
  story_title?: string;
  @Prop()
  story_url?: string;
  @Prop()
  parent_id?: number;
  @Prop()
  created_at_i?: number;
  @Prop({
    unique: true,
  })
  objectID: string;
  @Prop({ default: false })
  is_deleted: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
