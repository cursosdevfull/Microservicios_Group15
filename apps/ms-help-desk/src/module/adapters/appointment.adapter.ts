import { DatabaseBootstrap } from "../../bootstrap";
import { Appointment } from "../application";
import { AppointmentPort } from "../ports";
import { AppointmentEntity } from "./entities";

export class AppointmentAdapter implements AppointmentPort {
    async add(appointment: Appointment): Promise<Appointment> {
        const repository = DatabaseBootstrap.dataSource.getRepository(AppointmentEntity)

        const { patientId, scheduleId, createdAt, updatedAt, countryISO, appointmentId } = appointment.properties

        const entity = new AppointmentEntity()
        Object.assign(entity, { patientId, scheduleId, status: "CONFIRMED", countryISO, createdAt, updatedAt, appointmentId })

        const appointmentCreated = await repository.save(entity)

        return new Appointment(appointmentCreated)
    }
}