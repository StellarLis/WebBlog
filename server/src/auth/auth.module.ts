import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/auth.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService]
})
export class AuthModule {}
