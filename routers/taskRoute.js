const express = require('express');
const router = express.Router();
const authenticationHandler = require('../middlewares/authHandler');
const { createTask, updateTask, fetchTask, deleteTask } = require('../controllers/taskController');

//adds authentication protection to task endpoints
router.use(authenticationHandler);

/**
 * @api {post} /api/task Creates new Task
 * @apiName NewTask
 * @apiGroup Task
 * 
 * @apiHeader {String} Authorization Bearer Token
 * 
 * @apiBody {String} title caption of the task
 * @apiBody {String} [description]    task detail description
 * @apiBody {String} [tags]  task tags
 * @apiBody {String} [priority] task level of importance
 * 
 * @apiSuccess {Number} code response code
 * @apiSuccess {String} message response message
 * @apiSuccess {Object} data
 * @apiSuccess {String} data.taskId
 * @apiSuccess {String} data.title
 * @apiSuccess {String} data.description
 * @apiSuccess {String} data.tags
 * @apiSuccess {String} data.priority
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 Ok
 *      {
 *          "code": 200,
 *          "message": "success",
 *          "data": {
 *              "title": "TGIF Reminder",
 *              "description": "This coming friday is the TGIF outing for our team.",
 *              "tags": "TGIF, Entertainment",
 *              "priority": "medium",
 *              "taskId": "58475757933757379392"
 *          }
 *      }
 * 
 * @apiError {Number} code Error code
 * @apiError {String} message Error message
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 401 Unauthorize request
 *      {
 *          "code": 401,
 *          "message": "Unauthorize request!"
 *      }
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 500 Internal server error
 *      {
 *          "code": 500,
 *          "message": "Internal server error."
 *      }
 * 
 */
router.route("/").post(createTask);

/**
 * @api {put} /api/task/:taskId Updates existing task
 * @apiName UpdateTask
 * @apiGroup Task
 * 
 * @apiHeader {String} Authorization Bearer Token
 * 
 * @apiParam {String} taskId id of the task to update
 * 
 * @apiSuccess {Number} code response code
 * @apiSuccess {String} message response message
 * @apiSuccess {Object} data
 * @apiSuccess {String} data.taskId
 * @apiSuccess {String} data.title
 * @apiSuccess {String} data.description
 * @apiSuccess {String} data.tags
 * @apiSuccess {String} data.priority
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 Ok
 *      {
 *          "code": 200,
 *          "message": "success",
 *          "data": {
 *              "title": "TGIF Reminder",
 *              "description": "The planned TGIF this friday, has been postponed.",
 *              "tags": "TGIF, Entertainment",
 *              "priority": "low"
 *          }
 *      }
 * 
 * @apiError {Number} code Error code
 * @apiError {String} message Error message
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 401 Unauthorize request
 *      {
 *          "code": 401,
 *          "message": "Unauthorize request!"
 *      }
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "code": 404,
 *          "message": "Requested task not found."
 *      }
 * 
 */
router.route("/:taskId").put(updateTask);

/**
 * @api {get} /api/task/:taskId fetch task
 * @apiName FatchTask
 * @apiGroup Task
 * 
 * @apiHeader {String} Authorization Bearer Token
 * 
 * @apiParam {String} taskId id of the task to fetch
 * 
 * @apiSuccess {Number} code response code
 * @apiSuccess {String} message response message
 * @apiSuccess {Object} data
 * @apiSuccess {String} data.taskId
 * @apiSuccess {String} data.title
 * @apiSuccess {String} data.description
 * @apiSuccess {String} data.tags
 * @apiSuccess {String} data.priority
 * 
 * 
 * @apiError {Number} code Error code
 * @apiError {String} message Error message
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 401 Unauthorize request
 *      {
 *          "code": 401,
 *          "message": "Unauthorize request!"
 *      }
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "code": 404,
 *          "message": "Requested task not found."
 *      }
 * 
 */
router.route("/:taskId").get(fetchTask);

/**
 * @api {delete} /api/task/:taskId Delete task by id
 * @apiName DeleteTask
 * @apiGroup Task
 * 
 * @apiHeader {String} Authorization Bearer Token
 * 
 * @apiParam {String} taskId id of the task to delete
 * 
 * @apiSuccess {Number} code response code
 * @apiSuccess {String} message response message
 * @apiSuccess {Object} data
 * @apiSuccess {String} data.taskId
 * @apiSuccess {String} data.title
 * @apiSuccess {String} data.description
 * @apiSuccess {String} data.tags
 * @apiSuccess {String} data.priority
 * 
 * 
 * @apiError {Number} code Error code
 * @apiError {String} message Error message
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 401 Unauthorize request
 *      {
 *          "code": 401,
 *          "message": "Unauthorize request!"
 *      }
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "code": 404,
 *          "message": "Requested task not found."
 *      }
 * 
 */
router.route("/:taskId").delete(deleteTask);



module.exports = router;