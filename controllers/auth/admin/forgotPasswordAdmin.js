const asyncHandler = require("../../../helpers/asyncHandler");
const validator = require("validator");
const { getAdminByEmail, getAdminByUsername, updateAdminById } = require("../../../helpers/admin");
const { signResetPasswordToken, openToken } = require("../../../helpers/jwt");
const { hashPassword } = require("../../../helpers/password");
const { adminResetPasswordMailer } = require("../../../email/mails/resetPasswordMail");



//FORGOT PASSWORD (GET)
exports.adminForgotPasswordGet = asyncHandler(async (req, res, next) => {
    
    return res.render("auth/admin/forgot", {
        title: "Admin Reset Password"
    });
    
})


//FORGOT PASSWORD (POST)
exports.adminForgotPasswordPost = asyncHandler(async (req, res, next) => {
    
    const isEmail = validator.isEmail(req.body.credentials);
    
    //USER VARIABLE
    let user;

    if (isEmail) {
       user = await getAdminByEmail(req.body.credentials)
    } else {
        user = await getAdminByUsername(req.body.credentials)
    };

    if (!user) {
        return res.json({status:false,message:"Admin not found"})
    };

    const token = await signResetPasswordToken({ id: user.uid},"10m");

    user.token = token;
    user.date = new Date().toDateString() + " " + new Date().toTimeString();

    res.json({ status: true, message: `E-mail has been sent to mail successfully`});

    //Send Mail
    adminResetPasswordMailer(user);
})

//RESET PASSWORD (GET)
exports.adminResetPasswordGet = asyncHandler(async (req, res, next) => {
    
    try {
        
        const token = await openToken(req.query.token);
        
        return res.render("auth/admin/changePassword", {
            title: "Change Your Password",
            token
        })
        
    } catch (error) {
        return res.render("error/error", {
            title: "Something Went Wrong",
            text:error.message
        })
    }
})

//RESET PASSWORD (POST)
exports.adminResetPasswordPost = asyncHandler(async (req, res, next) => {
    
    try {
    
        const token = await openToken(req.query.token);
        
        await updateAdminById(token.id, {
            password: await hashPassword(req.body.password)
        });

        return res.json({status:true,message:"Password Reset Successfully",goto:"/admin/login"})
        
    } catch (error) {
        return res.json({status:false,message:error.message})
    }
})