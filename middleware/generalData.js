const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../helpers/logger");
const db = require("../models/db");

exports.generalData = asyncHandler(async(req, res, next) => {
    
    db.query("SELECT * FROM f_website_settings", async (err, datas) => {
        if (err) {
            logger.debug(err)
        } else {
            let data = datas[0];

            res.locals.shortUrl = req.originalUrl.split("?")[0];
            res.locals.longUrl = req.protocol + "://" + req.get('host') + req.originalUrl
            res.locals.homeUrl = req.protocol + "://" + req.get('host');

            //console.log("call")
        
            res.locals.websiteDetails = data;
            next()
        }
    })
    
})