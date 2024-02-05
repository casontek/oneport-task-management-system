const amqp = require('amqplib');
const rabbitMQConnection = require('../configs/rabbit_connection');

const rabbitMQConsummer = async (exchange, taskQueue) => {
    const connection = await rabbitMQConnection();
    //creates connection channel
    const channel = await connection.createChannel();
    try {
        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue(taskQueue, { durable: true });
        await channel.bindQueue(taskQueue, exchange, '');
    
        channel.consume(taskQueue, (message) => {
          const task = JSON.parse(message.content.toString());

          console.log(`Received task message: ${JSON.stringify(task)}`);
    
          //onTaskReceived(task);
    
          /*
          // Simulate processing time
          setTimeout(() => {
            console.log(`Task processed: ${JSON.stringify(task)}`);
            channel.ack(msg);
          }, 2000);
          */
         
        }, { noAck: false });
    } 
    catch (error) {
        console.log(`Rabbit error: ${error}`);
    }
}


module.exports = rabbitMQConsummer;