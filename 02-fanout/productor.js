const amqp = require('amqplib');
const args = process.argv.slice(2);

(async () => {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchangeName = "exchange-fanout"
    await channel.assertExchange(exchangeName, "fanout", { durable: true })

    const msg = args.length > 0 ? args[0] : "message by default"
    channel.publish(exchangeName, "", Buffer.from(msg))

    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 1000)

})()