import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe, Headers } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService, private configService: ConfigService) { }

    @ApiOperation({ summary: 'Registrating a user in a database' })
    @UsePipes(ValidationPipe)
    @Post('/register')
    async register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }

    @ApiOperation({ summary: 'Logging in' })
    @UsePipes(ValidationPipe)
    @Post('/login')
    async login(@Body() dto: CreateUserDto) {
        return await this.authService.login(dto);
    }

    @ApiOperation({ summary: 'Authentication' })
    @UseGuards(AuthGuard)
    @Get('/authenticate')
    authenticate(@Headers('authorization') authHeader: string) {
        const token = authHeader.split(' ')[1];
        const secret = this.configService.get<string>('JWT_SECRET_KEY');
        return this.jwtService.verify(token, { secret });
    }
}
