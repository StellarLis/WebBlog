import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsModule } from './posts/posts.module';
import { User } from './auth/models/auth.model';
import { Post } from './posts/models/posts.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'db',
      models: [User, Post],
      autoLoadModels: true
    }),
    AuthModule,
    PostsModule
  ],
})
export class AppModule { }
