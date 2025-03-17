import { DataSource } from "typeorm";

export abstract class Bootstrap {
    abstract initialize(): Promise<string | NodeJS.ErrnoException | DataSource>
}