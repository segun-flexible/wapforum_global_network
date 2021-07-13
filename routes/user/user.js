
const { userDashboardGet } = require("../../controllers/user/dashboard");
const { earningHistoryGet } = require("../../controllers/user/history/earning");
const { referralHistoryGet } = require("../../controllers/user/history/referral");
const { withdrawalHistoryGet } = require("../../controllers/user/history/withdrawal");
const { userProfileGet, userProfilePut, userPasswordGet, userPasswordPut } = require("../../controllers/user/settings");
const { sponsoredPostEarnPost } = require("../../controllers/user/sponsoredPost");
const { testimonyGet, testimonyPost, testimonyPut, testimonyDelete } = require("../../controllers/user/testimony");
const { userUnlockUpgradePost } = require("../../controllers/user/unlock");
const { userWalletGet, userWalletPost } = require("../../controllers/user/wallet");
const { watchVideoGet, watchSingleVideoGet, watchSingleVideoPut, watchSingleVideoPost } = require("../../controllers/user/watchVideo");
const { userMakeWithdrawalGet, userMakeWithdrawalPost } = require("../../controllers/user/withdrawal");
const { generalData } = require("../../middleware/generalData");

const { isUserLogin, isUserVerified, denyAdmin, canEarn } = require("../../middleware/isAuth");
const { userDetails } = require("../../middleware/userInfo");
const { userAvatarMulter } = require("../../multer/multerMiddleware");
const userRoute = require("express").Router();

//<!-----------------DASHBOARD------------------>
//DASHBOARD
userRoute.route("/dashboard").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, userDashboardGet);

//UNLOCK UPGRADE
userRoute.route("/unlock").post(isUserLogin, isUserVerified, denyAdmin, userUnlockUpgradePost);

//SPONSORED POST
userRoute.route("/sponsored").post(isUserLogin, isUserVerified, denyAdmin, canEarn, sponsoredPostEarnPost);

//<!-----------------VIDEO------------------>
//VIDEO LIST
userRoute.route("/videos").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, watchVideoGet);

//SINGLE VIDEO
userRoute.route("/videos/:id").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, watchSingleVideoGet).post(isUserLogin,isUserVerified,denyAdmin, canEarn, watchSingleVideoPost).put(watchSingleVideoPut);

//<!-----------------WALLET------------------>
//WALLET
userRoute.route("/wallet").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, userWalletGet).post(isUserLogin, isUserVerified, denyAdmin, userWalletPost)

//<!-----------------WITHDRAWAL------------------>
//WITHDRAWAL
userRoute.route("/withdrawal").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, userMakeWithdrawalGet).post(isUserLogin, isUserVerified, denyAdmin, userMakeWithdrawalPost)

//<!-----------------HISTORY------------------>
//EARNING HISTORY
userRoute.route("/history/earnings").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, earningHistoryGet)

//REFERRAL HISTORY
userRoute.route("/history/referral").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, referralHistoryGet)

//WITHDRAWAL HISTORY
userRoute.route("/history/withdrawal").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, withdrawalHistoryGet)

//<!-----------------SETTINGS------------------>
//PROFILE
userRoute.route("/settings/profile").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, userProfileGet).put(isUserLogin, isUserVerified, denyAdmin, userAvatarMulter.single("avatar"), userProfilePut)

//SECURITY
userRoute.route("/settings/security").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, userPasswordGet).put(isUserLogin, isUserVerified, denyAdmin, userPasswordPut)

//TESTIMONY
userRoute.route("/testimony").get(generalData, isUserLogin, userDetails, isUserVerified, denyAdmin, testimonyGet).post(isUserLogin, isUserVerified, denyAdmin, testimonyPost).put(isUserLogin, isUserVerified, denyAdmin, testimonyPut).delete(isUserLogin, isUserVerified, denyAdmin, testimonyDelete)


module.exports = userRoute