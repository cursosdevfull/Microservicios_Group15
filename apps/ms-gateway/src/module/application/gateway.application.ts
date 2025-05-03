import { GatewayPort } from "../ports";

export class GatewayApplication {
    constructor(private readonly port: GatewayPort) {}

    async bookAppointment(patientId: number, scheduleId: number, countryISO: string) {
        return await this.port.bookAppointment(patientId, scheduleId, countryISO)
    }

    async createPatient(names: string, lastname: string, email: string, password: string, age: number, genre: string) {
        return await this.port.createPatient(names, lastname, email, password, age, genre)
    }

    async login(email: string, password: string) {
        const response =  await this.port.login(email, password)
        return response.token
    }

}