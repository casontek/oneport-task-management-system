const express = require('express');
const router = express.Router();
const { createUserProfile, userLogin } = require('../controllers/userController');

//creates user
router.post("/register", createUserProfile);

//login user
router.post("/login", userLogin);


module.exports = router;