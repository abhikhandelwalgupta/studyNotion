const express = require("express");
const router = express.Router();

const { createCourse, getAllCourses, getCourseDetails, editCourse, getInstructorCourse, deleteCourse, getEnrolledCourseDetails } = require("../controllers/Courses")

const { createCategory, showCategory, categoryPageDetails } = require("../controllers/Category")

// Sections Controllers Import
const { createSection, updateSection, deleteSection, updateMainSection } = require("../controllers/Section")

const { createRating, getAverageRating, getAllRating, } = require("../controllers/RatingAndReview")

const { auth, isStudent, isInstructor } = require("../middleware/auth");
// const { route } = require("./routes");
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/subSection");
const { updateCourseProgress } = require("../controllers/courseProgress");


router.post("/createCourse", auth, isInstructor, createCourse);
router.put("/editCourse", auth, isInstructor, editCourse)
router.get("/getAllCourses", auth, getAllCourses);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
//router.post("/getCourseDetails", auth , isInstructor , getCourseDetails);
router.post("/getInstructorCourse", auth, isInstructor, getInstructorCourse)
router.delete("/deleteCourse", auth, isInstructor, deleteCourse)
router.put("/updateMainSection", auth, isInstructor, updateMainSection)
router.post("/getEnrolledCourseDetails", auth, isStudent, getEnrolledCourseDetails)
router.post("/markLectureAsComplete", auth, isStudent, updateCourseProgress)



// router.post("/createCategory" , auth, isAdmin , createCategory);
router.post("/createCategory", createCategory);
router.get("/showAllCategories", showCategory);
router.post("/getCategoryPageDetails", categoryPageDetails)
router.post("/getCourseDetails", getCourseDetails);

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)



module.exports = router



