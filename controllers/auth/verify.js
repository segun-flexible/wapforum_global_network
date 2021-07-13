const asyncHandler = require("../../helpers/asyncHandler");
const { openToken } = require("../../helpers/jwt");
const { editUserById, getUserById } = require("../../helpers/user");
const { sendVerificationMail } = require("../../helpers/verification");

//VERIFY POST
exports.verifyGet = asyncHandler(async (req, res, next) => {
    
    try {
        
        const token = await openToken(req.params.token);
        await editUserById(token.id, {
            is_verify: 1
        });
        return res.redirect("/login");
        
    } catch (error) {
        return res.render("error/error", {
            title: "Something Went Wrong",
            text:error.message
        })
    }
})

//SEND NEW VERIFICATION
exports.reSendNewVerificationMail = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    const user = await getUserById(id);

    sendVerificationMail(user);
    
    res.json({status:true,message:"Kindly Check Your Email For Verification Link"})
})