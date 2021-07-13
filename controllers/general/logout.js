const asyncHandler = require("../../helpers/asyncHandler");

exports.logoutGet = asyncHandler(async (req, res, next) => {
    res.clearCookie(process.env.TOKEN_NAME);
    if (req.query.route === "admin") {
        return res.redirect("/admin/login")
    } else {
        return res.redirect("/login")
    }
    
})

