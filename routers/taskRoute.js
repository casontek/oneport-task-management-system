const express = require('express');
const router = express.Router();
const authenticationHandler = require('../middlewares/authHandler');
const { createTask, updateTask, fetchTask, deleteTask } = require('../controllers/taskController');

//adds authentication protection to task endpoints
router.use(authenticationHandler);

//creates task
router.route("/").post(createTask);

//updates task
router.route("/:taskId").put(updateTask);

//get a particular task
router.route("/:taskId").get(fetchTask);

//delete a task
router.route("/:taskId").delete(deleteTask);



module.exports = router;