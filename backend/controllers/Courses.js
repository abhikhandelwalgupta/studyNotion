const course = require("../models/Courses");
const Tag = require("../models/Tag");
require("dotenv").config();

exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      coursDescription,
      instructor,
      whatYouWillLearn,
      price,
      tag,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    if (
      !courseName ||
      !coursDescription ||
      !instructor ||
      !whatYouWillLearn ||
      !tag ||
      !price
    ) {
      return res.status(401).json({
        success: false,
        message: "Please Fill Requried Feild",
      });
    }

    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag Details not found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    const newCourse = await course.create({
      courseName,
      coursDescription,
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
