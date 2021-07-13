const asyncHandler = require("../helpers/asyncHandler");
const { openToken } = require("../helpers/jwt");
const { getWebSettings } = require("../helpers/settings");
const db = require("../models/db")


exports.userDetails = asyncHandler(async (req, res, next) => {
    
    if (req.signedCookies[process.env.TOKEN_NAME]) {
        const token = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
        
            if (token.role && token.role === "admin") {
            
            db.query("SELECT * FROM f_admins WHERE uid = ? LIMIT 1", parseInt(token.id), async (err, user) => {
            if (err) {
                return next(err)
            } else {
                let u = user[0];
                
                if (u.role === 1) {
                    u.role = "Admin"
                }
                
                if (!u) {
                    res.clearCookie(process.env.TOKEN_NAME);
                return res.redirect("/admin/login")
                }

                res.locals.user = u
                next()
            }
        })
        } else {
            
           db.query("SELECT * FROM f_users WHERE uid = ? LIMIT 1", parseInt(token.id), async (err, user) => {
            if (err) {
                return next(err)
            } else {
                let u = user[0];

                if (!u) {
                    res.clearCookie(process.env.TOKEN_NAME);
                return res.redirect("/login")
                }

                
                const { website_per_coin } = await getWebSettings();
                const balance = {
                    activities: (u.earnings_balance * website_per_coin).toLocaleString(),
                    total: ((u.earnings_balance * website_per_coin) + u.referral_balance).toLocaleString()
                };

                res.locals.balance = balance
                

                res.locals.user = u
                next()
            }
        }) 
        }
        
        } else {
            res.locals.user = null
            next()
    }
    
})
