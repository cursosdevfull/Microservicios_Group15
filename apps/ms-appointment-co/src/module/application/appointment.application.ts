import { KafkaService } from "lib-kafka";
import { AppointmentPort } from "../ports";
import { Appointment } from "./appointment";
import { env } from '../../env';

export class AppointmentApplication {
    constructor(private readonly port: AppointmentPort){}

    async subscribe() {
        const consumer = KafkaService.instance.getConsumer();
        consumer.subscribe({
            topic: env.KAFKA_TOPIC_CO,
            fromBeginning: true,
        })

        consumer.run({
            eachMessage: async({topic, partition, message}) => {
                const props = JSON.parse(message.value?.toString())
                const appointment = new Appointment(props)

                await this.port.add(appointment)
            }
        })
    } 
}