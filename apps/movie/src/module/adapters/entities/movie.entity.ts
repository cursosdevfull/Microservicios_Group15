import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ActorEntity } from "./actor.entity";

@Entity({ name: "movie" })
export class MovieEntity {
  @PrimaryColumn()
  movieId: string;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @Column({ type: "int" })
  releaseYear: number;

  @Column()
  duration: number;

  @Column({ nullable: true })
  poster: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  genre: string;

  @Column({ nullable: true })
  director: string;

  @Column({ nullable: true })
  director2: string;


  @Column({ type: "text", nullable: true })
  plot: string;

  @Column({ nullable: true })
  trailer: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @OneToMany(
    () => ActorEntity,
    (actor) => actor.movie,
    { cascade: true },
  )
  actors: ActorEntity[];
}
