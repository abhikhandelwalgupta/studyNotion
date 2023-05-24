const nodeMailer = require("nodemailer")
require("dotenv").config()

const mailSender = async (email , title , body) => {
    try {
        let transporter = nodeMailer.createTransport({
            host : process.env.HOST_EMAIL,
            auth : {
                user : process.env.email,
                password : process.env.email_password
            }
        });

        let info = await transporter.sendMail({
            from : process.env.HOST_EMAIL,
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`
        })
        
        console.log(info);
        return info;
    }catch (error) {
        console.log(error.message);
    }
};


module.exports = mailSender;