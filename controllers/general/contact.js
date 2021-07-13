const { contactUsMailer } = require("../../email/mails/contact");
const asyncHandler = require("../../helpers/asyncHandler");

exports.getContact = asyncHandler(async (req, res, next) => {
    res.render("general/page/contact", {
        title: "Contact Us/FeedBack Us"
    })
})



exports.postContact = asyncHandler(async (req, res, next) => {
    req.body.date = new Date().toUTCString();
    
    contactUsMailer(req.body)
    res.json({status:true,message:"Message Sent!"})
})