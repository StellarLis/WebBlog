import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/auth.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async register(dto: CreateUserDto) {
        const candidate = await this.userRepository.findOne({where: {email: dto.email}});
        if (candidate) {
            throw new BadRequestException('User with that email is already exists.')
        }
        const hashPassword = await bcrypt.hash(dto.password, 3);
        const user = await this.userRepository.create({email: dto.email, password: hashPassword});
        const payload = { email: user.email, userId: user.id };
        const secret = this.configService.get<string>('JWT_SECRET_KEY')
        const token = await this.jwtService.signAsync(payload, {secret, expiresIn: '1h'});
        return { token };
    }

    async login(dto: CreateUserDto) {
        const user = await this.userRepository.findOne({where: {email: dto.email}});
        if (!user) {
            throw new BadRequestException('Invalid email or password');
        }
        const isTheSame = await bcrypt.compare(dto.password, user.password);
        if (!isTheSame) {
            throw new BadRequestException('Invalid email or password');
        }
        const payload = { email: user.email, userId: user.id };
        const secret = this.configService.get<string>('JWT_SECRET_KEY')
        const token = await this.jwtService.signAsync(payload, {secret, expiresIn: '1h'});
        return { token };
    }
}
