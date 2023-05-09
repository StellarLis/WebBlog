import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './models/posts.model';
export declare class PostsService {
    private postRepository;
    constructor(postRepository: typeof Post);
    createPost(dto: CreatePostDto): Promise<void>;
    getLatestPosts(): Promise<Post[]>;
    getPostsById(userId: number): Promise<Post[]>;
    getBlogById(blogId: number): Promise<Post>;
}
