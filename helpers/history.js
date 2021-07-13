const db = require("../models/db");

//INSERT INTO EARNING HISTORY
exports.insertIntoEarningHistory = (amount,obj) => {
    return new Promise((resolve, reject) => {

        //Check If The Earning Amount Is More Than 0
        if (amount > 0) {
            db.query("INSERT INTO f_earning_history SET ?", obj, (err, data) => {
            if (err) reject(err)
            else return resolve(data)
            })
            
        }

        //Else, Still Resolve
        return resolve()
        
    })
}



//GET USER REFERRAL HISTORY
exports.getUserReferralHistory = (status,userId,limit,offset,order) => {
    return new Promise((resolve, reject) => {
        let query;

        if (status) {
            query = `SELECT * FROM f_referrals A JOIN f_users B ON A.r2_id = B.uid WHERE A.r1_id = ${parseInt(userId)} AND status = ${parseInt(status)} ORDER BY r_id ${order ? order : 'DESC' } LIMIT ${limit} OFFSET ${offset}`;
        } else {
            query = `SELECT * FROM f_referrals A JOIN f_users B ON A.r2_id = B.uid WHERE A.r1_id = ${parseInt(userId)} ORDER BY r_id ${order ? order : 'DESC' } LIMIT ${limit} OFFSET ${offset}`;
        }
        db.query(query, (err, data) => {
            if (err) reject(err)
            else return resolve(data)
        })
        
        
    })
}

//GET USER EARNINGS HISTORY
exports.getUserEarningHistory = (userId,limit,offset) => {
    return new Promise((resolve, reject) => {
        
        db.query(`SELECT * FROM f_earning_history A WHERE A.h_user_id = ${parseInt(userId)} ORDER BY h_id DESC LIMIT ${limit} OFFSET ${offset}`, (err, data) => {
            if (err) reject(err)
            else return resolve(data)
        })
        
        
    })
}


//GET ALL DEPOSIT HISTORY
exports.getUserWithdrawaltHistory = (userId,trxId,status,limit,offset) => {
    return new Promise((resolve, reject) => {
        let query;

        if (trxId) {
            query = `SELECT * FROM f_withdrawal_history A JOIN f_users B ON A.w_user_id = B.uid WHERE A.w_trx_id = '${trxId}' AND A.w_user_id = ${parseInt(userId)} LIMIT ${limit} OFFSET ${offset}`

        } else if (status) {
            query = `SELECT * FROM f_withdrawal_history A JOIN f_users B ON A.w_user_id = B.uid WHERE A.w_status = ${parseInt(status)} AND A.w_user_id = ${parseInt(userId)} LIMIT ${limit} OFFSET ${offset}`
        }
        else {
            query = `SELECT * FROM f_withdrawal_history A JOIN f_users B ON A.w_user_id = B.uid WHERE A.w_user_id = ${parseInt(userId)} LIMIT ${limit} OFFSET ${offset}`
        }
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}



exports.bonusInfo = {
    login: {
        text: "You've earn reward for daily login"
    },
    register: {
        text: "You've earn welcome bonus reward"
    },
    watch: {
        text: "You've earn reward for watching video"
    },
    referral: {
        text: "You've earn reward for referring a user"
    },
    click: {
        text: "You've earn reward for clicking an ads"
    },
}