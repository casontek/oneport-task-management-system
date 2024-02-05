const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 7000
const userRoute = require('./routers/userRoute');
const taskRoute = require('./routers/taskRoute');
const connectDB = require('./configs/db_connection');
const { errorHandler, pathHandler } = require('./middlewares/errorHandler');
const rabbitMQConsummer = require('./utils/rabbitMQConsummer');

const app = express();
//connects to db
connectDB();
//starts listening to rabbitMQ event
rabbitMQConsummer("task_exchange", "task_queue");

//binds app middlewares
app.use(express.json());
app.use("/api/task", taskRoute);
app.use("/api/user", userRoute);
app.use(errorHandler);
app.use(pathHandler);

//starts the server
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});