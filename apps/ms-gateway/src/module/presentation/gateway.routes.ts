import express from "express";
import { GatewayController } from "./gateway.controller";
import { GatewayAdapter } from "../adapters";
import { GatewayPort } from "../ports";
import { GatewayApplication } from "../application";
import { AuthMiddleware } from '../../core/middlewares/auth.middleware';


class GatewayRoutes {
    readonly router = express.Router();

    constructor(private readonly controller: GatewayController) {
        this.mountRoutes();
    }

    private mountRoutes() {
        this.router.post("/appointment", AuthMiddleware.canActivate, this.controller.bookAppointment.bind(this.controller));
        this.router.post("/patient", AuthMiddleware.canActivate, this.controller.createPatient.bind(this.controller));
        this.router.post("/auth", this.controller.login.bind(this.controller));
    }
}

const port: GatewayPort = new GatewayAdapter();
const application = new GatewayApplication(port);
const controller = new GatewayController(application);
export const gatewayRouter = new GatewayRoutes(controller).router;