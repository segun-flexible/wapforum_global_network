const asyncHandler = require("../../helpers/asyncHandler");
const { getBonuses } = require("../../helpers/bonus");
const { getDateFormatForPost } = require("../../helpers/dateTime");
const { getUserReferralHistory, getUserEarningHistory } = require("../../helpers/history");
const { openToken } = require("../../helpers/jwt");
const manipulateDate = require("../../helpers/manipulateDate");
const { getNotice } = require("../../helpers/notice");
const { getTodaySponsoredPost } = require("../../helpers/sponsored");


exports.userDashboardGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    

    //Get Last 10 Referral
    const referralHistory = await getUserReferralHistory("", id, 10, 0,"desc");
    await referralHistory.map(rh => {
        rh.created_at = getDateFormatForPost(rh.created_at)
    })

    //Get Last Earning History
    const earningHistory = await getUserEarningHistory(id, 10, 0);
    await earningHistory.map(eh => {
        if (eh.h_text.includes("referring")) eh.is_referral = "yes";
        eh.h_created_at = getDateFormatForPost(eh.h_created_at)
    });

    //Get Bonus
    const bonus = await getBonuses();

    //Today SPonsored Post
    const sponsored = await getTodaySponsoredPost();
    sponsored && (sponsored.s_created_at = manipulateDate(sponsored.s_created_at));
    
    //Notice
    const notice = await getNotice();
    notice && (notice.updated_at ? (notice.updated_at = getDateFormatForPost(notice.updated_at)) : (notice.created_at = getDateFormatForPost(notice.created_at)));


    return res.render("user/pages/dashboard/dashboard", {
        title: "My Dashboard",
        referralHistory,
        earningHistory,
        bonus,
        sponsored,
        notice
    })
})