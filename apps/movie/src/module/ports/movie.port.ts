import type { Movie } from "../application/movie";

export type MoviePort = {
  save(movie: Movie): Promise<Movie>;
  getOne(movieId: string): Promise<Movie | null>;
  getAll(): Promise<Movie[]>;
  getByPage(
    page: number,
    limit: number,
  ): Promise<{ movies: Movie[]; total: number }>;
};
