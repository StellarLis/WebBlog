import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/posts.model';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postRepository: typeof Post) {}

    async createPost(dto: CreatePostDto) {
        await this.postRepository.create(dto);
        return;
    }

    async getLatestPosts() {
        const posts = await this.postRepository.findAll({limit: 10, order: [['createdAt', 'DESC']]});
        return posts;
    }

    async getPostsById(userId: number) {
        const posts = await this.postRepository.findAll({where: {userId}});
        return posts;
    }

    async getBlogById(blogId: number) {
        const blog = await this.postRepository.findOne({where: {id: blogId}});
        return blog;
    }
}
