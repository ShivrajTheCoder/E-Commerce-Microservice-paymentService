import { createAMQPConnection } from "./rabbit_connection";

async function listenForMessages(queueName:string, callback:any) {
    try {
        const connection = await createAMQPConnection();
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName);
        await channel.consume(queueName, (message:any) => {
            if (message !== null) {
                const content = message.content.toString();
                callback(content);

                channel.ack(message);
            }
        });

        console.log(`Listening for messages on queue "${queueName}"...`);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

export {listenForMessages};