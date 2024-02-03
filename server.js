const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 7000
const taskRoute = require('./routers/taskRoute')
const connectDB = require('./configs/db_connection');

const app = express();
//connects to db
connectDB();

//binds app middlewares
app.use(express.json());
app.use("/api/task", taskRoute);
app.get("/api/v", (req, res) => {
    res.status(200).send("Welcome to task Api.");
})


app.listen(port, () => {
    console.log(`server started at port ${port}`);
});