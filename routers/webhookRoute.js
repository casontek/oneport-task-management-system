const express = require('express');
const router = express.Router();
const authenticationHandler = require('../middlewares/authHandler');
const { registerNewCallback, deleteCallbackUrl } = require('../controllers/callbackController');

//authenticates the endpoints
router.use(authenticationHandler);

//add new message webhook, callback url
router.get("/", registerNewCallback);

//delete an existing callback url for the user
router.delete("/", deleteCallbackUrl);


module.exports = router;