const db = require("../models/db");

//GET USER TESTIMONY
exports.getUserTestimony = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM f_testimony A JOIN f_users B ON A.t_user_id = B.uid WHERE A.t_user_id = ?`,parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
};

//GET TESTIMONOIES
exports.getTestimonies = (limit) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM f_testimony A JOIN f_users B ON A.t_user_id = B.uid WHERE A.t_status = 1 LIMIT ${limit} OFFSET 0`, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//GET TESTIMONOIES FOR ADMIN
exports.getTestimoniesForAdmin = (status,limit,offset) => {console.log(status, limit, offset)
    return new Promise((resolve, reject) => {
        let query;

        if (status) {
            query = `SELECT * FROM f_testimony A JOIN f_users B ON A.t_user_id = B.uid WHERE A.t_status = ${parseInt(status)} LIMIT ${limit} OFFSET ${offset}`
        } else {
            query = `SELECT * FROM f_testimony A JOIN f_users B ON A.t_user_id = B.uid WHERE A.t_status = 0 LIMIT ${limit} OFFSET ${offset}`
        }
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//CREATE USER TESTIMONY
exports.createUserTestimony = (obj) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO f_testimony SET ?`,obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//EDIT USER TESTIMONY
exports.editUserTestimony = (tId,obj) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE f_testimony SET ? WHERE t_id = ?`,[obj,parseInt(tId)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};


//DELETE USER TESTIMONY
exports.deleteUserTestimony = (tId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM f_testimony WHERE t_id = ?`,parseInt(tId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};


