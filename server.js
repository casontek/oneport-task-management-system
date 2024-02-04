const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 7000
const userRoute = require('./routers/userRoute');
const taskRoute = require('./routers/taskRoute');
const connectDB = require('./configs/db_connection');
const { errorHandler, pathHandler } = require('./middlewares/errorHandler');

const app = express();
//connects to db
connectDB();

//binds app middlewares
app.use(express.json());
app.use("/api/task", taskRoute);
app.use("/api/user", userRoute);
app.use(errorHandler);
app.use(pathHandler);

app.listen(port, () => {
    console.log(`server started at port ${port}`);
});