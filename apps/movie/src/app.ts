import express from "express"
import cors from "cors"

class App {
    readonly app = express()

    constructor() {
        this.mountMiddlewaresCommon()
        this.mountRoutes()
        this.mountRoutesHealthcheck()
    }

    private mountMiddlewaresCommon() {
        this.app.use(cors())
    }

    private mountRoutes() {
        this.app.get("/", (request, response) => {
            response.send("Hello World")
        })

        this.app.get("/spanish", (request, response) => {
            response.send("Hola Mundo")
        })
    }

    private mountRoutesHealthcheck() {
        this.app.get("/healthcheck", (request, response) => {
            response.send("I'm alive")
        })
    }
}

export default new App().app