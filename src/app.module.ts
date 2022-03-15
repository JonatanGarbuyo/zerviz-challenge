import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';

const url = process.env.MONGO_URL || 'localhost';
@Module({
  imports: [
    ConfigModule.forRoot(),
    PostsModule,
    // MongooseModule.forRoot(process.env.MONGODB_URI, {
    MongooseModule.forRoot(`mongodb://${url}:27017/zervizDatabase`, {
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
