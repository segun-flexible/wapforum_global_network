const { getBonuses } = require("../helpers/bonus")
const { bonusInfo, insertIntoEarningHistory } = require("../helpers/history")
const { openToken } = require("../helpers/jwt")
const logger = require("../helpers/logger")
const { getUserById, editUserById } = require("../helpers/user")
const db = require("../models/db")



exports.isAuthUser = async(req, res, next) => {
    if (req.signedCookies[process.env.TOKEN_NAME]) {
        const token = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
        
        if (token.role && token.role === "admin") {
            return res.redirect("/admin/dashboard")
        } else {
            return res.redirect("/user/dashboard")
        }
        
    } else {
        next()
    }
    
}

exports.isUserLogin = async(req, res, next) => {
    if (req.signedCookies[process.env.TOKEN_NAME]) {
        next()
    } else {
        //Check If URL Contain The Word "ADMIN"
        if (req.originalUrl.includes("admin")) {
            return res.redirect("/admin/login")
        } else {
            return res.redirect("/login")
        }
        

    }
    
}


exports.isAdmin = async (req, res, next) => {

    const { id,role:theRole } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    if (theRole !== "admin") {
        
        return res.render("error/error", {
            title: "Not Allowed",
            text: "You are not allow to enter this page",
            button: {
                link: "/",
                text: "Back To Homepage"
            }
        });

        
    }

    
    db.query("SELECT role FROM f_admins WHERE uid = ? LIMIT 1", id, (err, role) => {
        if (err) logger.debug(err)
        else {
            let data = role[0];
            
            if (!data) {
                res.render("error/error", {
        title: "Not Allowed",
        text: "You are not allow to enter this page",
        button: {
            link: "/",
            text:"Back To Homepage"
        }
        
    })
            } else {
                next()
            }
        }
    })
    
}



exports.isRoleAllow = (role) => async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    const user = await getUserById(id);

    if (role instanceof Array) {
        const check = role.some(rl => rl.toLowerCase() === user.role.toLowerCase());
        if (check) {
            next()
        } else {
            res.render("error/error", {
        title: "Not Allowed",
        text: "You are not allow to enter this page",
        button: {
            link: "/",
            text:"Back To Homepage"
        }
        
    })
        }
    }else{
        if (user.role.toLowerCase() === role.toLowerCase()) {
       next() 
    } else {
        res.render("error/error", {
        title: "Not Allowed",
        text: "You are not allow to enter this page",
        button: {
            link: "/",
            text:"Back To Homepage"
        }
        
    })
    }
    }
    
}


//CHeck User Is Already Verify
exports.isUserVerified = async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    //Get User Info
    const { is_verify,can_daily_login,uid, earnings_balance } = await getUserById(id);
    
    if (!is_verify) {
        return res.render("auth/verify/verify", {
            title: "Unverified Account",
            description: "Unverified Account"
        })
    }

    if (can_daily_login) {
        //Get Bonus 
        const bonus = await getBonuses();

        //Credit User Daily Login Bonus
        //And Set can_daily_login to 0
        await editUserById(uid, {
            earnings_balance: earnings_balance + bonus.b_daily_login_bonus,
            can_daily_login: 0
        });

        //Insert To History
        await insertIntoEarningHistory(bonus.b_daily_login_bonus, {
            h_user_id: uid,
            h_amount: bonus.b_daily_login_bonus,
            h_text: bonusInfo.login.text
        });
    }
    //If Verified, Allow Him To His Destination
    next()
    
};


//DENY ADMIN FROM ENTERING USER
exports.denyAdmin = async (req, res, next) => {
    const token = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
  
    
    
    if (token && token.role === "admin") {
        return res.render("error/error", {
            title: "You Are Not Allowed To Enter Member Area",
            text: `Sorry Sir, You Are Not Allowed Here, Kindly Navigate Back!`
        })
    }

    //If He Is A User, Allow Him
    next()
    
};

//CHECK IF USER CAN EARN
exports.canEarn = async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
  
    //Get User Info
    const user = await getUserById(id);

    if (!user.can_earn) return res.json({ status: false, message: "You need to unlocked your account before you can earn" });


    //Assigned Earnings Balance To Req Obj For Next Controller
    req.user = user;
    
    //Allow User To Earn
    next()
    
};