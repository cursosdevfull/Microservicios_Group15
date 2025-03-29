const amqp = require("amqplib")
const args = process.argv.slice(2);

(async () => {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchangeName = "exchange-topic"
    await channel.assertExchange(exchangeName, "topic", { durable: true })

    const assertQueue = await channel.assertQueue("", { exclusive: true })
    const routingKeys = args.length > 0 ? args : ["key"]

    const routingKeyList = []

    for (const routingKey of routingKeys) {
        routingKeyList.push(channel.bindQueue(assertQueue.queue, exchangeName, routingKey))
    }

    await Promise.all(routingKeyList)

    channel.consume(assertQueue.queue, msg => console.log(msg.content.toString()), { noAck: false })

})()