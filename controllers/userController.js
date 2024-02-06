const bcrypt = require('bcrypt');
const errorObject = require('../utils/error');
const User = require('../models/user');
const logger = require('../utils/logger');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

//@desc Creates User profile
//@route POST /api/user/register
//@access private
const createUserProfile = asyncHandler(async (req, res) => {
    const {username, password, email, phone} = req.body;
    //encrypt password before saving
    let hashedPassword = await bcrypt.hash(password, 8);

    let userData = await User.create({
        'username': username,
        'password': hashedPassword,
        'phone': phone,
        'email': email
    });

    res.json({
        code: 200,
        message: 'User successfully created.',
        data: {
            username: userData.username,
            phone: userData.phone,
            email: userData.email
        }
    });

});

//@desc login User into the system
//@route POST /api/user/login
//@access private
const userLogin = async (req, res, next) => {
    const {username, password} = req.body;
    try {
        //gets user by username
        let user = await User.findOne({'username': username});
        //checks if user exist
        if(!user) {
            throw errorObject(400, 'User not found.');
        }
        //validates user password
        let validLogin = await bcrypt.compare(password, user.password);
        if(!validLogin) {
            throw errorObject(400, 'Username or password not correct.')
        }

        //process user login access token
        let token = jwt.sign({"username": username, "id": user.userId }, process.env.SECRET_KEY, {
            expiresIn: '10h',
        });
        
        res.json({
            code: 200,
            message: 'success',
            data: {
                user: {
                    username: user.username,
                    phone: user.phone,
                    email: user.email
                },
                token: token
            }
        })
    } 
    catch (error) {
        logger.error(error);
        next(error);
    }
};


module.exports = {
    createUserProfile,
    userLogin
}