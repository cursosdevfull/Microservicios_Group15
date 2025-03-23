import type { Movie } from ".";
import type { MoviePort } from "../ports";
import type { MovieUpdate } from "./movie";

export class MovieApplication {
  constructor(private readonly port: MoviePort) {}

  async create(movie: Movie) {
    return this.port.save(movie);
  }

  async update(movieId: string, props: MovieUpdate) {
    const movie = await this.port.getOne(movieId);
    if (!movie) throw new Error("Movie not found");

    movie.update(props);
    return this.port.save(movie);
  }

  async delete(movieId: string) {
    const movie = await this.port.getOne(movieId);
    if (!movie) throw new Error("Movie not found");

    movie.delete();
    return this.port.save(movie);
  }

  async getOne(movieId: string) {
    const movie = await this.port.getOne(movieId);
    if (!movie) throw new Error("Movie not found");

    return movie;
  }

  async getAll() {
    return this.port.getAll();
  }

  async getByPage(page: number, limit: number) {
    return this.port.getByPage(page, limit);
  }
}
