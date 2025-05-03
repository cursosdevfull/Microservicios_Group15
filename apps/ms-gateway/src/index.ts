import "reflect-metadata";
import "./env"
import app from "./app";
import {
    type Bootstrap,
    ServerBootstrap,
} from "./bootstrap";
import { env } from "./env";

(async () => {
    try {
        const serverBootstrap: Bootstrap = new ServerBootstrap(app);

        const promises = [
            serverBootstrap.initialize(),
        ];

        await Promise.all(promises);
        console.log(`Server is running on port ${env.PORT}`);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason, "Promise:", promise);
    process.exit(1);
});

process.on("exit", () => {
    console.log("Process is exiting");
    gratefullShutdown();
});

process.on("SIGINT", () => {
    console.log("Received SIGINT. Exiting...");
    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log("Received SIGTERM. Exiting...");
    process.exit(0);
});

function gratefullShutdown() {
    console.log("Gracefully shutting down...");
}