const mysql = require("mysql");
const logger = require("../helpers/logger");
const db = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database: 'wapforum',
    charset: "utf8mb4"
});

db.getConnection((err,data) => {
    if (err) {
        logger.debug(err)
        return console.log(err)
    }
    console.log("DB CONNECTED")
    
    
})

module.exports = db