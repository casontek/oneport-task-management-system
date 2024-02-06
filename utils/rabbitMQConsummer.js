const logger = require('./logger');
const rabbitMQConnection = require('../configs/rabbit_connection');

const rabbitMQConsummer = async (exchange, taskQueue, onTaskReceived) => {
    const connection = await rabbitMQConnection();
    //creates connection channel
    const channel = await connection.createChannel();
    try {
        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue(taskQueue, { durable: true });
        await channel.bindQueue(taskQueue, exchange, '');
    
        channel.consume(taskQueue, (message) => {
          const task = JSON.parse(message.content.toString());

          logger.debug(`Received task message: ${JSON.stringify(task)}`);
          
          //process task
          setTimeout(async () => {
            try {
              await onTaskReceived(task);

              logger.info(`Task processed: ${JSON.stringify(task)}`);
              channel.ack(message);
            } 
            catch (error) {
              logger.error(`Message processing failed. ERROR: ${error}`) ;
            }
          }, 1000);
         
        }, { noAck: false });
    } 
    catch (error) {
        logger.error(`Rabbit error: ${error}`);
    }
}


module.exports = rabbitMQConsummer;