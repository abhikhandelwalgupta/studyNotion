const { findById } = require("../models/Courses");
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const { bio, dob, profession, gender } = req.body;

    if (!bio || !dob || !profession || !gender) {
      return res.status(401).json({
        success: false,
        message: "All Felid requried ",
      });
    }

    const user_id = req.body.user_id;
    const userDetils = await User.findById(user_id);
    if(!userDetils) {
        return res.status(401).json({
            success: false,
            message: "User not found ",
          });
    }
    const profileId = userDetils.profile;
    const profileDetails = await Profile.findById(profileId);

    userDetils.gender = gender;
    await userDetils.save();
    profileDetails.bio = bio;
    profileDetails.dob = dob;
    profileDetails.profession = profession;
    await profileDetails.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      profileDetails,
    });
  } catch (error) {}
};

exports.deleteAccount = async (req, res) => {
    try{
        //get id 
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:'User not found',
            });
        } 
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //TOOD: HW unenroll user form all enrolled courses
        //delete user
        await User.findByIdAndDelete({_id:id});
       
        //return response
        return res.status(200).json({
            success:true,
            message:'User Deleted Successfully',
        })

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User cannot be deleted successfully',
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
            success:true,
            message:'User Data Fetched Successfully',
        });
       
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


exports.getEntrolledCourse = async (req,res)=> {
    try {
         const user_id = req.user.id;


         const user_details = await User.findOne({_id:user_id}).populate("courses").exec();
         if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
          }
          return res.status(200).json({
            success: true,
            data: userDetails.courses,
          })
    }catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
}