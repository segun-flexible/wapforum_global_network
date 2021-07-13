const { accountUnlockedMailer } = require("../../email/mails/accountUnlocked");
const asyncHandler = require("../../helpers/asyncHandler");
const { getCouponByKey, updateCouponByKey } = require("../../helpers/coupon");
const { openToken } = require("../../helpers/jwt");
const { creditReferrer } = require("../../helpers/referral");
const { editUserById, getUserById } = require("../../helpers/user");

exports.userUnlockUpgradePost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    
    //Get The Coupon
    const coupon = await getCouponByKey(req.body.code);

    //Check If Available
    if (!coupon) return res.json({ status: false, message: "Coupon not found" });

    //Check If Is Used
    if (coupon.coupon_status === 1) return res.json({ status: false, message: "Coupon has been used" });
    
    //Then Upgrade User
    await editUserById(id, { can_earn: 1 });

    //Used Coupon
    await updateCouponByKey(coupon.coupon_id, { coupon_status: 1, coupon_used_by:id });

    //Credit His Referrer
    await creditReferrer(id);
    
    //Response Back
    res.json({ status: true, message: "Account has been unlocked successfully" });

    //Send Mail
    const user = await getUserById(id);
    accountUnlockedMailer({
        username: user.username,
        email: user.email
    });



})