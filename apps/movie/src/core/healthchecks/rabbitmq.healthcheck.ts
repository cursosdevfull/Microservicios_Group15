import { RabbitmqBootstrap } from '../../bootstrap/rabbitmq.bootstrap';

export async function rabbitmqHealthcheck(): Promise<{ resource: string, status: string }> {
    try {
        // Verificar si el canal existe o está cerrado
        if (!RabbitmqBootstrap.channel) {
            // Intentar reiniciar la conexión
            try {
                await RabbitmqBootstrap.reinitialize();
                console.log("RabbitMQ connection reestablished");
            } catch (reconnectError) {
                console.error("Failed to reconnect to RabbitMQ:", reconnectError);
                throw new Error(JSON.stringify({
                    resource: "RabbitMQ",
                    status: "Down",
                    error: "Failed to reconnect to RabbitMQ"
                }));
            }
        }

        // Crear una cola temporal para probar la conexión
        const { queue } = await RabbitmqBootstrap.channel.assertQueue('', {
            exclusive: true,
            autoDelete: true
        });

        // Eliminar la cola temporal después de crearla
        await RabbitmqBootstrap.channel.deleteQueue(queue);

        return { resource: "RabbitMQ", status: "Up" };
    } catch (error) {
        console.error("RabbitMQ healthcheck failed:", error);

        // Proporcionar un mensaje de error más específico
        const errorMessage = error instanceof Error
            ? error.message
            : "Healthcheck RabbitMQ failed";

        throw new Error(JSON.stringify({
            resource: "RabbitMQ",
            status: "Down",
            error: errorMessage
        }));
    }
}