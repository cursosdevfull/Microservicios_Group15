const amqp = require("amqplib");
const args = process.argv.slice(2);

(async () => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel()

    const exchangeName = "exchange-fanout"
    await channel.assertExchange(exchangeName, "fanout", { durable: true })

    const assertQueue = await channel.assertQueue("", { exclusive: true })
    await channel.bindQueue(assertQueue.queue, exchangeName)

    channel.consume(assertQueue.queue, msg => {
        console.log(msg.content.toString())
        if (args.length && args[0] === "yes") {
            channel.ack(msg)
        } else {
            //channel.nack(msg)
        }

    }, {
        noAck: false
    })
})()