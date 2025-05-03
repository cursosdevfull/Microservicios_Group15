import { KafkaService } from "lib-kafka";
import { AppointmentPort } from "../ports";
import { Appointment } from "./appointment";
import { env } from '../../env';

export class AppointmentApplication {
    constructor(private readonly port: AppointmentPort) {

    }

    async create(appointment: Appointment) {
        return await this.port.add(appointment);
    }

    async subscribe() {
        const consumer = KafkaService.instance.getConsumer();
        consumer.subscribe({
            topic: env.KAFKA_TOPIC_CONFIRM,
            fromBeginning: true,
        })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Received message: ${message.value?.toString()}`);
                console.log(`Topic: ${topic}, Partition: ${partition}`);

                const props = JSON.parse(message.value?.toString())
                this.port.confirm(props.appointmentId, props.status)
            }
        })
    }
}