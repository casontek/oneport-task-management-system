const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const asyncHandler = require('express-async-handler');
const authenticationHandler = require('../middlewares/authHandler');
const rabbitMQProducer = require('../utils/rabbitMQProducer');

//adds authentication protection to task endpoints
router.use(authenticationHandler);

//creates task
router.route("/").post(asyncHandler(
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

        //produce message
        publishMessage(taskMessage);

        res.json({
            code: 200,
            message: 'task created.',
            data: task
        });
    }
));

//updates task
router.route("/:taskId").put(asyncHandler(
    async (req, res) => {
        let taskId = req.params.taskId;
        let task = req.body;
        //updates the task
        let updatedTask = await  Task.findByIdAndUpdate(
            taskId,
            task,
            {"new": true}
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
));

//get a particular task
router.route("/:taskId").get(async (req, res, next) => {
    console.log('tring to fetch task by id.');
    try {
        let taskId = req.params.taskId;
        //gets task by id
        let task = await  Task.findById(taskId);

        if(task) {
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
});

//delete a task
router.route("/:taskId").delete(async (req, res, next) => {
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

        if(result) {
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
});

const errorObject = (code, message) => {
    const error = new Error(message);
    error.code = code;

    return error;
}

const publishMessage = (taskMessage) => {
    rabbitMQProducer(
        taskMessage, 
        "task_exchange", 
        "task_queue"
    );
}

module.exports = router;