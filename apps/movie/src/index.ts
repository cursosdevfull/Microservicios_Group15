import app from "./app"
import { ServerBootstrap, DatabaseBootstrap, Bootstrap } from "./bootstrap"

(async () => {
    try {
        const serverBootstrap: Bootstrap = new ServerBootstrap(app)
        const databaseBootstrap: Bootstrap = new DatabaseBootstrap()

        const promises = [serverBootstrap.initialize(), databaseBootstrap.initialize()]

        await Promise.all(promises)
        console.log("Server is running on port 4000")
        console.log("Database is connected")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})()





