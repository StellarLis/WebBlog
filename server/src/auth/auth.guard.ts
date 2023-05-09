import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async canActivate(context: ExecutionContext) {
        try {
            const request = context.switchToHttp().getRequest();
            const header = request.headers.authorization;
            if (!header) {
                throw new UnauthorizedException('Not logged in');
            }
            const token = header.split(' ')[1];
            if (!token) {
                throw new UnauthorizedException('Not logged in');
            }
            const secret = this.configService.get<string>('JWT_SECRET_KEY');
            const isValid = this.jwtService.verify(token, {secret});
            if (!isValid) {
                throw new UnauthorizedException('Not logged in');
            }
        } catch (e) {
            throw new UnauthorizedException('Not logged in');
        }
        return true
    }
}