import {type  Consumer, Partitioners, type Producer } from "kafkajs";
import { KafkaBootstrap } from "../../bootstrap/kafka.bootstrap";
import { env } from '../../env';

let producer: Producer
let consumer: Consumer

const createTopics = async (...topicList: string[]) => {
    const topics = topicList.map(topic => ({
        topic,
        numPartitions: 2,
        replicationFactor: 1,
    }))

    const admin = KafkaBootstrap.getInstanceKafka().admin()
    await admin.connect()
    const topicExists = await admin.listTopics()

    for(const topicItem of topics) {
        if(!topicExists.includes(topicItem.topic)) {
            await admin.createTopics({
                topics: [topicItem],
            })
        }
    }

    await admin.disconnect()
}

const connectProducer = async () => {
    await createTopics(env.KAFKA_TOPIC_MESSAGE)

    if(producer) {
        return producer
    }

    producer = KafkaBootstrap.getInstanceKafka().producer({
        createPartitioner: Partitioners.DefaultPartitioner
    })

    await producer.connect()
    return producer
}

const disconnectProducer = async () => {
    if(producer) {
        await producer.disconnect()
    }
}

const connectConsumer = async () => {
    if(consumer) {
        return consumer
    }

    consumer = KafkaBootstrap.getInstanceKafka().consumer({
        groupId: env.KAFKA_GROUP_ID.toString(),
    })

    await consumer.connect()
    return consumer
}


export const MessageBrokerKafka = {
    connectProducer,
    disconnectProducer,
    connectConsumer
}