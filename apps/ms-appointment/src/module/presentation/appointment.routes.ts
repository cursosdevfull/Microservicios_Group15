import express from "express";
import { AppointmentController } from './';
import { AppointmentPort } from "../ports";
import { AppointmentAdapter } from "../adapters";
import { AppointmentApplication } from "../application";

class AppointmentRoutes {
    readonly router = express.Router();

    constructor(private readonly controller: AppointmentController) {
        this.mountRoutes();
    }

    private mountRoutes() {
        this.router.post("/", this.controller.create.bind(this.controller));
    }
}

const port: AppointmentPort = new AppointmentAdapter();
const application = new AppointmentApplication(port);
const controller = new AppointmentController(application);
export const appointmentRouter = new AppointmentRoutes(controller).router;