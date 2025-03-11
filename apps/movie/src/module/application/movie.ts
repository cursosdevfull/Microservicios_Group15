import { v4 as uuidv4 } from 'uuid'

export type MovieRequired = {
    title: string
    releaseYear: number
    duration: number
}

export type MovieOptional = {
    movieId: string
    actors: string[]
    poster: string
    genre: string
    director: string
    plot: string
    trailer: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

export type MovieProps = MovieRequired & Partial<MovieOptional>

export type MovieUpdate = Partial<MovieRequired & Omit<MovieOptional, 'createdAt' | 'deletedAt' | 'movieId' | 'updatedAt'>>

export class Movie {
    private readonly movieId: string
    private title: string
    private releaseYear: number
    private duration: number
    private actors: string[]
    private poster: string
    private genre: string
    private director: string
    private plot: string
    private trailer: string
    private readonly createdAt: Date
    private updatedAt: Date | undefined
    private deletedAt: Date | undefined

    constructor(props: MovieProps) {
        Object.assign(this, props)

        if (!props.createdAt) this.createdAt = new Date()
        if (!props.movieId) this.movieId = uuidv4()
    }

    get properties() {
        return {
            movieId: this.movieId,
            title: this.title,
            releaseYear: this.releaseYear,
            duration: this.duration,
            actors: this.actors,
            poster: this.poster,
            genre: this.genre,
            director: this.director,
            plot: this.plot,
            trailer: this.trailer,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        }
    }

    delete() {
        this.deletedAt = new Date()
    }

    update(props: MovieUpdate) {
        Object.assign(this, props)
        this.updatedAt = new Date()
    }
}