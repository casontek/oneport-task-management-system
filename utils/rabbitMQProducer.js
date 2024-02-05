const amqp = require('amqplib');
const rabbitMQConnection = require('../configs/rabbit_connection');

const rabbitMQProducer = async (task, exchange, taskQueue) => {

    const connection = await rabbitMQConnection();
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(taskQueue, { durable: true });
    await channel.bindQueue(taskQueue, exchange, '');

    channel.publish(exchange, '', Buffer.from(JSON.stringify(task)), { persistent: true });
    
    console.log(`Task sent: ${JSON.stringify(task)}`);

};


module.exports = rabbitMQProducer;