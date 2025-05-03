import { DataSource, type DataSourceOptions } from "typeorm";
import { Bootstrap } from "./bootstrap";
import { env } from "../env";
import path from "path";

export class DatabaseBootstrap extends Bootstrap {
    static dataSource: DataSource;

    initialize() {
        console.log({
            type: "mysql",
            host: env.DB_HOST,
            port: env.DB_PORT,
            username: env.DB_USER,
            password: env.DB_PASS,
            database: env.DB_NAME,
            entities: [path.join(__dirname, "../module/adapters/entities/*.entity{.ts,.js}")],
            synchronize: env.DB_SYNC,
            logging: env.DB_LOGG,
            poolSize: env.DB_POOL_SIZE,
        })
        const options: DataSourceOptions = {
            type: "mysql",
            host: env.DB_HOST,
            port: env.DB_PORT,
            username: env.DB_USER,
            password: env.DB_PASS,
            database: env.DB_NAME,
            entities: [path.join(__dirname, "../module/adapters/entities/*.entity{.ts,.js}")],
            synchronize: env.DB_SYNC,
            logging: env.DB_LOGG,
            poolSize: env.DB_POOL_SIZE,
        };

        const app = new DataSource(options);
        DatabaseBootstrap.dataSource = app;

        return app.initialize();
    }
}