const bcrypt = require("bcryptjs");
const db = require("../models/db");
exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        const newHashPassword = bcrypt.hash(password, 9);
        resolve(newHashPassword)
    })
}


exports.comparePassword = (password, hashPassword) => {
    return new Promise((resolve, reject) => {
        const same = bcrypt.compareSync(password, hashPassword);
        resolve(same)
    })
}


//SAVE RESET PASSWORD TOKEN TO DB
exports.saveResetPasswordIntoDB = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_password_reset_token SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//DELETE USER RESET PASSWORD TOKENs TO DB
exports.deleteResetPasswordByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_password_reset_token WHERE token_user = ?", parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//DELETE ALL RESET PASSWORD TOKENs TO DB
exports.deleteAllResetPassword = () => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_password_reset_token", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//CHECK IF USER HAS A TOKEN
exports.checkPasswordTokenByUserId = (userId,token) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_password_reset_token WHERE token_user = ? AND token_code = ?", [parseInt(userId), token], (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}