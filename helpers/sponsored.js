const db = require("../models/db");

//GET SPONSORED POST
exports.getTodaySponsoredPost = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_sponsored_link ORDER BY s_id DESC LIMIT 1", (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//CHECK IF EARN ON SPONSORED POST
exports.checkIfEarnSponsored = (sponsoredID,userID) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_sponsored_link_track WHERE t_sponsored_id = ? AND t_user_id = ?", [parseInt(sponsoredID),userID], (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//ADD TO SPONSORED POST TRACK
exports.addToSponsoredPostTrack = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_sponsored_link_track SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}