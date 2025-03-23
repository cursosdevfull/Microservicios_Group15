import cors from "cors";
import express from "express";
import { movieRouter } from "./module/presentation";
import { DatabaseBootstrap } from "./bootstrap";

const startTime = Date.now();

class App {
  readonly app = express();

  constructor() {
    this.mountMiddlewaresCommon();
    this.mountRoutes();
    this.mountRoutesHealthcheck();
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

    this.app.use("/movie", movieRouter);
  }

  private mountRoutesHealthcheck() {
    this.app.get("/healthcheck", async (_request, response) => {
      try {
        await DatabaseBootstrap.dataSource.manager.query("SELECT 1");
        response.status(200).send("OK");
      } catch (error) {
        console.error("Healthcheck failed:", error);
        response.status(500).send("KO");
      }
    });
  }
}

export default new App().app;
