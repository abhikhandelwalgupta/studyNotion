const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinay } = require("../util/imageUploader");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files.video;

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadDetails = await uploadImageToCloudinay(
      video,
      process.env.FOLDER_NAME
    );

    if (!uploadDetails) {
      return res.status(401).json({
        success: false,
        message: "Video Upload falid.. ",
      });
    }
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    const updatesection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      }
    ).populate("subSection");

    res.status(200).json({
      success: true,
      message: "Successfully inserted.. ",
      updatesection,
    });
  } catch (error) {
    console.log("Something Went wrong in SubSection creation :- " + error);
    return res.status(401).json({
      success: false,
      message: "Sub-Section creation faild ",
    });
  }
};

//Update SubSection 
exports.updateSubSection = async (req, res) => {
  try {
    console.log(`Update Section :- `, req.body);
    const { sectionId, subSectionId } = req.body;


    let getSubSectionDetails = await SubSection.findById(subSectionId);

    if (req.body?.description) {
      getSubSectionDetails.description = req.body?.description;
    } else if (req.body?.title) {
      getSubSectionDetails.title = req.body.title
    } else if (req?.files?.video) {
      let video = req.files.video;
      const uploadDetails = await uploadImageToCloudinay(
        video,
        process.env.FOLDER_NAME
      );
      getSubSectionDetails.timeDuration = uploadDetails.duration,
        getSubSectionDetails.videoUrl = uploadDetails.secure_url
    }

    let updateResult = await getSubSectionDetails.save();

    if (updateResult) {
      return res.status(200).json({
        success: true,
        message: "Record has been updated",
        updateResult
      })
    }else {
      return res.status(401).json({
        success: false,
        message: "Sub-Section updation faild ",
      });
    }
   


  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Sub-Section updation faild ",
    });
  }
}
// Delete SubSection
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.params;

    if (!subSectionId) {
      return res.status(402).json({
        success: false,
        message: "SubSection id is messing ",
      });
    }

    const subSectionDelete = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSectionDelete) {
      return res.status(401).json({
        success: false,
        message: "Sub section not found",
      });
    }
  } catch (error) {
    console.log(`Something went wrong in sub section deletion ${error}`)
    return res.status(401).json({
      success: false,
      message: "Unable to delete Section, please try again",
      error: error.message,
    })
  }
};


