const express = require("express");
const router = express.Router();
const { auth, isStudent, isInstructor } = require("../middleware/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  //getEntrolledCourse,
  getStudentEnrolledCourse,
  instructorDashboard,
} = require("../controllers/Profile");



router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// // Get Enrolled Courses
// router.get("/getEnrolledCourses", auth, getEntrolledCourse)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/getStudentEnrolledCourse", auth, isStudent, getStudentEnrolledCourse)
router.get("/instructorDashboard" ,auth, isInstructor, instructorDashboard)

module.exports = router
