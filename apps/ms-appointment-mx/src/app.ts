import cors from "cors";
import express from "express";
/* import { DatabaseBootstrap } from "./bootstrap";
import { databaseHealthcheck } from "./core/healthchecks/database.healthcheck";
import { rabbitmqHealthcheck } from "./core/healthchecks/rabbitmq.healthcheck";
import { movieRouter } from "./module/presentation"; */

const startTime = Date.now();

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
    }

/*     private mountRoutesHealthcheck() {
        this.app.get("/healthcheck", async (_request, response) => {
            const healthchecks = [
                databaseHealthcheck(),
                //rabbitmqHealthcheck()
            ]
            const results = await Promise.allSettled(healthchecks);

            const successChecks = results.filter(result => result.status === "fulfilled");
            const successReasons = successChecks.map(result => result.value);

            const failedChecks = results.filter(result => result.status === "rejected")
            const failedReasons = failedChecks.map(result => JSON.parse(result.reason.message));

            const statusHealthcheck = successChecks.length === results.length ? 200 : 500;

            response.status(statusHealthcheck).json([...successReasons, ...failedReasons]);
        });
    } */
}

export default new App().app;