const { adminLoginGet, adminLoginPost } = require("../../controllers/auth/admin/adminAuth");
const { adminForgotPasswordGet, adminForgotPasswordPost, adminResetPasswordGet, adminResetPasswordPost } = require("../../controllers/auth/admin/forgotPasswordAdmin");
const { userRegisterGet, fetchUplineGet, userRegisterPost, userLoginGet, userLoginPost } = require("../../controllers/auth/auth");
const { userForgotPasswordGet, userForgotPasswordPost, resetPasswordGet, resetPasswordPost } = require("../../controllers/auth/forgot");
const { reSendNewVerificationMail, verifyGet } = require("../../controllers/auth/verify");
const { logoutGet } = require("../../controllers/general/logout");
const { generalData } = require("../../middleware/generalData");
const { isAuthUser, isUserLogin } = require("../../middleware/isAuth");

const authRoute = require("express").Router();

//REGISTER
authRoute.route("/register").get(generalData, isAuthUser, userRegisterGet).post(isAuthUser, userRegisterPost)

//LOGIN
authRoute.route("/login").get(generalData, isAuthUser, userLoginGet).post(isAuthUser, userLoginPost)

//RESET PASSWORD
authRoute.route("/forgot-password").get(generalData, isAuthUser, userForgotPasswordGet).post(isAuthUser, userForgotPasswordPost)

//RESET PASSWORD
authRoute.route("/reset").get(generalData, isAuthUser, resetPasswordGet).post(isAuthUser, resetPasswordPost)


//FETCH UPLINE
authRoute.route("/register/search").get(fetchUplineGet)


//<!------ADMIN--------->

//ADMIN LOGIN
authRoute.route("/admin/login").get(generalData, isAuthUser, adminLoginGet).post(isAuthUser, adminLoginPost);

//ADMIN RESET PASSWORD
authRoute.route("/admin/forgot-password").get(generalData, isAuthUser, adminForgotPasswordGet).post(isAuthUser, adminForgotPasswordPost)

//ADMIN RESET PASSWORD
authRoute.route("/admin/reset").get(generalData, isAuthUser, adminResetPasswordGet).post(isAuthUser, adminResetPasswordPost)




//LOGOUT
authRoute.route("/logout").get(isUserLogin, logoutGet);


//VERIFICATION
authRoute.route("/verification").get(isUserLogin,reSendNewVerificationMail);

authRoute.route("/verify/:token").get(verifyGet);

module.exports = authRoute

