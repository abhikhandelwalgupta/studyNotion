const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/Auth");
const { isAdmin, auth, isInstructor } = require("../middleware/auth");
const { showAlltags, createTag } = require("../controllers/Tag");
const { showCourse } = require("../controllers/Courses");
const { createSubSection } = require("../controllers/subSection");

router.get("/showTag", auth, showAlltags);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/createTag", auth,isAdmin, createTag);
router.post("/showCourse", auth, showCourse);
router.post("/createSubSection", auth, isInstructor, createSubSection);
module.exports = router;
