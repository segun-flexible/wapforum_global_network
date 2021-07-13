const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const { getWebSettings } = require("../../helpers/settings");
const logger = require("../../helpers/logger");


exports.contactUsMailer = async (obj) => {

    //GET Site Email
    const { website_email, website_title, website_url, website_logo } = await getWebSettings();

    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","contact.ejs"),{obj, website_title, website_url, website_logo, year:new Date().getFullYear()});

    const mailOptions = {
    from: `${obj.name} <${obj.email}>`,
    to: website_email,
    subject: obj.subject,
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
