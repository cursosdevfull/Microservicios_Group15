import { PrimaryColumn, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { MovieEntity } from "./movie.entity"

@Entity({ name: "actor" })
export class ActorEntity {
    @PrimaryGeneratedColumn()
    actorId: number

    @Column({ type: "varchar", length: 100 })
    name: string

    @Column({ type: "varchar", length: 100 })
    birthPlace: string

    @ManyToOne(() => MovieEntity, movie => movie.actors)
    movie: MovieEntity
}