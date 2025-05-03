import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthLoginDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    password: string;
}