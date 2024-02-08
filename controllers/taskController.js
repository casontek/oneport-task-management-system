const Task = require('../models/task');
const errorObject = require('../utils/error');
const asyncHandler = require('express-async-handler');
const rabbitMQProducer = require('../utils/rabbitMQProducer');

//add new task
const createTask = asyncHandler(
    async (req, res) => {
        const taskObject = req.body;
        //add new task to database
        let task = await Task.create(taskObject);

        let taskMessage = {
            'title': task.title,
            'id': task.taskId,
            'message': 'task created.',
            'username': req.username
        }

        if (process.env.NODE_ENV != 'test') {
            //produce message
            publishMessage(taskMessage);
        }

        res.json({
            code: 200,
            message: 'task created.',
            data: task
        });
    }
);

//updates an existing task
const updateTask = asyncHandler(
    async (req, res) => {
        let taskId = req.params.taskId;
        let task = req.body;
        //updates the task
        let updatedTask = await Task.findByIdAndUpdate(
            taskId,
            task,
            { "new": true }
        );

        let taskMessage = {
            'title': task.title,
            'id': task.taskId,
            'username': req.username,
            'message': 'task updated.'
        }
        //produce message
        publishMessage(taskMessage);

        res.json({
            code: 200,
            message: 'task updated.',
            data: updatedTask
        })
    }
);

//fetch task by id
const fetchTask = async (req, res, next) => {
    try {
        let taskId = req.params.taskId;
        //gets task by id
        let task = await Task.findById(taskId);

        if (task) {
            res.json({
                code: 200,
                message: 'success',
                data: task
            });
        }
        else {
            throw errorObject(402, `Task with id: ${taskId}, does not exist.`)
        }
    }
    catch (error) {
        next(error);
    }
};

//delete particular Task by taskId
const deleteTask = async (req, res, next) => {
    try {
        let taskId = req.params.taskId;
        let result = await Task.findByIdAndDelete(taskId);

        let taskMessage = {
            'title': result.title,
            'id': result.taskId,
            'username': req.username,
            'message': 'task deleted.'
        }
        //produce message
        publishMessage(taskMessage);

        if (result) {
            res.json({
                code: 200,
                message: `Task with id: ${taskId}, deleted.`
            });
        }
        else {
            throw errorObject(402, `Task with id: ${taskId}, does not exist.`);
        }
    }
    catch (error) {
        next(error);
    }
};

const publishMessage = (taskMessage) => {
    rabbitMQProducer(
        taskMessage,
        "task_exchange",
        "task_queue"
    );
}

module.exports = {
    createTask,
    updateTask,
    fetchTask,
    deleteTask
};