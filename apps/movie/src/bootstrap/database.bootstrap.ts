import { DataSource, type DataSourceOptions } from "typeorm";
import { Bootstrap } from "./bootstrap";
import { env } from "../env";
import { MovieEntity, ActorEntity } from '../module/adapters/entities';

export class DatabaseBootstrap extends Bootstrap {
  static dataSource: DataSource;

  initialize() {
    const options: DataSourceOptions = {
      type: "mysql",
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
      entities: [MovieEntity, ActorEntity],
      synchronize: true,
      logging: false,
      poolSize: 10,
    };

    const app = new DataSource(options);
    DatabaseBootstrap.dataSource = app;

    return app.initialize();
  }
}
