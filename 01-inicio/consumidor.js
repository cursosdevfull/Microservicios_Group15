const amqp = require("amqplib");

(async () => {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const queueName = "prueba"
    await channel.assertQueue(queueName, { durable: true })

    channel.consume(queueName, async (msg) => {
        console.log(msg.content.toString())
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    const number = Math.random()
                    if (number > 0.5) {
                        channel.ack(msg)
                        console.log("Aprobado")
                        resolve()
                    } else {
                        channel.nack(msg)
                        console.log("Rechazado")
                        reject("Rechazado")
                    }
                }, 1000);
            })

        } catch (error) {
            console.log("error", error)
        }

    }, {
        noAck: false
    })
})()