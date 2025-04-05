import type { Producer } from "kafkajs";
import { MessageBrokerKafka } from "./kafka.service";

export class ProducerService {
    instance: ProducerService

    private static producer: Producer

    static async connect() {
        ProducerService.producer = await MessageBrokerKafka.connectProducer()
    }

    static async publish(message: object, key: string, topic: string) {
        await ProducerService.producer.send({
            topic,
            messages: [{
                key, value: JSON.stringify(message)
            }]
        })
    }
}