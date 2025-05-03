import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "patient"})
export class PatientEntity {
    @PrimaryGeneratedColumn()
    patientId: number

    @Column({type: "varchar", length: 50})
    names: string

    @Column({ type: "varchar", length: 50 })
    lastname: string

    @Column({ type: "int"})
    age: number

    @Column({ type: "varchar", length: 255 })
    email: string

    @Column({ type: "varchar", length: 255 })
    password: string

    @Column({ type: "enum", enum: ["MALE" , "FEMALE" , "OTHER" , "UNDEFINED"]})
    genre: string

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ type: "datetime", nullable: true })
    updatedAt: Date
}