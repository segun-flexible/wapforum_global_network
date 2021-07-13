const db = require("../models/db");

//ADMIN GET NOTICE
exports.getNotice = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM f_notice LIMIT 1`, (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
};


//ADMIN CREATE NOTICE
exports.createNewNotice = (obj) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO f_notice SET ?`,obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//ADMIN EDIT NOTICE
exports.editNoticeById = (obj) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE f_notice SET ?`,obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};


