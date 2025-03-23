import type { Request, Response } from "express";
import { Movie, type MovieApplication } from "../application";
import { MovieRequestDto } from "./dtos/movie-request.dto";

export class MovieController {
  constructor(private readonly application: MovieApplication) { }

  async create(request: Request, response: Response) {
    const props = new MovieRequestDto(request.body).properties();
    const movie = new Movie(props);

    const result = await this.application.create(movie);
    response.json(result);
  }

  async update(request: Request, response: Response) {
    const movieId = request.params.movieId;
    const {
      title,
      releaseYear,
      duration,
      actors,
      poster,
      genre,
      director,
      plot,
      trailer,
    } = request.body;

    const result = await this.application.update(movieId, {
      title,
      releaseYear,
      duration,
      actors,
      poster,
      genre,
      director,
      plot,
      trailer,
    });

    response.json(result);
  }

  async delete(request: Request, response: Response) {
    const movieId = request.params.movieId;

    const result = await this.application.delete(movieId);
    response.json(result);
  }

  async getOne(request: Request, response: Response) {
    const movieId = request.params.movieId;
    const result = await this.application.getOne(movieId);
    response.json(result);
  }

  async getAll(_request: Request, response: Response) {
    const result = await this.application.getAll();
    response.json(result);
  }

  async getByPage(request: Request, response: Response) {
    const page = Number.parseInt(request.query.page as string);
    const limit = Number.parseInt(request.query.limit as string);

    const result = await this.application.getByPage(page, limit);
    response.json(result);
  }
}
