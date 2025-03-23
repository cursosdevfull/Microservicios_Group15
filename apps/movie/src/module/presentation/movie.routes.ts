import express from "express";
import { MovieAdapter } from "../adapters";
import { MovieApplication } from "../application";
import type { MoviePort } from "../ports";
import { MovieController } from "./movie.controller";

class MovieRoutes {
  readonly router = express.Router();

  constructor(private readonly controller: MovieController) {
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.get("/", this.controller.getAll.bind(this.controller));
    this.router.get("/page", this.controller.getByPage.bind(this.controller));
    this.router.get("/:movieId", this.controller.getOne.bind(this.controller));
    this.router.post("/", this.controller.create.bind(this.controller));
    this.router.put("/:movieId", this.controller.update.bind(this.controller));
    this.router.delete(
      "/:movieId",
      this.controller.delete.bind(this.controller),
    );
  }
}

const port: MoviePort = new MovieAdapter();
const application = new MovieApplication(port);
const controller = new MovieController(application);
export const movieRouter = new MovieRoutes(controller).router;
