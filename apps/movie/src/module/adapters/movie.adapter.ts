import { IsNull } from "typeorm";
import { DatabaseBootstrap } from "../../bootstrap";
import { RabbitmqBootstrap } from '../../bootstrap/rabbitmq.bootstrap';
import type { Movie } from "../application";
import type { MoviePort } from "../ports";
import { MovieDto } from "./dtos";
import { MovieEntity } from "./entities/movie.entity";
import type { ConsumeMessage } from "amqplib";
import { env } from '../../env';

export class MovieAdapter implements MoviePort {
  async save(movie: Movie): Promise<Movie> {
    const repository = DatabaseBootstrap.dataSource.getRepository(MovieEntity);

    const movieEntity = MovieDto.fromDomainToData(movie) as MovieEntity;

    await repository.save(movieEntity);
    return movie;
  }

  async getOne(movieId: string): Promise<Movie | null> {
    const repository = DatabaseBootstrap.dataSource.getRepository(MovieEntity);

    const movieEntity = await repository.findOne({
      where: { movieId, deletedAt: IsNull() },
      relations: ["actors"],
    });

    if (!movieEntity) {
      return null;
    }

    return MovieDto.fromDataToDomain(movieEntity) as Movie;
  }

  async getAll(): Promise<Movie[]> {
    const repository = DatabaseBootstrap.dataSource.getRepository(MovieEntity);

    const movieEntities = await repository.find({
      where: { deletedAt: IsNull() },
      relations: ["actors"],
    });

    return MovieDto.fromDataToDomain(movieEntities) as Movie[];
  }

  async getByPage(
    page: number,
    limit: number,
  ): Promise<{ movies: Movie[]; total: number }> {
    const repository = DatabaseBootstrap.dataSource.getRepository(MovieEntity);

    const [movieEntities, total] = await repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { deletedAt: IsNull() },
      relations: ["actors"],
    });

    const movies = MovieDto.fromDataToDomain(movieEntities) as Movie[];

    return { movies, total };
  }

  sentNotification(movie: Movie): Promise<void> {
    const channel = RabbitmqBootstrap.channel;
    const exchangeName = env.EXCHANGE_NAME;
    const exchangeType = env.EXCHANGE_TYPE;
    const exchangeOptions = { durable: env.EXCHANGE_OPTIONS_DURABLE };
    const routingKey = env.ROUTING_KEY;
    const message = JSON.stringify(movie.properties);

    channel.assertExchange(exchangeName, exchangeType, exchangeOptions);
    channel.publish(exchangeName, routingKey, Buffer.from(message), {
      persistent: true,
    });

    return;
  }

  async receiveNotification(consumer: (message: ConsumeMessage) => void) {
    const channel = RabbitmqBootstrap.channel;
    const exchangeName = env.EXCHANGE_NAME;
    const exchangeType = env.EXCHANGE_TYPE;
    const exchangeOptions = { durable: env.EXCHANGE_OPTIONS_DURABLE };
    const routingKey = env.ROUTING_KEY;

    channel.assertExchange(exchangeName, exchangeType, exchangeOptions);
    const queue = await channel.assertQueue("", { exclusive: true });

    await channel.bindQueue(queue.queue, exchangeName, routingKey);

    await channel.consume(queue.queue, consumer, { noAck: true })
  }
}
