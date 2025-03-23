import { v4 as uuidv4 } from "uuid";
import type { Actor, Genre } from "./";

export type MovieRequired = {
  title: string;
  releaseYear: number;
  duration: number;
};

export type MovieOptional = {
  movieId: string;
  actors: Actor[];
  poster: string;
  genre: Genre;
  director: string;
  plot: string;
  trailer: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type MovieProps = MovieRequired & Partial<MovieOptional>;

export type MovieUpdate = Partial<
  MovieRequired &
    Omit<MovieOptional, "createdAt" | "deletedAt" | "movieId" | "updatedAt">
>;

export class Movie {
  private readonly movieId: string;
  private title: string;
  private releaseYear: number;
  private duration: number;
  private actors: Actor[];
  private poster: string;
  private genre: Genre;
  private director: string;
  private plot: string;
  private trailer: string;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(props: MovieProps) {
    if (props.title.length < 3)
      throw new Error("Title must be at least 3 characters long");
    if (props.releaseYear < 1895)
      throw new Error("Release year must be greater than 1895");
    if (props.duration < 1) throw new Error("Duration must be greater than 0");
    if (props.actors && props.actors.length < 1)
      throw new Error("At least one actor is required");
    if (props.poster && props.poster.length < 3)
      throw new Error("Poster must be at least 3 characters long");

    Object.assign(this, props);

    if (!props.createdAt) this.createdAt = new Date();
    if (!props.movieId) this.movieId = uuidv4();
  }

  get properties() {
    return {
      movieId: this.movieId,
      title: this.title,
      releaseYear: this.releaseYear,
      duration: this.duration,
      actors: this.actors,
      poster: this.poster,
      genre: this.genre,
      director: this.director,
      plot: this.plot,
      trailer: this.trailer,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  delete() {
    this.deletedAt = new Date();
  }

  update(props: MovieUpdate) {
    const filteredProps = Object.entries(props)
      .filter(([_, value]) => value !== undefined)
      .reduce(
        (acc: Record<string, unknown>, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, unknown>,
      );

    Object.assign(this, filteredProps);
    this.updatedAt = new Date();
  }
}
