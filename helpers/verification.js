const { verifyAccountMailer } = require("../email/mails/verifyAccount");
const { signResetPasswordToken } = require("./jwt")

//SEND VERIFICATION MAIL
exports.sendVerificationMail = (userObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await signResetPasswordToken({ id: userObj.uid });
            userObj.token = token;
            
            verifyAccountMailer(userObj);
            
            resolve()
        } catch (error) {
            reject()
        }
    })
}