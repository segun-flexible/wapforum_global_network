const db = require("../models/db");

exports.getWebSettings = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_website_settings", (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

exports.saveSettings = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_website_settings SET ?",obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}