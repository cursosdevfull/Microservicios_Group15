import { NextFunction, Request, Response } from "express";
import { env } from '../../env';

export class AuthMiddleware {
    static async canActivate(req: Request, res: Response, next: NextFunction) {
        const {authorization} = req.headers;
        if (!authorization) {
            console.log("No authorization header provided");
            res.status(401).json({ message: "Unauthorized" });
        } else {
            const token = authorization.split(" ")[1];

            if(!token) {
                console.log("No token provided in authorization header");
                res.status(401).json({ message: "Unauthorized" });
            } else {
                console.log("url", `${env.URL_AUTH}/verify`)
                const response = await fetch(`${env.URL_AUTH}/verify`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token: token }),
                })

                const status = await response.json()

                if(status.isValid) {
                    next()
                } else {
                    console.log("Invalid token provided in authorization header");
                    res.status(401).json({ message: "Unauthorized" });
                }
            }
        }
    }
}