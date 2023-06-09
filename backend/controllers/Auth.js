const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const otpGenerator = require("otp-generator");
const mailSender  = require("./../util/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");


/* User SignUp */
exports.signUp = async (req, res) => {
  console.log("Inside signUp :- "+req.body.email );
  try {
    const {
      email,
      passowrd,
      firstName,
      lastName,
      confrimPassword,
      accountType,
      phoneNO,
    } = req.body;

    
    if (!email || !passowrd || !firstName || !lastName) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exist ",
      });
    }
    if (passowrd !== confrimPassword) {
      return res.status(401).json({
        success: false,
        message: "Password not match!! ",
      });
    }
    const profileDetails = await Profile.create({
      dateOfBirth: null,
      bio:null,
      profession : null
  });
    const hashedPassword = await bcrypt.hash(passowrd, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      phoneNO,
      additionalDetails:profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User is registered Successfully ",
      user,
    });
  } catch (e) {
    console.log("Something Went wrong while user creating... ");
    console.error(e);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while user creating",
      error: e.errors,
    });
  }
};

/* User Login */
exports.login = async (req, res) => {
  console.log("Inside Login ");
  try {
    const { email, passowrd } = req.body;
    if (!email || !passowrd) {
      return res.status(403).json({
        success: false,
        message: "Please enter email and password ",
      });
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User doen't exist ",
      });
    }

    if (await bcrypt.compare(passowrd, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User login succussfuly ",
        user,
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Please Valid password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};


// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
	try {
		const { email } = req.body;

    console.log(req.body);

		// Check if user is already present
		// Find user with provided email
		const checkUserPresent = await User.findOne({ email });
		// to be used in case of signup

		// If user found with provided email
		if (checkUserPresent) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

    var otp = Math.floor(100000 + Math.random() * 900000)
    console.log(`OTP is :- ${otp}`);
     const emailVerification  = otpTemplate(otp);
     // console.log(emailVerification);
	
    try {
     
      const otpSend =  await mailSender(email, 'Email Verification from study Notion' , emailVerification)
    }catch(error) {
      console.log("Error while otp send by mail "+ error.message);
      return res.status(500).send('Error sending OTP');
    }
    
		const otpPayload = { email, otp };
		//const otpBody = await otp.create(otpPayload);
		//console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};

// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};