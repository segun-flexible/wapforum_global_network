
const { adminDashboardGet } = require("../../controllers/admin/dashboard");

const { isAdmin, isUserLogin } = require("../../middleware/isAuth");
const { identityMulter, userAvatarMulter } = require("../../multer/multerMiddleware");

const { adminActivationFeeGet, adminActivationFeePut, adminActivationFeeDelete } = require("../../controllers/admin/activationFee");
const { adminInvestmentMergeHistoryGet, admingGetSenderMerge, admingGetReceiverMerge, admingPostMerge, adminDeleteInvestmentHistory } = require("../../controllers/admin/history/investmentMergeHistory");
const { adminListPlanGet, adminCreatePlanPost, adminEditPlanPut, adminDeletePlanDelete } = require("../../controllers/admin/packages");
const { adminUsersListGet, adminUserPut, adminUserDelete } = require("../../controllers/admin/members");
const { adminWithdrawaltListGet, adminWithdrawalApprovedPut, adminWithdrawalDeletedDelete } = require("../../controllers/admin/withdrawal");
const { adminActiveInvestmentHistory } = require("../../controllers/admin/history/activeInvestmentList");
const { adminSettingsPost, adminWebSettingsGet, adminSocialSettingsGet, adminIdentitySettingsGet, adminMergingActivationSettingsGet } = require("../../controllers/admin/settings/webSettings");
const { adminProfileSettingsGet, adminProfileSettingsPost, adminWalletSettingsPost } = require("../../controllers/admin/settings/profile");
const { adminPageGet, adminPagePost, adminPagePut, adminPageDelete, adminGetPageForEdit } = require("../../controllers/admin/page");
const { adminReportListGet, adminReportListDelete } = require("../../controllers/admin/report");

const adminRoute = require("express").Router();

//ADMIN DASHBOARD
adminRoute.route("/dashboard").get(isAdmin, adminDashboardGet);

//<!---------------------ACTIVATION FEE------------------------>
//ADMIN PACKAGES
adminRoute.route("/activation").get(isAdmin, adminActivationFeeGet).put(isAdmin, adminActivationFeePut).delete(isAdmin,adminActivationFeeDelete);


//<!---------------------HISTORY------------------------>
//INVESTMENT MERGE
adminRoute.route("/history/merge/:type").get(isAdmin, adminInvestmentMergeHistoryGet).post(isAdmin, admingPostMerge).delete(isAdmin, adminDeleteInvestmentHistory);

//ACTIVE INVESTMENT
adminRoute.route("/history/active-investment").get(isAdmin, adminActiveInvestmentHistory)

//FETCH MERGE USER
adminRoute.route("/get-merge-user/send").post(isAdmin, admingGetSenderMerge)
adminRoute.route("/get-merge-user/recieve").post(isAdmin, admingGetReceiverMerge)

//<!---------------------PACKAGES------------------------>
//ADMIN PACKAGES
adminRoute.route("/packages").get(isAdmin, adminListPlanGet).post(isAdmin, adminCreatePlanPost).put(isAdmin, adminEditPlanPut
).delete(isAdmin, adminDeletePlanDelete);

//<!---------------------USERS------------------------>
//ADMIN USERS LIST (APPROVED,DELETE)
adminRoute.route("/users").get(isAdmin, adminUsersListGet).put(isAdmin, adminUserPut).delete(isAdmin, adminUserDelete);

//ADMIN WITHDRAWAL HISTORY (APPROVED,DELETE)
adminRoute.route("/withdrawal/:type").get(isAdmin, adminWithdrawaltListGet).put(isAdmin, adminWithdrawalApprovedPut
).delete(isAdmin, adminWithdrawalDeletedDelete);



//<!---------------------SETTINGS & PROFILE------------------------>
//ADMIN SAVE SETTINGS (GENERAL)
adminRoute.route("/settings/saved").post(isAdmin, identityMulter.any(),  adminSettingsPost)

//ADMIN WEB SETTINGS
adminRoute.route("/settings/websettings").get(isAdmin, adminWebSettingsGet)

//ADMIN SOCIAL SETTINGS
adminRoute.route("/settings/social").get(isAdmin, adminSocialSettingsGet)


//ADMIN IDENTITY SETTINGS
adminRoute.route("/settings/identity").get(isAdmin, adminIdentitySettingsGet)

//ADMIN MERGING & ACTIVATION SETTINGS
adminRoute.route("/settings/merge-activation").get(isAdmin, adminMergingActivationSettingsGet)

//ADMIN PROFILE
adminRoute.route("/settings/profile").get(isAdmin, adminProfileSettingsGet).put(isAdmin, userAvatarMulter.single("avatar"), adminProfileSettingsPost)

//ADMIN WALLET SETTINGS (POST)
adminRoute.route("/settings/profile/wallet").post(isAdmin, adminWalletSettingsPost)


//<!---------------------PAGE------------------------>
//ADMIN NOTICE
adminRoute.route("/pages").get(isAdmin, adminPageGet).post(isAdmin, adminPagePost).put(isAdmin, adminPagePut).delete(isAdmin, adminPageDelete)

//ADMIN GET PAGE FOR EDIT
adminRoute.route("/pages/:id").get(isAdmin, adminGetPageForEdit)


//<!---------------------REPORT------------------------>
//ADMIN WITHDRAWAL HISTORY (APPROVED,DELETE)
adminRoute.route("/report/history").get(isAdmin, adminReportListGet).delete(isAdmin, adminReportListDelete);

/* //ADMIN REFERRAL HISTORY
adminRoute.route("/history/purchase").get(isAdmin, adminPurchaseHistoryGet) */

/* adminRoute.route("/packages/new").get(isAdmin, adminCreatePlanGet).post(isAdmin, adminCreatePlanPost); */

/* 


//<!---------------------WITHDRAWAL------------------------>
//ADMIN WITHDRAWAL HISTORY (APPROVED,DELETE)
adminRoute.route("/withdrawal/:type").get(isAdmin, adminWithdrawaltListGet).put(isAdmin, adminWithdrawalApprovedPut
).delete(isAdmin, adminWithdrawalDeletedDelete);





//<!---------------------GENERATION------------------------>
//ADMIN GENERATION LIST (APPROVED,DELETE)
adminRoute.route("/generation").get(isAdmin, adminGenerationList).post(isAdmin, adminGenerationPost).put(isAdmin, adminGenerationPut).delete(isAdmin, adminGenerationDelete);






//<!---------------------NOTICE------------------------>
//ADMIN NOTICE
adminRoute.route("/settings/notice").get(isAdmin, adminNoticeGet).post(isAdmin, adminNoticePost).put(isAdmin, adminNoticePut)



 */
module.exports = adminRoute