const validator = require("validator");
const { getAdminByUsername, getAdminByEmail } = require("../../../helpers/admin");
const asyncHandler = require("../../../helpers/asyncHandler");
const { signToken } = require("../../../helpers/jwt");
const { comparePassword } = require("../../../helpers/password");

exports.adminLoginGet = asyncHandler(async (req, res, next) => {
    res.render("auth/admin/login", {
        title: "Admin Login"
    })
})


//LOGIN (POST)
exports.adminLoginPost = asyncHandler(async (req, res, next) => {
  
    const isEmail = validator.isEmail(req.body.credentials);
    
    //USER VARIABLE
    let user;

    if (isEmail) {
       user = await getAdminByEmail(req.body.credentials)
    } else {
        user = await getAdminByUsername(req.body.credentials)
    };

    if (!user) {
        return res.json({status:false,message:"User not found"})
    };

    //Checking Password
    const isPasswordSame = await comparePassword(req.body.password, user.password);
    
    
    if (!isPasswordSame) {
        return res.json({status:false,message:"Incorrect Password"})
    }

    //All Info Successfully
    //Sign Him A Token And Respond
    const token = await signToken({ id: user.uid, role: "admin" });
    res.cookie(process.env.TOKEN_NAME, token, { signed: true, maxAge: 1000 * 60 * 60 * 24 * 1 });

    //Checking Where To Send Him To
    return res.json({status:true,message: `Welcome ${user.username}`,goto:"/admin/dashboard"})


})