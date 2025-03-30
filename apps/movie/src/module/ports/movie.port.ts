import type { Movie } from "../application/movie";

export type MoviePort = {
  save(movie: Movie): Promise<Movie>;
  sentNotification(movie: Movie): Promise<void>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  receiveNotification(consumer: (message: any) => void): Promise<void>;
  getOne(movieId: string): Promise<Movie | null>;
  getAll(): Promise<Movie[]>;
  getByPage(
    page: number,
    limit: number,
  ): Promise<{ movies: Movie[]; total: number }>;
};
