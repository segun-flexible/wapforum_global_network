const jwt = require("jsonwebtoken");

exports.signToken = (obj) => {
    return new Promise((resolve, reject) => {
        try {
        const tk = jwt.sign(obj, process.env.TOKEN_SECRET);
        resolve(tk)
        } catch (error) {
            reject(error)
        }
    })
}

exports.signResetPasswordToken = (obj,time = '1d') => {
    return new Promise((resolve, reject) => {
        try {
            
        const tk = jwt.sign(obj, process.env.TOKEN_SECRET,{expiresIn:time});
        resolve(tk)
        } catch (error) {
            reject(error)
        }
    })
}


exports.openToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const tk = jwt.verify(token, process.env.TOKEN_SECRET);
        resolve(tk)
        } catch (error) {
            reject(error)
        }
    })
}

exports.signObjToken = (obj) => {
    return new Promise((resolve, reject) => {
        try {
        const tk = jwt.sign(obj, process.env.TOKEN_SECRET);
        resolve(tk)
        } catch (error) {
            reject(error)
        }
    })
}