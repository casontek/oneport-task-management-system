const express = require('express');
const router = express.Router();
const authenticationHandler = require('../middlewares/authHandler');
const { registerNewCallback, deleteCallbackUrl } = require('../controllers/callbackController');


router.use(authenticationHandler);

/**
 * @api {get} /api/webhook?callback Creates webhook callback
 * @apiName NewsCallbackUrl
 * @apiGroup Webhook
 * 
 * @apiHeader {String} Authorization Bearer Token
 * 
 * @apiQuery {String} callback Callback Url of the user
 * 
 * @apiSuccess {Number} code response code
 * @apiSuccess {String} message response message
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 Ok
 *      {
 *          "code": 200,
 *          "message": "success"
 *      }
 * 
 * @apiError {Number} code Error code
 * @apiError {String} message Error message
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 409 Duplicate key
 *      {
 *          "code": 409,
 *          "message": "Callback url already exist."
 *      }
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 500 Internal server error
 *      {
 *          "code": 409,
 *          "message": "Internal server error."
 *      }
 * 
 */
router.get("/", registerNewCallback);

/**
 * @api {delete} /api/webhook Deletes webhook callback
 * @apiName ClearCallbackUrl
 * @apiGroup Webhook
 * 
 * @apiHeader {String} Authorization Bearer Token
 * 
 * @apiSuccess {Number} code response code
 * @apiSuccess {String} message response message
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 Ok
 *      {
 *          "code": 200,
 *          "message": "success"
 *      }
 * 
 * @apiError {Number} code Error code
 * @apiError {String} message Error message
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "code": 404,
 *          "message": "No existing callback url."
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
router.delete("/", deleteCallbackUrl);


module.exports = router;