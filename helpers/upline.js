const db = require("../models/db");
const { getWebSettings } = require("./settings");

//CREATE NEW UPLINE
exports.createNewUpline = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_referrals SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//GET THE REFERRER OF THIS USERID
exports.getReferrerOfThisUserById = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT r1_id FROM f_referrals WHERE r2_id = ?", parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
};

//GET ALL REFERREES OF THIS USERID
exports.getReferreesOfThisUserById = (userId, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_referrals A JOIN f_users B ON A.r2_id = B.uid AND A.r1_id = ? LIMIT ? OFFSET ?", [parseInt(userId), limit, offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//CHECK HOW MANY REFERRAL
exports.checkUserReferralLimit = async (user_id) => {
    return new Promise( async (resolve, reject) => {
        const { website_referral_limit } = await getWebSettings();

        db.query("SELECT COUNT(*) as total FROM f_referrals WHERE r1_id = ?", parseInt(user_id), (err, data) => {
            if (err) reject(err)
            else {
                if(data[0].total >= website_referral_limit) resolve(true)
                else resolve(false)
            }
        })
    })
};