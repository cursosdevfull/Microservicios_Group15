import { KafkaService } from "lib-kafka";
import { DatabaseBootstrap } from "../../bootstrap";
import { Appointment, AppointmentStatus } from "../application";
import { AppointmentPort } from "../ports";
import { AppointmentEntity } from "./entities";
import { env } from '../../env';

export class AppointmentAdapter implements AppointmentPort {
   async add(appointment: Appointment): Promise<Appointment> {
        const appointmentReturned = await this.addToDatabase(appointment)
        this.publishToKafka(appointmentReturned)
        return appointmentReturned
    }

    async confirm(appointmentId: number, status: string): Promise<void> {
        const repository = DatabaseBootstrap.dataSource.getRepository(AppointmentEntity)
        const appointment = await repository.findOne({where: { appointmentId }})

        if (!appointment) {
            throw new Error("Appointment not found")
        }

        appointment.status = status as AppointmentStatus
        await repository.save(appointment)
    }

    private async addToDatabase(appointment: Appointment): Promise<Appointment> {
        const repository = DatabaseBootstrap.dataSource.getRepository(AppointmentEntity)

        const { patientId, scheduleId, status, createdAt, updatedAt, countryISO } = appointment.properties

        const entity = new AppointmentEntity()
        Object.assign(entity, { patientId, scheduleId, status, countryISO, createdAt, updatedAt })

        const appointmentCreated = await repository.save(entity)

        return new Appointment(appointmentCreated)
    }

    private async publishToKafka(appointment: Appointment): Promise<void> {
        const { appointmentId, patientId, scheduleId, status, countryISO, createdAt, updatedAt } = appointment.properties

        const producer = KafkaService.instance.getProducer()
        const topic = env[`KAFKA_TOPIC_${countryISO}`]

        await producer.send({topic, messages: [{
            key: appointmentId.toString(),
            value: JSON.stringify({ appointmentId, patientId, scheduleId, status, countryISO, createdAt, updatedAt })
        }]})
    }
    
}