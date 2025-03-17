import { Actor, Genre } from "src/module/application";
import { MovieProps } from "src/module/application/movie";

export class MovieRequestDto {
    title: string;
    releaseYear: number;
    duration: number;
    actors: Actor[];
    poster: string;
    genre: string;
    director: string;
    plot: string;
    trailer: string;

    constructor(props: MovieProps) {
        Object.assign(this, props);
    }

    properties(): MovieProps {
        return {
            title: this.title,
            releaseYear: this.releaseYear,
            duration: this.duration,
            actors: this.actors,
            poster: this.poster,
            genre: this.genre as Genre,
            director: this.director,
            plot: this.plot,
            trailer: this.trailer
        }
    }
}