const db = require("../models/db");

//GET ADMIN BY ID
exports.getAdminById = (adminId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_admins WHERE uid = ? LIMIT 1", parseInt(adminId), (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
};

//GET ADMIN BY USERNAME
exports.getAdminByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_admins WHERE username = ? LIMIT 1",username, (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
}


//GET ADMIN BY EMAIL
exports.getAdminByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_admins WHERE email = ? LIMIT 1",email, (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
}

//UPDATE ADMIN BY ID
exports.updateAdminById = (id,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_admins SET ? WHERE uid = ?",[obj,parseInt(id)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}