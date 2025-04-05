import { Kafka, logLevel } from "kafkajs";
import { env } from '../env';
import { Bootstrap, type ReturnType } from "./bootstrap";

export class KafkaBootstrap extends Bootstrap {
    private static kafka: Kafka

    initialize(): Promise<ReturnType> {
        return new Promise((resolve, reject) => {
            try {
                const { KAFKA_BROKER, CLIENT_ID } = env

                KafkaBootstrap.kafka = new Kafka({
                    clientId: CLIENT_ID,
                    brokers: [KAFKA_BROKER],
                    logLevel: logLevel.INFO
                })

                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    static getInstanceKafka() {
        if (!KafkaBootstrap.kafka) {
            throw new Error("Kafka instance not initialized")
        }
        return KafkaBootstrap.kafka
    }
}