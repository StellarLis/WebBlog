import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/sequelize';
import { Post } from './models/posts.model';
require('dotenv').config();

describe('AuthController', () => {
    let postsService: PostsService;

    const mockPostRepository = {
        create: jest.fn(dto => {
            return;
        }),
        findAll: jest.fn(obj => {
            return [{ title: '123', content: '123' }, { title: '123', content: '123' }]
        }),
        findOne: jest.fn(blogId => {
            return { title: '123', content: '123' }
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule,
                JwtModule
            ],
            controllers: [PostsController],
            providers: [PostsService, JwtService, {
                provide: getModelToken(Post),
                useValue: mockPostRepository
            }]
        })
            .compile();

        postsService = module.get<PostsService>(PostsService);
    });

    it('should be defined', () => {
        expect(postsService).toBeDefined();
    });

    it('should create a post', async () => {
        const dto = { title: '123', content: '123', creatorEmail: '123', userId: 1 };
        expect(await postsService.createPost(dto)).toBe(undefined);
        expect(mockPostRepository.create).toBeCalledTimes(1);
    });

    it('should get latest posts', async () => {
        expect(await postsService.getLatestPosts()).toEqual([
            { title: '123', content: '123' },
            { title: '123', content: '123' }
        ]);
        expect(mockPostRepository.findAll).toBeCalledTimes(1);
    });

    it('should get posts by id', async () => {
        expect(await postsService.getPostsById(1)).toEqual([
            { title: '123', content: '123' },
            { title: '123', content: '123' }
        ]);
        expect(mockPostRepository.findAll).toBeCalledTimes(1);
    });

    it('should get blog by id', async () => {
        expect(await postsService.getBlogById(1)).toEqual({
            title: '123', content: '123'
        });
        expect(mockPostRepository.findOne).toBeCalledTimes(1);
    })

    afterEach(() => {
        jest.clearAllMocks();
    })
});