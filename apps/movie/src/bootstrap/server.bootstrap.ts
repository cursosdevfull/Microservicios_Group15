import { Application } from "express";
import http from "http"
import { Bootstrap } from "./bootstrap";

export class ServerBootstrap extends Bootstrap {
    constructor(private readonly app: Application) {
        super()
    }

    initialize(): Promise<string | NodeJS.ErrnoException> {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app)

            server.listen(4000, "0.0.0.0")
                .on("listening", () => resolve("Server is running on port 4000"))
                .on("error", (error: NodeJS.ErrnoException) => {
                    if (error.syscall !== "listen") {
                        reject(error)
                    }

                    switch (error.code) {
                        case "EACCES":
                            reject("Port 3000 requires elevated privileges")
                            break
                        case "EADDRINUSE":
                            reject("Port 3000 is already in use")
                            break
                        default:
                            reject(error)
                    }
                })
        })
    }
}