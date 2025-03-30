import "./env"
import app from "./app";
import {
  type Bootstrap,
  DatabaseBootstrap,
  ServerBootstrap,
} from "./bootstrap";
import { env } from "./env";
import { RabbitmqBootstrap } from "./bootstrap/rabbitmq.bootstrap";
import { MovieApplication } from './module/application/movie.application';

(async () => {
  try {
    const serverBootstrap: Bootstrap = new ServerBootstrap(app);
    const databaseBootstrap: Bootstrap = new DatabaseBootstrap();
    const rabbitmqBootstrap: Bootstrap = new RabbitmqBootstrap();

    const promises = [
      serverBootstrap.initialize(),
      databaseBootstrap.initialize(),
      rabbitmqBootstrap.initialize(),
    ];

    await Promise.all(promises);
    console.log(`Server is running on port ${env.PORT}`);
    console.log("Database is connected");
    console.log("RabbitMQ connected")

    MovieApplication.instance.listenNotification();
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
