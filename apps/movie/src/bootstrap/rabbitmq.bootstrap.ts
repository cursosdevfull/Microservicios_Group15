import amqp from "amqplib";
import { env } from "../env";
import { Bootstrap } from "./bootstrap";


export class RabbitmqBootstrap extends Bootstrap {
    static channel: amqp.Channel
    connection!: amqp.ChannelModel
    static instance: RabbitmqBootstrap

    constructor() {
        super()
        if (!RabbitmqBootstrap.instance) {
            RabbitmqBootstrap.instance = this
        }
    }

    static reinitialize() {
        if (RabbitmqBootstrap.instance) {
            RabbitmqBootstrap.instance.close()
            RabbitmqBootstrap.instance = new RabbitmqBootstrap()
            return RabbitmqBootstrap.instance.initialize()
        }
    }

    initialize(): Promise<string | NodeJS.ErrnoException> {
        // biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
        return new Promise(async (resolve, reject) => {
            const host = env.RABBITMQ_HOST;

            try {
                this.connection = await amqp.connect(host)
                RabbitmqBootstrap.channel = await this.connection.createChannel()
                resolve("RabbitMQ connected")
            } catch (error) {
                reject(error)
            }
        })
    }

    close() {
        console.log("Closing RabbitMQ connection")
        this.connection?.close()
    }

}