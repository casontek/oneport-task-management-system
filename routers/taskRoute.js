const express = require('express');
const router = express.Router();
const Task = require('../models/task');

//creates task
router.route("/").post(async (req, res) => {
    const taskObject = req.body;
    //add new task to database
    let task = await Task.create(taskObject);
    
    res.json({
        code: 200,
        message: 'task created.',
        data: task
    });
});

//updates task
router.route("/:taskId").put(async (req, res) => {
    
});

//get a particular task
router.route("/:taskId").get(async (req, res) => {
    
});

//delete a task
router.route("/:taskId").delete(async (req, res) => {
    
});



module.exports = router;