const express = require("express");
const { isStudent, auth } = require("../middleware/auth");
const { getUserWishList, addWishList, removeWishList } = require("../controllers/wishList");
const router = express.Router();


router.get("/getUserWishList", auth, isStudent, getUserWishList)
router.post("/addWishList", auth, isStudent, addWishList)
router.get("/removeWishList", auth, isStudent, removeWishList)

module.exports = router;