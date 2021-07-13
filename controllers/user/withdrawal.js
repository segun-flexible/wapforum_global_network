const asyncHandler = require("../../helpers/asyncHandler");
const { getUserBank } = require("../../helpers/wallet");

const { openToken } = require("../../helpers/jwt");
const { getUniqueID } = require("../../helpers/uniqueID");
const { getUserById } = require("../../helpers/user");
const { insertIntoWithdrawalHistory, checkIfHasPendingWithdrawal } = require("../../helpers/withdrawal");
const { getWebSettings } = require("../../helpers/settings");

exports.userMakeWithdrawalGet = asyncHandler(async (req, res, next) => {
    res.render("user/pages/withdrawal/makeWithdrawal", {
        title: "Withdrawal"
    })
})

//WITHDRAWAL POST
exports.userMakeWithdrawalPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    const { earnings_balance, referral_balance } = await getUserById(id);

    const amountRequested = parseInt(req.body.amount)
    
    //Check If Has A Wallet
    const bank = await getUserBank(id);
    if (!bank) {
        return res.json({status:false, message:"Wallet Not Found",text:"You need to setup your wallet before you can make withdrawal"})
    }
    

    
    //Check If Has Pending Withdrawal
    const hasPendingWithdrawal = await checkIfHasPendingWithdrawal(id);
   
    if (hasPendingWithdrawal) {
        return res.json({status:false, message:"Unable To Make Withdrawal",text:"You already have a pending withdrawal on the system"})
    }

    //Get Web Settings
    const { website_act_withdrawal_status, website_ref_withdrawal_status, website_act_min_withdrawal, website_act_max_withdrawal, website_ref_max_withdrawal, website_ref_min_withdrawal } = await getWebSettings();


    //Check If Requested For activities and check balance
    if (req.body.type === "act") {
        
        if (earnings_balance < amountRequested && amountRequested > 0) {
            return res.json({ status: false, message: "Insufficient Activities Earnings" })
        }

        //Check If Activities Is Not Open
        if (!website_act_withdrawal_status) {
            return res.json({ status: false, message: "Activities Earnings Withdrawal Have Been Closed",text:"The activities withdrawal have been closed for the moment, it will be open soon" })
        }


    } else if (req.body.type === "ref") {
        
        if (referral_balance < amountRequested && amountRequested > 0) {
            return res.json({ status: false, message: "Insufficient Referral Earnings" })
        }
        
        //Check If Referral Is Not Open
        if (!website_ref_withdrawal_status) {
            return res.json({ status: false, message: "Referral Earnings Withdrawal Have Been Closed",text:"The referral withdrawal have been closed for the moment, it will be open soon" })
        }


    } else if (req.body.type === "all") {
        
        if ((earnings_balance + referral_balance) < amountRequested && amountRequested > 0) {
            return res.json({ status: false, message: "Insufficient Activities & Referral Earnings" })
        }

        //Check If Activities And Referral Is Not Open
        if (!(website_act_withdrawal_status) || !(website_ref_withdrawal_status)) {
            return res.json({ status: false, message: "One of the withdrawal type has been closed" })
        }


    } else return res.json({ status: false, message: "Invalid Withdrawal Type" });

    //Check Min And Max Activities Withdrawal
    if (req.body.type === "act" && amountRequested < website_act_min_withdrawal) {
        return res.json({status:false,message:`Minimum Withdrawal Coin Is ${website_act_min_withdrawal}`,text:`The minimum activities withdrawable coin is ${website_act_min_withdrawal}`})
    }
    if (req.body.type === "act" && amountRequested > website_act_max_withdrawal) {
        return res.json({status:false,message:`Maximum Withdrawal Coin Is ${website_act_max_withdrawal}`,text:`The maximum activities withdrawable coin is ${website_act_max_withdrawal}`})
    }



    //Check Min And Max Referral Withdrawal
    if (req.body.type === "ref" && amountRequested < website_ref_min_withdrawal) {
        return res.json({status:false,message:`Minimum Withdrawal Coin Is ${website_ref_min_withdrawal}`,text:`The minimum referral withdrawable coin is ${website_ref_min_withdrawal}`})
    }
    if (req.body.type === "ref" && amountRequested > website_ref_max_withdrawal) {
        return res.json({status:false,message:`Maximum Withdrawal Coin Is ${website_ref_max_withdrawal}`,text:`The maximum referral withdrawable coin is ${website_ref_max_withdrawal}`})
    }


    //Insert Into Withdrawal History
    await insertIntoWithdrawalHistory({
        w_trx_id: "TRX" + getUniqueID(),
        w_type: req.body.type,
        w_user_id: id,
        w_amount: amountRequested
    }); 


    //Response To Client
    return res.json({status:true, message:"Withdrawal Successful",text:"You have successfully make a withdrawal, kindly wait while we approve it",goto:"/user/history/withdrawal"})
})

