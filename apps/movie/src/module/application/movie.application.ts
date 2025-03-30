import type { ConsumeMessage } from "amqplib";
import type { Movie } from ".";
import type { MoviePort } from "../ports";
import type { MovieUpdate } from "./movie";

export class MovieApplication {
  static instance: MovieApplication

  constructor(private readonly port: MoviePort) {
    if (!MovieApplication.instance) {
      MovieApplication.instance = this;
    }
  }

  async create(movie: Movie) {
    const movieCreated = await this.port.save(movie);
    await this.port.sentNotification(movieCreated);
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

  async listenNotification() {
    this.port.receiveNotification((message: ConsumeMessage) => {
      console.log("Received message:", message.content.toString());
    });
  }
}
