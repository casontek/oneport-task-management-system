const express = require('express');
const router = express.Router();
const authenticationHandler = require('../middlewares/authHandler');
const Subscription = require('../models/subscription');
const asyncHandler = require('express-async-handler');

//authenticates the endpoints
router.use(authenticationHandler);

//add new message webhook, callback url
router.get("/", asyncHandler(
    async (req, res) => {
        const callbackUrl = req.query.callback;
        const username = req.username;
    
        await Subscription.create({
            'username': username,
            'callback': callbackUrl
        });
    
        res.json({
            code: 200,
            message: 'callback url added.'
        });
    }
));

//delete an existing callback url for the user
router.delete("/", async (req, res, next) => {
    const username = req.username;
    try {
        let result = await Subscription.findOneAndDelete({'username': username});

        if(!result) {
            const error = new Error("No existing callback url.");
            error.code = 400;

            throw error;
        }

        res.json({
            code: 200,
            message: 'callback url deleted.'
        })
    } 
    catch (error) {
        next(error);
    }
});


module.exports = router;