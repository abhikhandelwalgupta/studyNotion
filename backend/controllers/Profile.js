const Profiles = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinay } = require("../util/imageUploader");

exports.updateProfile = async (req, res) => {
  console.log(`inSide update profile ${JSON.stringify(req.body)}`);
  try {
    const { about, dateOfBirth, mobileNumber, gender } = req.body;

    console.log(req.body);
    if (!about || !dateOfBirth || !mobileNumber || !gender) {
      return res.status(401).json({
        success: false,
        message: "All Felid requried ",
      });
    }

    const user_id = req.user.id;
    const userDetils = await User.findById(user_id);
    if (!userDetils) {
      return res.status(401).json({
        success: false,
        message: "User not found ",
      });
    }
    const profileId = userDetils.profile;
    const profileDetails = await Profiles.findById(profileId);
    userDetils.gender = gender;
    userDetils.phoneNO = mobileNumber
    await userDetils.save();
    profileDetails.about = about;
    profileDetails.dob = dateOfBirth;
    await profileDetails.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      profileDetails,
      userDetils
    });
  } catch (error) {
    console.log(`Inside update profile error ${error}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    })

  }
};

exports.deleteAccount = async (req, res) => {
  try {
    //get id 
    const id = req.user.id;
    //validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    //delete profile
    await Profiles.findByIdAndDelete({ _id: userDetails.additionalDetails });
    //TOOD: HW unenroll user form all enrolled courses
    //delete user
    await User.findByIdAndDelete({ _id: id });

    //return response
    return res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
    })

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'User cannot be deleted successfully',
    });
  }
};

exports.getAllUserDetails = async (req, res) => {

  try {
    //get id
    const id = req.user.id;

    //validation and get user details
    const userDetails = await User.findById(id).populate("additionalDetails").exec();
    //return response
    return res.status(200).json({
      success: true,
      message: 'User Data Fetched Successfully',
      userDetails
    });

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


exports.getStudentEnrolledCourse = async (req, res) => {
  try {
    const user_id = req.user.id;


    const userDetails = await User
      .findOne({ _id: user_id })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          }
        }
      })
      .exec();
    console.log(userDetails.courses);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    console.log(userDetails);
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



exports.updateDisplayPicture = async (req, res) => {
  console.log("In side " + JSON.stringify(req.files.image));
  try {
    const displayPicture = req.files.image
    const userId = req.user.id
    const image = await uploadImageToCloudinay(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

