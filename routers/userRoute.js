const express = require('express');
const router = express.Router();
const { createUserProfile, userLogin } = require('../controllers/userController');

/**
 * @api {post} /api/user/register Creates new user profile
 * @apiName PostUser
 * @apiGroup User
 * 
 * @apiBody {String} username Username for the profile
 * @apiBody {String} phone    Phone number of the user
 * @apiBody {String} [email]  Email address of the user
 * @apiBody {String} password Login password
 * 
 * @apiSuccess {Number} code response code
 * @apiSuccess {String} message response message
 * @apiSuccess {Object} data
 * @apiSuccess {String} data.username Profile username
 * @apiSuccess {String} data.email Email address of the user
 * @apiSuccess {String} data.phone Phone number of the user
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 Ok
 *      {
 *          "code": 200,
 *          "message": "success",
 *          "data": {
 *              "username": "Chika",
 *              "email": "chika@domain.com",
 *              "phone": "+2345049490000"
 *          }
 *      }
 * 
 * @apiError {Number} code Error code
 * @apiError {String} message Error message
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 409 Duplicate key
 *      {
 *          "code": 409,
 *          "message": "Username chika, already exist."
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
router.post("/register", createUserProfile);

/**
 * @api {post} /api/user/login User login for access token
 * @apiName LoginUser
 * @apiGroup User
 * 
 * @apiBody {String} username
 * @apiBody {String} password
 * 
 * @apiSuccess {Number} code 200
 * @apiSuccess {String} message "success"
 * @apiSuccess {Object} data 
 * @apiSuccess {Object} data.user 
 * @apiSuccess {String} data.user.username
 * @apiSuccess {String} data.user.phone
 * @apiSuccess {String} data.user.email
 * @apiSuccess {String} data.token
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 Ok
 *      {
 *          "code": 200,
 *          "message": "success",
 *          "data": {
 *              "user": {
 *                  "username": "Chika",
 *                  "email": "chika@domain.com",
 *                  "phone": "+2345049490000"
 *              },
 *              "token": "dhadjdokchEJID20U3484R8TFHJJ2"
 *          }
 *      }
 *      
 * @apiError {Number} code Error code
 * @apiError {String} message Error message
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 401 Unauthorized request
 *      {
 *          "code": 401,
 *          "message": "Username or password not correct."
 *      }
 * 
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 Not Found
 *      {
 *          "code": 404,
 *          "message": "User not found."
 *      }
 * 
 */
router.post("/login", userLogin);


module.exports = router;