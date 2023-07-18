const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mailSender = require("../util/mailSender");
const passwordUpdated = require("../mail/templates/passwordUpdate")

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        succuss: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }
    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );

    console.log("Inside forget password DETAILS", updatedDetails);
    const url = `http://${process.env.DOMAIN_NAME }/update-password/${token}`;
    await mailSender(
      email,
      "Password Reset",
      passwordUpdated(url ,user.firstName )
    );

   return res.status(200).json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      succuss: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { oldPassword, password, confirmPassword, token } = req.body;
    if(oldPassword === password) {
      return res.status(401).json({
        success: false,
        message: "Old Password and New Password Should be different ",
      });
    }
    const userDetails = await User.findOne({token : token});
    if (!userDetails || userDetails===0) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }
    console.log(`User is ${userDetails}`);
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if(!isPasswordMatch) {
      return res.status(401).json({
        success:false,
        message : "Please Enter Valid old Password!!  "
      })
    }
    if (confirmPassword !== password) {
      return res.status(401).json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }

    //const userDetails = await User.findOne({ token: token });
    

    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};
