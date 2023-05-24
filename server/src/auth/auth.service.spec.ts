import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { User } from './models/auth.model';
import { getModelToken } from '@nestjs/sequelize';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
require('dotenv').config();

describe('AuthService', () => {
    let authService: AuthService;
    let jwtService: JwtService;

    const mockUserRepository = {
        findOne: jest.fn(),
        create: jest.fn(userObj => {
            return {
                email: userObj.email,
                password: userObj.password,
                userId: 1
            }
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule,
                JwtModule
            ],
            controllers: [AuthController],
            providers: [AuthService, JwtService, {
                provide: getModelToken(User),
                useValue: mockUserRepository
            }]
        })
            .compile();

        authService = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
        expect(jwtService).toBeDefined();
    });

    it('should register a user', async () => {
        const dto = { email: "andrey@gmail.com", password: '123123' };
        mockUserRepository.findOne.mockImplementation(obj => {
            return undefined
        });
        expect(await authService.register(dto))
            .toEqual({
                token: expect.any(String)
            })
        expect(mockUserRepository.findOne).toBeCalledTimes(1);
        expect(mockUserRepository.create).toBeCalledTimes(1);
    });

    it('should not register a user because it is already exists', async () => {
        const dto = { email: "andrey@gmail.com", password: '123123' };
        mockUserRepository.findOne.mockImplementation(obj => {
            return {
                email: obj.where.email
            }
        });
        try {
            await authService.register(dto);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.message).toBe('User with that email is already exists.')
        }
        expect(mockUserRepository.findOne).toBeCalledTimes(1);
    });

    it('should login a user', async () => {
        const dto = { email: "andrey@gmail.com", password: '123123' };
        mockUserRepository.findOne.mockImplementation(obj => {
            return {
                email: obj.where.email,
                password: bcrypt.hashSync(dto.password, 3)
            }
        });
        expect(await authService.login(dto))
            .toEqual({
                token: expect.any(String)
            })
        expect(mockUserRepository.findOne).toBeCalledTimes(1);
    });

    it('should not login a user because user does not exist', async () => {
        const dto = { email: "andrey@gmail.com", password: '123123' };
        mockUserRepository.findOne.mockImplementation(obj => {
            return undefined
        });
        try {
            await authService.login(dto);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.message).toBe('Invalid email or password');
        }
        expect(mockUserRepository.findOne).toBeCalledTimes(1);
    });

    it('should not login a user because password is incorrect', async () => {
        const dto = { email: "andrey@gmail.com", password: '123123' };
        mockUserRepository.findOne.mockImplementation(obj => {
            return {
                email: obj.where.email,
                password: '123123123'
            }
        });
        try {
            await authService.login(dto);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.message).toBe('Invalid email or password');
        }
        expect(mockUserRepository.findOne).toBeCalledTimes(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })
});