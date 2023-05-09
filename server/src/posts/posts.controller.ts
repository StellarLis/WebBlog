import { Body, Controller, Get, Header, Param, Post, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post('create')
    @UseGuards(AuthGuard)
    async createNewPost(@Body() dto: CreatePostDto) {
        return await this.postsService.createPost(dto);
    }

    @Get('latest')
    async getLatestPosts() {
        return await this.postsService.getLatestPosts()
    }
    
    @Get('/:userId')
    async getPostsById(@Param('userId') userId: number) {
        return await this.postsService.getPostsById(userId);
    }

    @Get('/getOne/:blogId')
    async getBlogById(@Param('blogId') blogId: number) {
        return await this.postsService.getBlogById(blogId);
    }
}
