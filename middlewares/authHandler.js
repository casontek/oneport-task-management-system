const jwt = require('jsonwebtoken');

const authenticationHandler = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(" ")[1];
        console.log(`Token: ${token}`);
        if(!token) {
            throw errorObject(401, 'UnAuthorized request.');
        }
        //verify authorization token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        //adds user detail to request 
        req.username = decoded.username;
        req.id = decoded.id;

        console.log(`Username: ${decoded.username}, id: ${decoded.id}`);

        next();
    } 
    catch (error) {
        next(error);
    }
};

const errorObject = (code, message) => {
    const error = new Error(message);
    error.code = code;

    return error;
}

module.exports = authenticationHandler;