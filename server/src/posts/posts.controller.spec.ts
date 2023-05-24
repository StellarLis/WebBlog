import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
require('dotenv').config();

describe('AuthController', () => {
    let postsController: PostsController;

    const mockPostsService = {
        createPost: jest.fn(dto => {
            return
        }),
        getLatestPosts: jest.fn(() => {
            return [{ title: '123', content: '123' }, { title: '123', content: '123' }];
        }),
        getPostsById: jest.fn(userId => {
            return [{ title: '123', content: '123' }, { title: '123', content: '123' }];
        }),
        getBlogById: jest.fn(blogId => {
            return { title: '123', content: '123' };
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule,
                JwtModule
            ],
            controllers: [PostsController],
            providers: [PostsService, JwtService]
        })
            .overrideProvider(PostsService).useValue(mockPostsService)
            .compile();

        postsController = module.get<PostsController>(PostsController);
    });

    it('should be defined', () => {
        expect(postsController).toBeDefined();
    });

    it('should create a new post', async () => {
        const dto = { title: '123', content: '123', creatorEmail: '123', userId: 1 };
        expect(await postsController.createNewPost(dto)).toBe(undefined);
        expect(mockPostsService.createPost).toBeCalledTimes(1);
    });

    it('should get latest posts', async () => {
        expect(await postsController.getLatestPosts()).toEqual([
            { title: '123', content: '123' },
            { title: '123', content: '123' }
        ]);
        expect(mockPostsService.getLatestPosts).toBeCalledTimes(1);
    });

    it('should get posts by id', async () => {
        expect(await postsController.getPostsById(1)).toEqual([
            { title: '123', content: '123' },
            { title: '123', content: '123' }
        ]);
        expect(mockPostsService.getPostsById).toBeCalledTimes(1);
    });

    it('should get blog by id', async () => {
        expect(await postsController.getBlogById(1)).toEqual({
            title: '123', content: '123'
        });
        expect(mockPostsService.getBlogById).toBeCalledTimes(1);
    })
});