import { Model } from "sequelize-typescript";
interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
}
export declare class Post extends Model<Post, PostCreationAttrs> {
    id: number;
    title: string;
    content: string;
    creatorEmail: string;
    userId: number;
}
export {};
