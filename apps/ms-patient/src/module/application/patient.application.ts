import { PatientPort } from "../ports";
import { Patient } from "./patient";

export class PatientApplication {
    constructor(private readonly port: PatientPort) { }

    async create(patient: Patient) {
        return await this.port.add(patient);
    }

    async getById(patientId: number) {
        return await this.port.getById(patientId);
    }

    async getByEmail(email: string) {
        return await this.port.getByEmail(email);
    }
}