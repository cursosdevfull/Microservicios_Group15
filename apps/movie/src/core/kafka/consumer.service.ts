import type { Consumer } from "kafkajs";
import { MessageBrokerKafka } from "./kafka.service";

export class ConsumerService {
    instance: ConsumerService   

    private static consumer: Consumer

    static async connect(topic: string) {
        ConsumerService.consumer  = await MessageBrokerKafka.connectConsumer()
        ConsumerService.consumer.subscribe({
            topic, fromBeginning: true
        })

        ConsumerService.consumer.run({
            eachMessage: async ({topic, partition, message})=> {
                console.log(`Topic: ${topic}, Partition: ${partition}`)
                const value = message.value?.toString() || "{}"
                console.log(`Received message: ${value}`)
            }
        })
    }
}