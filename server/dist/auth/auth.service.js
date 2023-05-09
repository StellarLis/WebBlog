"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const auth_model_1 = require("./models/auth.model");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        const candidate = await this.userRepository.findOne({ where: { email: dto.email } });
        if (candidate) {
            throw new common_1.BadRequestException('User with that email is already exists.');
        }
        const hashPassword = await bcrypt.hash(dto.password, 3);
        const user = await this.userRepository.create({ email: dto.email, password: hashPassword });
        const payload = { email: user.email, userId: user.id };
        const secret = this.configService.get('JWT_SECRET_KEY');
        const token = await this.jwtService.signAsync(payload, { secret, expiresIn: '1h' });
        return { token };
    }
    async login(dto) {
        const user = await this.userRepository.findOne({ where: { email: dto.email } });
        if (!user) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const isTheSame = await bcrypt.compare(dto.password, user.password);
        if (!isTheSame) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const payload = { email: user.email, userId: user.id };
        const secret = this.configService.get('JWT_SECRET_KEY');
        const token = await this.jwtService.signAsync(payload, { secret, expiresIn: '1h' });
        return { token };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(auth_model_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map