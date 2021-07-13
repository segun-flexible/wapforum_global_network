const logger = require("../helpers/logger");

const errorMiddleWare = (err, req, res, next) => {

    if (process.env.NODE_ENV.trim() === "dev") {
        console.log(err)
    }
  
    logger.debug({
        status: err.statusCode || 500,
        message: err.message || "Server Error"
    })

    res.status(err.statusCode || 500).send({
        success: false,
        message: "Something Went Wrong" || "Server Error"
    })
}

module.exports = errorMiddleWare