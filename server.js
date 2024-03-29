const express = require('express');
require('dotenv').config();
const path = require('path');
const logger = require('./utils/logger');
const axios = require('axios').default;
const port = process.env.PORT || 7000
const userRoute = require('./routers/userRoute');
const taskRoute = require('./routers/taskRoute');
const Subscription = require('./models/subscription');
const webhookRoute = require('./routers/webhookRoute');
const connectDB = require('./configs/db_connection');
const { errorHandler, pathHandler } = require('./middlewares/errorHandler');
const rabbitMQConsummer = require('./utils/rabbitMQConsummer');

const app = express();
//connects to db
connectDB();

if(process.env.NODE_ENV != 'test') {
    //starts listening to rabbitMQ event
    rabbitMQConsummer(
        "task_exchange", 
        "task_queue",
        async (task) => {
            //process message here
            let callbackObject = await Subscription.findOne({'username': task.username});
            //communicate back message
            let response = await axios.post(callbackObject.callback, task);

            logger.log(`++++++++++++++++++++++++++ Message communicated. ${response}`);
    });
}

//binds app middlewares
app.use(express.json());
app.use("/api/task", taskRoute);
app.use("/api/user", userRoute);
app.use("/api/webhook", webhookRoute);
app.use('/api/doc', express.static(path.join(__dirname, 'apidoc')));
app.use(errorHandler);
app.use(pathHandler);

//starts the server
app.listen(port, () => {
    logger.info(`server started at port ${port}`);
});

module.exports = app;