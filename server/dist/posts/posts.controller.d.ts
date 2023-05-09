import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    createNewPost(dto: CreatePostDto): Promise<void>;
    getLatestPosts(): Promise<import("./models/posts.model").Post[]>;
    getPostsById(userId: number): Promise<import("./models/posts.model").Post[]>;
    getBlogById(blogId: number): Promise<import("./models/posts.model").Post>;
}
