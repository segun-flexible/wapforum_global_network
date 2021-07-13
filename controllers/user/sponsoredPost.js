const asyncHandler = require("../../helpers/asyncHandler");
const { getBonuses } = require("../../helpers/bonus");
const { insertIntoEarningHistory, bonusInfo } = require("../../helpers/history");
const { openToken } = require("../../helpers/jwt");
const { checkIfEarnSponsored, addToSponsoredPostTrack } = require("../../helpers/sponsored");
const { editUserById } = require("../../helpers/user");


exports.sponsoredPostEarnPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    //Check If Already Earn On It
    const haveEarned = await checkIfEarnSponsored(req.body.id,id);

    if (haveEarned) return res.json({ status: false, message: "You have already earn bonus for this Ads" });

    //Add User To Earn Track
    await addToSponsoredPostTrack({
        t_sponsored_id: req.body.id,
        t_user_id: id
    });

    //Credit User
    const { b_share_bonus } = await getBonuses();
  
    await editUserById(id, {
        earnings_balance: req.user.earnings_balance + b_share_bonus
    });

    //Insert Into History
    await insertIntoEarningHistory(b_share_bonus, {
        h_user_id: id,
        h_amount: b_share_bonus,
        h_text: bonusInfo.click.text
    });

    //Response Back
    return res.json({status:true,message:`You've earn ${b_share_bonus.toLocaleString()}`})
})