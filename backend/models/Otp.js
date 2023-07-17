const mongoose = require("mongoose");
const mailSender = require("../util/mailSender")
const emailTemplate = require("../mail/templates/emailVerificationTemplate")

const OTPschema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

async function sendVerificationEmail (email , otp) {
  console.log("Inside send verification email ");
    try {
        const mailResponse = await mailSender(email , "Verification Email from StudyNotion", emailTemplate(otp));
        console.log("Email sent Successfully: ", mailResponse);
    }catch(error) {
        console.log("error occured while sending mails: ", error);
        throw error;
    }
}


OTPschema.pre("save" , async function(next){
console.log("OTP Schema prev ");
  if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
    next();
});


module.exports = mongoose.model ("OTP" , OTPschema);



