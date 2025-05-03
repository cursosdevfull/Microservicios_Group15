import type { DataSource } from "typeorm";

export type ReturnType = string | NodeJS.ErrnoException | DataSource | boolean;

export abstract class Bootstrap {
    abstract initialize(): Promise<ReturnType>;
}