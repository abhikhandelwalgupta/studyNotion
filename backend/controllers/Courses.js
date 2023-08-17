const course = require("../models/Courses");
const Tag = require("../models/Tag");
const User = require("../models/User");
const Category = require("../models/Category");
const Courses = require("../models/Courses");
require("dotenv").config();

exports.createCourse = async (req, res) => {
  console.log(`files :- `,req.files.thumbnailImage);
  try {
    const {
      courseName,
      courseDescription,
      instructions,
      whatYouWillLearn,
      price,
      tag,
      category,
    } = req.body;

   //console.log(`Request body of create course :- ${req.body}`);
    const thumbnail = req.files.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !tag ||
      !price ||
      !category ||
      !instructions 
    ) {
      return res.status(401).json({
        success: false,
        message: "Please Fill Requried Feild",
      });
    }
    console.log(`Request body of create course 1 :-`, req.body);
    const userId = req.user.id;
    console.log(`User id` , userId);
    const instructorDetails = await User.findById(userId);
    console.log(`instructorDetails id` , instructorDetails);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }
    console.log(`Request body of create course :-`, req.body);
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag Details not found",
      });
    }
    console.log(`Tag  :-`, tagDetails);

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag Details not found",
      });
    }
    console.log(`categoryDetails  :-`, categoryDetails);

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    const newCourse = await course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    //add the new course to the user schema of Instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //update the TAG ka schema
    //TODO: HW
    await Tag.findByIdAndUpdate(
      { _id: tagDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //return response
    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong in course creation",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await course
      .find(
        {},
        {
          courseName: true,
          price: true,
          thumbnail: true,
          instructor: true,
          ratingAndReviews: true,
          studentsEnroled: true,
        }
      )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    console.log(`Error : ${error}`);
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error.message,
    });
  }
};

exports.showCourse = async (req, res) => {
  try {
    const allCourse = await course.find({});

    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (e) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot Fetch course data",
      error: error.message,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Courses.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.editCourse = async (req,res)=> {
  try {
    console.log(rq.body);

    const {courseId} = req.body

    const fetchCourseDetails = course.findById({courseId})

    console.log(`fetch Course Details :- ${fetchCourseDetails}` );

    return res.status(200).json({
      success :true,
      message : "Testing"
    })

  }catch(error) {
    return res.status(401).json({
      success :false ,
       message :"Error in updating"
    })
  }
}