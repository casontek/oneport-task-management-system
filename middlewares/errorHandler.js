
const errorHandler = (err, req, res, next) => {
    let errorMessage = err.message;
    let statusCode = typeof err.code !== 'undefined' ? err.code :
    err.name === "ValidationError" ? 400 : 500;

    if(errorMessage === "jwt expired") {
        errorMessage = "Authentication token expired. ";
        statusCode = 401;
    }
    else if(errorMessage === "invalid signature") {
        errorMessage = "Authentication failed. invalid credential!";
        statusCode = 401;
    }
    else if(err.name === "TypeError") {
        errorMessage = "Unauthorize request!";
        statusCode = 401;
    }
    else {
        if (err.message && err.message.includes('duplicate key error')) {
            statusCode = 409;
            let filteredMessage = errorMessage.split("key: ")[1].replace("{","")
                .replace("}","").replaceAll("\"","");
            let key = filteredMessage.split(":")[0].trim();
            let value = filteredMessage.split(":")[1].trim();
            if(key === "phone"){
                key = "Phone number";
            }
            else if(key == "email") {
                key = "Email address";
            }
            else {
                key = capitalizeFirstLetter(key);
            }
    
            errorMessage = `${key} ${value} already exist`;
        }
    }

    res.json({
        code: statusCode,
        message: errorMessage
    });
}
const pathHandler = (req, res, next) => {
    res.json({
        code: 404,
        message: `Path ${req.path}, not found.`
    });
    next();
}

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
    errorHandler,
    pathHandler
}