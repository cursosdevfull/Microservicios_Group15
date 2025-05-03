import { Patient } from "../application"

export type PatientPort = {
    add(patient: Patient): Promise<Patient>
    getById(patientId: number): Promise<Patient | null>
    getByEmail(email: string): Promise<Patient | null>
}