export type GatewayPort = {
    bookAppointment(patientId: number, scheduleId: number, countryISO: string): Promise<any>    
    createPatient(names: string, lastname: string, email: string, password: string, age: number, genre: string): void
    login(email: string, password: string): Promise<any>
}