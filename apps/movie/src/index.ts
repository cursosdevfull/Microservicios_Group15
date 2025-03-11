import app from "./app"
import { ServerBootstrap } from "./bootstrap/server.bootstrap"

(async () => {
    try {
        const serverBootstrap = new ServerBootstrap(app)

        const promises = [serverBootstrap.initialize()]

        await Promise.all(promises)
        console.log("Server is running on port 4000")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})()





