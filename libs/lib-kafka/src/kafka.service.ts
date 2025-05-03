import { type Consumer, Kafka, Partitioners, type Producer } from "kafkajs";

export type KafkaServiceProps = {
    kafka: Kafka,
    topics: string[],
    kafkaGroupId: number
}

export class KafkaService {
    static instance: KafkaService;
    private readonly kafka: Kafka
    private readonly topics: string[]
    private readonly kafkaGroupId: number
    private producer: Producer
    private consumer: Consumer

    private constructor(props: KafkaServiceProps) {
        this.kafka = props.kafka
        this.topics = props.topics
        this.kafkaGroupId = props.kafkaGroupId
    }

    public static getInstance(topics: string[], kafkaGroupId: number, kafka?: Kafka): KafkaService {
        if (!KafkaService.instance) {

            if(!kafka) {
                throw new Error("Kafka instance is required to create KafkaService instance.");
            }

            KafkaService.instance = new KafkaService({ kafka, topics, kafkaGroupId });
        }
        return KafkaService.instance;
    }

    private async createTopics(...topicList: string[]) {
        const topics = topicList.map(topic => ({
            topic,
            numPartitions: 2,
            replicationFactor: 1,
        }))

        const admin = this.kafka.admin()
        await admin.connect()
        const topicExists = await admin.listTopics()

        for (const topicItem of topics) {
            if (!topicExists.includes(topicItem.topic)) {
                await admin.createTopics({
                    topics: [topicItem],
                })
            }
        }

        await admin.disconnect()
    }

    async connectProducer() {
        await this.createTopics(...this.topics)

        if (this.producer) {
            return this.producer
        }

        this.producer = this.kafka.producer({
            createPartitioner: Partitioners.DefaultPartitioner
        })

        await this.producer.connect()
        return this.producer
    }

    async disconnectProducer(){
        if (this.producer) {
            await this.producer.disconnect()
        }
    }

    async connectConsumer() {
        if (this.consumer) {
            return this.consumer
        }

        this.consumer = this.kafka.consumer({
            groupId: this.kafkaGroupId.toString(),
        })

        await this.consumer.connect()
        return this.consumer
    }

    getProducer() {
        if (!this.producer) {
            throw new Error("Producer is not connected. Call connectProducer() first.");
        }
        return this.producer
    }

    getConsumer() {
        if (!this.consumer) {
            throw new Error("Consumer is not connected. Call connectConsumer() first.");
        }
        return this.consumer
    }

}

