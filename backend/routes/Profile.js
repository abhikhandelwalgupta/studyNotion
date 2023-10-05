const express = require("express");
const router = express.Router();
const { auth, isStudent } = require("../middleware/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  //getEntrolledCourse,
  getStudentEnrolledCourse,
} = require("../controllers/Profile");



router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// // Get Enrolled Courses
// router.get("/getEnrolledCourses", auth, getEntrolledCourse)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/getStudentEnrolledCourse", auth, isStudent, getStudentEnrolledCourse)

module.exports = router