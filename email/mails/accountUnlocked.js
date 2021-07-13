const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const { getWebSettings } = require("../../helpers/settings");
const logger = require("../../helpers/logger");



exports.accountUnlockedMailer = async (obj) => {

    //GET Site Email
    const { website_title, website_email, website_url, website_currency, website_logo } = await getWebSettings();

    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","accountUnlocked.ejs"),{obj,website_title,website_url,website_currency,website_logo,year:new Date().getFullYear()});

    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: obj.email,
    subject: 'Your Account Has Been Unlocked',
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        } else {
            console.log(result)
        }
    })

    
}
