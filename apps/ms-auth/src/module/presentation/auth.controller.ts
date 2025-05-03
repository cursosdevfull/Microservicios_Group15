import type { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AuthLoginDto } from "./dtos/auth-login.dto";
import { Auth, AuthApplication } from "../application";
import { AuthTokenDto } from "./dtos/auth-token.dto";

export class AuthController {
    constructor(private readonly application: AuthApplication) { }

    async login(request: Request, response: Response) {
        const authDto = plainToInstance(AuthLoginDto, request.body);
        const errors = await validate(authDto)

        if (errors.length > 0) {
            response.status(411).json({ status: 400, message: 'Validation error', errors });
        } else {

            const auth = new Auth({ ...request.body });
            const token = await this.application.login(auth);

            if(token) {
                response.status(200).json({ status: 200, message: 'Auth login successful', token});
            } else {
                response.status(401).json({ status: 401, message: 'Auth login failed', data: null });
            }
        }
    }

    async verifyToken(request: Request, response: Response) {
        const { token } = request.body;

        const authTokenDto = plainToInstance(AuthTokenDto, request.body);
        const errors = await validate(authTokenDto)

        if (errors.length > 0) {
            response.status(411).json({ status: 400, message: 'Validation error', errors });
        } else {
            if (!token) {
                response.status(401).json({ status: 401, message: 'Token not provided', data: null });
            }
    
            const isValid = await this.application.verifyToken(token);
    
            if (isValid) {
                response.status(200).json({ status: 200, isValid });
            } else {
                response.status(401).json({ status: 401, isValid });
            }
        }
    }
}