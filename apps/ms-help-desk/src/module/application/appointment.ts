import { AppointmentCountry } from "./appointment-country.enum";
import { AppointmentStatus } from "./appointment-status.enum";

export type AppointmentPropsRequired = {
    patientId: number;
    scheduleId: number;
    countryISO: AppointmentCountry
}

export type AppointmentPropsOptional = {
    appointmentId: number;
    status: AppointmentStatus;
    createdAt: Date;
    updatedAt: Date | null;
}

export type AppointmentProps = AppointmentPropsRequired & Partial<AppointmentPropsOptional>

export class Appointment {
    private readonly appointmentId: number;
    private readonly patientId: number;
    private readonly scheduleId: number;
    private countryISO: AppointmentCountry
    private status: AppointmentStatus;
    private readonly createdAt: Date;
    private updatedAt: Date | null;

    constructor(props: AppointmentProps){
        Object.assign(this, props);

        if(!this.createdAt){
            this.createdAt = new Date();
        }
    }

    get properties(): Required<AppointmentProps> {
        return {
            appointmentId: this.appointmentId,
            patientId: this.patientId,
            scheduleId: this.scheduleId,
            status: this.status,
            countryISO: this.countryISO,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    update(status: AppointmentStatus) {
        this.status = status;
        this.updatedAt = new Date();
    }
}