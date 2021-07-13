const db = require("../models/db");

//GET COUPON BY KEY
exports.getCouponByKey = (key) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_coupons WHERE coupon_code = ? LIMIT 1",key, (err, user) => {
            if (err) reject(err)
            else resolve(user[0])
        })
    })
}

//UPDATE COUPON BY ID
exports.updateCouponByKey = (couponId,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_coupons SET ? WHERE coupon_id = ?",[obj,couponId], (err, user) => {
            if (err) reject(err)
            else resolve(user)
        })
    })
}