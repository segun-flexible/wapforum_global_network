const db = require("../models/db");

//EDIT USER BY ID
exports.insertIntoWithdrawalHistory = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_withdrawal_history SET ?", obj, (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
};

//CHECK IF HAS PENDING WITHDRAWAL
exports.checkIfHasPendingWithdrawal = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_withdrawal_history WHERE w_user_id = ? AND w_status = 0", parseInt(userId), (err, data) => {
            if (err) reject(err)
            else {
                if (data.length) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            }
        })
    })
};



//EDIT WITHDRAWAL BY ID
exports.editWithdrawalById = (withdrawalId, obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_withdrawal_history SET ? WHERE w_id = ?",[obj, parseInt(withdrawalId)],(err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET WITHDRAWAL BY ID
exports.getWithdrawalById = (withdrawalId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_withdrawal_history WHERE w_id = ?",parseInt(withdrawalId),(err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}


//GET ALL WITHDRAWAL AMOUNT
exports.getAllWithdrawalAmount = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT SUM(w_amount) AS total FROM  f_withdrawal_history WHERE NOT w_status = 0",(err, data) => {
            if (err) reject(err)
            else resolve(data[0].total || 0)
        })
    })
};



//DELETE WITHDRAWAL BY ID
exports.deleteWithdrawalById = (withdrawalId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_withdrawal_history WHERE w_id = ?", parseInt(withdrawalId),(err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//END HERE

//GET ALL DEPOSIT HISTORY
exports.getWithdrawaltHistory = (trxId,status,limit,offset) => {
    return new Promise((resolve, reject) => {
        let query;

        if (trxId) {
            query = `SELECT * FROM f_withdrawal_history A JOIN f_users B ON A.w_user_id = B.uid LEFT JOIN f_bank C ON C.bank_user_id = B.uid WHERE A.w_trx_id = '${trxId}' AND A.w_status = ${parseInt(status)} LIMIT ${limit} OFFSET ${offset}`

        }
        else {
            query = `SELECT * FROM f_withdrawal_history A JOIN f_users B ON A.w_user_id = B.uid LEFT JOIN f_bank C ON C.bank_user_id = B.uid WHERE A.w_status = ${parseInt(status)}  LIMIT ${limit} OFFSET ${offset}`
        }
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}



//GET WITHDRAWAL FOR HOMEPAGE
exports.getWithdrawalForHome = (limit) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM f_withdrawal_history A JOIN f_users B ON A.h_user_id = B.uid ORDER BY A.h_id DESC LIMIT ${limit} OFFSET 0`,(err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET ALL WITHDRAWAL
exports.getWithdrawCount = (type) => {
    return new Promise((resolve, reject) => {
        let query;
        if (type === "pending") {
            query = `SELECT SUM(h_amount_recieved) as total FROM f_withdrawal_history WHERE h_status = 0`
        } else {
            query = `SELECT SUM(h_amount_recieved) as total FROM f_withdrawal_history WHERE h_status = 1`
        }
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data[0].total ? data[0].total : 0)
        })
    })
}


