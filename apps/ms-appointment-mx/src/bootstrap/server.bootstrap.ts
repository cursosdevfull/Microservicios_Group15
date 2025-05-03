import http from "http";
import type { Application } from "express";
import { Bootstrap } from "./bootstrap";
import { env } from '../env';

export class ServerBootstrap extends Bootstrap {
    constructor(private readonly app: Application) {
        super();
    }

    initialize(): Promise<string | NodeJS.ErrnoException> {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);

            server
                .listen(env.PORT)
                .on("listening", () => resolve(`Server is running on port ${env.PORT}`))
                .on("error", (error: NodeJS.ErrnoException) => {
                    if (error.syscall !== "listen") {
                        reject(error);
                    }

                    switch (error.code) {
                        case "EACCES":
                            reject(`Port ${env.PORT} requires elevated privileges`);
                            break;
                        case "EADDRINUSE":
                            reject(`Port ${env.PORT} is already in use`);
                            break;
                        default:
                            reject(error);
                    }
                });
        });
    }
}