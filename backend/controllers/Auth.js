const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* User SignUp */
exports.signUp = async (req, res) => {
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

    if (!email || !passowrd || !firstName || !lastName || !phoneNO) {
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
