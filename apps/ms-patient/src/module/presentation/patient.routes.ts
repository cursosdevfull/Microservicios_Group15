import express from "express";
import { PatientController } from '.';
import { PatientPort } from "../ports";
import { PatientAdapter } from "../adapters";
import { PatientApplication } from "../application";

class PatientRoutes {
    readonly router = express.Router();

    constructor(private readonly controller: PatientController) {
        this.mountRoutes();
    }

    private mountRoutes() {
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.get("/email/:email", this.controller.getByEmail.bind(this.controller));
        this.router.get("/id/:patientId", this.controller.getById.bind(this.controller));
    }
}

const port: PatientPort = new PatientAdapter();
const application = new PatientApplication(port);
const controller = new PatientController(application);
export const patientRouter = new PatientRoutes(controller).router;