const errorObject = require('../utils/error');
const logger = require('../utils/logger');
const Subscription = require('../models/subscription');
const asyncHandler = require('express-async-handler');


//@desc create new callback url
//@route GET /api/webhook?callback
//@access private
const registerNewCallback = asyncHandler(
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
);

//@desc create new callback url
//@route DELETE /api/webhook
//@access private
const deleteCallbackUrl = async (req, res, next) => {
    const username = req.username;
    try {
        let result = await Subscription.findOneAndDelete({'username': username});

        if(!result) {
            throw errorObject(400, "No existing callback url.");
        }

        res.json({
            code: 200,
            message: 'callback url deleted.'
        })
    } 
    catch (error) {
        logger.error(error);

        next(error);
    }
};


module.exports = {
    registerNewCallback,
    deleteCallbackUrl
};