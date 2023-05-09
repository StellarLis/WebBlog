import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru'})
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({example: '123456789'})
    @IsNotEmpty()
    @Length(6, 26)
    readonly password: string;
}