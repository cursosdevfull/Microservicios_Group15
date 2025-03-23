import { type Genre, Movie } from "../../application";
import { ActorEntity } from "../entities";
import { MovieEntity } from "../entities/movie.entity";

export class MovieDto {
  static fromDataToDomain(data: MovieEntity | MovieEntity[]): Movie | Movie[] {
    if (Array.isArray(data)) {
      return data.map((item) => MovieDto.fromDataToDomain(item)) as Movie[];
    }

    return new Movie({
      movieId: data.movieId,
      title: data.title,
      releaseYear: data.releaseYear,
      duration: data.duration,
      poster: data.poster,
      actors: data.actors && data.actors.length < 1 ? null : data.actors,
      genre: data.genre as Genre,
      director: data.director,
      plot: data.plot,
      trailer: data.trailer,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    });
  }

  static fromDomainToData(
    domain: Movie | Movie[],
  ): MovieEntity | MovieEntity[] {
    if (Array.isArray(domain)) {
      return domain.map((item) =>
        MovieDto.fromDomainToData(item),
      ) as MovieEntity[];
    }

    const movieEntity = new MovieEntity();
    movieEntity.movieId = domain.properties.movieId;
    movieEntity.title = domain.properties.title;
    movieEntity.releaseYear = domain.properties.releaseYear;
    movieEntity.duration = domain.properties.duration;
    movieEntity.actors = domain.properties.actors.map((actor) => {
      const entity = new ActorEntity();
      entity.name = actor.name;
      entity.birthPlace = actor.birthPlace;
      return entity;
    });
    movieEntity.poster = domain.properties.poster;
    movieEntity.genre = domain.properties.genre;
    movieEntity.director = domain.properties.director;
    movieEntity.plot = domain.properties.plot;
    movieEntity.trailer = domain.properties.trailer;
    movieEntity.createdAt = domain.properties.createdAt;
    movieEntity.updatedAt = domain.properties.updatedAt;
    movieEntity.deletedAt = domain.properties.deletedAt;

    return movieEntity;
  }
}
