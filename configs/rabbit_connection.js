const amqp = require('amqplib');

let connection;

const rabbitMQConnection = async () => {
    if(!connection) {
        connection = await amqp.connect(process.env.RABBIT_MQ_URL);

        console.log(`Rabbit connected: ${connection.connection.serverProperties.information}`);
    }

    return connection;
}


module.exports = rabbitMQConnection;