import { GatewayPort } from "../ports";
import { env } from '../../env';

export class GatewayAdapter implements GatewayPort {
    bookAppointment(patientId: number, scheduleId: number, countryISO: string): Promise<any> {
        return fetch(env.URL_APPOINTMENT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ patientId, scheduleId, countryISO })
        }).then(response => response.json())
    }

    createPatient(names: string, lastname: string, email: string, password: string, age: number, genre: string) {
        fetch(env.URL_PATIENT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ names, lastname, email, password, age, genre })
        }).then(response => response.json())
    }

    async login(email: string, password: string) {
        const response = await fetch(env.URL_AUTH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })

        return await response.json()
    }
}