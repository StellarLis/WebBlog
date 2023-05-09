import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/auth.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private configService;
    constructor(userRepository: typeof User, jwtService: JwtService, configService: ConfigService);
    register(dto: CreateUserDto): Promise<{
        token: string;
    }>;
    login(dto: CreateUserDto): Promise<{
        token: string;
    }>;
}
