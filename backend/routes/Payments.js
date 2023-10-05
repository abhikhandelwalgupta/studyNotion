const express = require("express");
const router = express.Router();

const { capturePayment, verifySignature, sendPaymentSuccessEmai } = require("../controllers/Payments")
const { auth, isStudent } = require("../middleware/auth");

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", auth, isStudent, verifySignature)
router.post("/sendPaymentSuccessEmai", auth, isStudent, sendPaymentSuccessEmai)


module.exports = router