import { DataSource, DataSourceOptions } from "typeorm";
import { Bootstrap } from "./bootstrap";

export class DatabaseBootstrap extends Bootstrap {
    static dataSource: DataSource

    initialize() {
        const options: DataSourceOptions = {
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "user",
            password: "12345",
            database: "db",
            entities: ["src/module/**/*.entity.ts"],
            synchronize: true,
            logging: true,
            poolSize: 10
        }

        const app = new DataSource(options)
        DatabaseBootstrap.dataSource = app

        return app.initialize()
    }

}