import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
require('dotenv').config();

describe('AuthController', () => {
    let authController: AuthController;
    let jwtService: JwtService;

    const mockAuthService = {
        register: jest.fn(inputData => {
            return {
                id: 1,
                username: inputData.username,
                password: inputData.password,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
        }),
        login: jest.fn(inputData => {
            const token = jwtService.sign(inputData, { secret: process.env.JWT_SECRET_KEY });
            return { token }
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule,
                JwtModule
            ],
            controllers: [AuthController],
            providers: [AuthService, JwtService]
        })
            .overrideProvider(AuthService).useValue(mockAuthService)
            .compile();

        authController = module.get<AuthController>(AuthController);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
        expect(jwtService).toBeDefined();
    });

    it('should register a user', () => {
        const inputData = { email: 'andrew@gmail.com', password: '123123' }
        expect(authController.register(inputData))
            .toEqual(Promise.resolve({
                id: 1,
                email: 'andrew@gmail.com',
                password: '123123',
                createdAt: Date.now(),
                updatedAt: Date.now()
            }));
        expect(mockAuthService.register).toBeCalledTimes(1);
    });

    it('should login a user', () => {
        const inputData = { email: 'andrew@gmail.com', password: '123123' }
        expect(authController.login(inputData))
            .toEqual(Promise.resolve({
                token: expect.any(String)
            }));
        expect(mockAuthService.login).toBeCalledTimes(1);
    });

    it('should authenticate a user correctly', () => {
        const payload = { email: 'andrew@gmail.com', password: '123123' };
        const validToken = jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY });
        expect(authController.authenticate(`Bearer ${validToken}`))
            .toEqual({
                "email": "andrew@gmail.com",
                "iat": expect.any(Number),
                "password": "123123"
            });
    });
});