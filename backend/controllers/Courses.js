const course = require("../models/Courses");

// const Tag = require("../models/Tag");
const User = require("../models/User");
const Category = require("../models/Category");
const Courses = require("../models/Courses");
const { uploadImageToCloudinay } = require("../util/imageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { default: mongoose } = require("mongoose");
const { convertSecondsToDuration } = require("../util/secToDuration");
const CourseProgress = require("../models/CourseProgress");
require("dotenv").config();

exports.createCourse = async (req, res) => {

  try {
    let {
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

    tag = JSON.parse(tag)
    instructions = JSON.parse(instructions)

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

    const userId = req.user.id;

    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag Details not found",
      });
    }
    console.log(`categoryDetails  :-`, categoryDetails);

    const thumbnailImage = await uploadImageToCloudinay(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(`This is after category details  ,`, courseDescription);

    const newCourse = await course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      thumbnail: thumbnailImage.secure_url,
      category: categoryDetails._id,
      status: "Draft",
      instructions,
    });

    //add the new course to the user schema of Instructor

    console.log(`This is created new course`, newCourse);
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
    await Category.findByIdAndUpdate(
      { _id: category },
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

    console.log(`Error Message :- `, error.message);

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
      data: allCourse,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Cannot Fetch course data",
      error: e.message,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  console.log(req.body);
  try {
    const { courseId } = req.body;
    const courseDetails = await course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "profile"
        }
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

exports.editCourse = async (req, res) => {
  try {
    console.log(`This is inside edit controller `, req.body);

    const { courseId } = req.body;

    const fetchCourseDetails = await Courses.findById(courseId);

    if (!fetchCourseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      })
    }

    if (req.body?.courseDescription) {
      fetchCourseDetails.courseDescription = req.body.courseDescription
    } else if (req.body?.price) {
      fetchCourseDetails.price = req.body.price
    } else if (req.body?.courseName) {
      fetchCourseDetails.courseName = req.body.courseName
    } else if (req.body?.tag) {
      let tag = JSON.parse(req.body?.tag)
      fetchCourseDetails.tag = tag
    } else if (req.body?.whatYouWillLearn) {
      fetchCourseDetails.whatYouWillLearn = req.body?.whatYouWillLearn
    } else if (req.body?.instructions) {
      let instructions = JSON.parse(req.body?.instructions)
      fetchCourseDetails.instructions = instructions
    } else if (req.files?.thumbnailImage) {
      let thumbnail = req.files.thumbnailImage;
      let thumbnailImage = await uploadImageToCloudinay(
        thumbnail,
        process.env.FOLDER_NAME
      );
      fetchCourseDetails.thumbnail = thumbnailImage.secure_url
    } else if (req.body?.category) {
      let category = req.body?.category
      const categoryDetails = await Category.findById(category);
      fetchCourseDetails.category = categoryDetails._id
    } else if (req.body?.status) {
      fetchCourseDetails.status = req.body?.status
    }

    const CourseUpdate = await fetchCourseDetails.save()
    console.log(`Course updated feild :- `, CourseUpdate);


    if (CourseUpdate) {
      return res.status(200).json({
        success: true,
        message: "Course has been updated",
        CourseUpdate
      });
    }
    return res.status(401).json({
      success: false,
      message: "Error in updating",
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error in updating",
    });
  }
};

exports.getInstructorCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    // const user = User;
    const result = await Courses.find({ instructor: userId })
      .populate("category")
      .populate("courseContent")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log(`Request in Delete :- `, courseId);

    let courseFetch = await course.findById(courseId);
    if (!courseFetch) {
      return res.status(404).json({
        success: false,
        message: "Course Doesn't found"
      })
    }

    const studentsEnrolle = courseFetch.studentsEnrolled
    for (const studentId of studentsEnrolle) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }


    let courseSections = courseFetch.courseContent
    for (let sectionId of courseSections) {
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }
      await Section.findByIdAndDelete(sectionId)
    }
    await course.findByIdAndDelete(courseId)
    await Courses.findByIdAndDelete(courseId);



    return res.status(200).json({
      success: true,
      message: "Deleted...",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Error in Delete",
    });
  }

};



exports.getEnrolledCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const userId = req.user.id

    const uid = new mongoose.Types.ObjectId(userId);

    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: "Course id  feild are mandatory"
      })
    }


    const courseDetails = await Courses.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "profile",
        },
      })
      .populate("ratingAndReview")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection"
        }
      }).exec();


    if (!courseDetails.studentsEnrolled.includes(uid)) {
      return res.status(401).json({
        success: false,
        message: "Please Enrolled this is course"
      })
    }

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      }
    })



  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}


exports.markLectureAsComplete = async (req, res) => {

}