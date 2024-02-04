const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

//creates user
router.post("/register", asyncHandler(async (req, res) => {
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

}));

//login user
router.post("/login", async (req, res, next) => {
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
        next(error);
    }
});


const errorObject = (code, message) => {
    const error = new Error(message);
    error.code = code;

    return error;
}

module.exports = router;