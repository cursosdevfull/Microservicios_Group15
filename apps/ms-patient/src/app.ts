import cors from "cors";
import express from "express";
import { patientRouter } from "./module/presentation"

class App {
    readonly app = express();

    constructor() {
        this.mountMiddlewaresCommon();
        this.mountRoutes();
        //this.mountRoutesHealthcheck();
    }

    private mountMiddlewaresCommon() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private mountRoutes() {
        this.app.get("/", (_request, response) => {
            response.send("Hello World");
        });

        this.app.use("/patient", patientRouter);
    }
}

export default new App().app;