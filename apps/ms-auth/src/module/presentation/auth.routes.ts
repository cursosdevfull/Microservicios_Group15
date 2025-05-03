import express from "express";
import { AuthController } from '.';
import { AuthPort } from "../ports";
import { AuthAdapter } from "../adapters";
import { AuthApplication } from "../application";

class AuthRoutes {
    readonly router = express.Router();

    constructor(private readonly controller: AuthController) {
        this.mountRoutes();
    }

    private mountRoutes() {
        this.router.post("/", this.controller.login.bind(this.controller));
        this.router.post("/verify", this.controller.verifyToken.bind(this.controller));
    }
}

const port: AuthPort = new AuthAdapter();
const application = new AuthApplication(port);
const controller = new AuthController(application);
export const authRouter = new AuthRoutes(controller).router;