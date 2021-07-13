const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");
const { getWebSettings } = require("../../helpers/settings");


exports.resetPasswordMailer = async (obj) => {

    const {website_title, website_email, website_url,website_logo} = await getWebSettings()

    const url = `${website_url}/reset?token=${obj.token}`;
  
    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","resetpasswordtemplate.ejs"),{obj,website_title,website_url,website_logo,url,year:new Date().getFullYear()});

    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: obj.email,
    subject: 'Reset Password',
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) logger.debug(err)
        else console.log(result)
    })

    
}

//ADMIN RESET PASSWORD
exports.adminResetPasswordMailer = async (obj) => {

    const {website_title, website_email, website_url,website_logo} = await getWebSettings()

    const url = `${website_url}/admin/reset?token=${obj.token}`;
  
    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","adminresetpasswordtemplate.ejs"),{obj,website_title,website_url,website_logo,url,year:new Date().getFullYear()});

    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: obj.email,
    subject: 'Admin Reset Password',
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) logger.debug(err)
        else console.log(result)
    })

    
}
