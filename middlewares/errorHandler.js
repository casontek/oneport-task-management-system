
const errorHandler = (err, req, res, next) => {
    const errorMessage = err.message;
    const statusCode = typeof err.code !== 'undefined' ? err.code :
        err.name === "ValidationError" ? 400 : 500;

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

module.exports = {
    errorHandler,
    pathHandler
}