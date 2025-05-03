import { Appointment } from "../application"

export type AppointmentPort = {
    add(appointment: Appointment): Promise<Appointment>
}