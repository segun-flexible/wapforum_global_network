const db = require("../models/db");

//CREATE USER
exports.createNewUser = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_users SET ?", obj, (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};


exports.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE uid = ? LIMIT 1", parseInt(userId), (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
};

//GET USER BY USERNAME
exports.getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE username = ? LIMIT 1",username, (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
}

//GET USER BY EMAIL
exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE email = ? LIMIT 1",email, (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
}


//EDIT USER BY ID
exports.editUserById = (userId,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_users SET ? WHERE uid = ?", [obj, parseInt(userId)], (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};

//DELETE USER BY ID
exports.deleteUserById = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_users WHERE uid = ?", parseInt(userId), (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};




//GET USER LIST
exports.getUsersList = (search,limit,offset) => {
    return new Promise((resolve, reject) => {
        let query;
        if (search) {
            query = `SELECT * FROM f_users A LEFT JOIN f_investment_records B ON A.uid = B.r_user_id WHERE (A.fullname LIKE '%${search}%' OR username LIKE '%${search}%') LIMIT ${limit} OFFSET ${offset}`
        } else {
            query = `SELECT * FROM f_users A LEFT JOIN f_investment_records B ON A.uid = B.r_user_id LIMIT ${limit} OFFSET ${offset}`
        }
        db.query(query, (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
}



//<!------------FOR ADMIN---------------->

//GET ALL USERS
exports.adminGetAllMember = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) AS total FROM f_users", (err, user) => {
            if (err) reject(err)
            else resolve(user[0].total || 0)
        })
    })
};

//GET USER BY EMAIL
exports.getTopReferral = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE referral_total_count > 0 ORDER BY referral_total_count DESC LIMIT 10", (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
}
