import {  IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthTokenDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    token: string;
}