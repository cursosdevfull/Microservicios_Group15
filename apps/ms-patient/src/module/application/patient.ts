import { PatientGenre } from "./patient-genre.enum";


export type PatientPropsRequired = {
    names: string;
    lastname: string;
    age: number;
    email: string;
    password: string;
    genre: PatientGenre;
}

export type PatientPropsOptional = {
    patientId: number
    createdAt: Date;
}

export type PatientProps = PatientPropsRequired & Partial<PatientPropsOptional>

export class Patient {
    private readonly patientId: number;
    private names: string;
    private lastname: string;
    private age: number;
    private email: string;
    private password: string;
    private genre: PatientGenre;
    private readonly createdAt: Date;

    constructor(props: PatientProps){
        Object.assign(this, props);

        if(!this.createdAt) this.createdAt = new Date();
    }

    get properties(): Required<PatientProps> {
        return {
            patientId: this.patientId,
            names: this.names,
            lastname: this.lastname,
            age: this.age,
            email: this.email,
            password: this.password,
            genre: this.genre,
            createdAt: this.createdAt
        }
    }
}