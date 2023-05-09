import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private authService;
    private jwtService;
    private configService;
    constructor(authService: AuthService, jwtService: JwtService, configService: ConfigService);
    register(dto: CreateUserDto): Promise<{
        token: string;
    }>;
    login(dto: CreateUserDto): Promise<{
        token: string;
    }>;
    authenticate(authHeader: string): any;
}
