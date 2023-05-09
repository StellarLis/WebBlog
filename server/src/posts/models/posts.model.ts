import { Column, DataType, ForeignKey, Table, Model } from "sequelize-typescript";
import { User } from "src/auth/models/auth.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.TEXT, allowNull: false})
    content: string;

    @Column({type: DataType.STRING, allowNull: false})
    creatorEmail: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}