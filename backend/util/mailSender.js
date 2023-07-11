/*const nodeMailer = require("nodemailer")
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
*/

///a
const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.HOST_EMAIL,
                //service: 'gmail',
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })


            let info = await transporter.sendMail({
                from: 'StudyNotion',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log("this error in mailSender function "+error.message);
    }
}


module.exports = mailSender;