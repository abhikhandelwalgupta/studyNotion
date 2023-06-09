const express = require("express");
const router = express.Router();


const {signUp , login ,sendotp ,changePassword } = require("../controllers/Auth")
const { auth } = require("../middleware/auth")
const {resetPasswordToken , resetPassword} = require("../controllers/ResetPassword")

router.post("/login", login);
router.post("/signup", signUp)
router.post("/sendotp", sendotp)
router.post("/changepassword", auth, changePassword)

router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)

module.exports = router