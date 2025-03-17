import express from "express"
import cors from "cors"
import { movieRouter } from "./module/presentation"

class App {
    readonly app = express()

    constructor() {
        this.mountMiddlewaresCommon()
        this.mountRoutes()
        this.mountRoutesHealthcheck()
    }

    private mountMiddlewaresCommon() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    private mountRoutes() {
        this.app.get("/", (request, response) => {
            response.send("Hello World")
        })

        this.app.use("/movie", movieRouter)
    }

    private mountRoutesHealthcheck() {
        this.app.get("/healthcheck", (request, response) => {
            response.send("I'm alive")
        })
    }
}

export default new App().app