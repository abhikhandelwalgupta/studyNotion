const Courses = require("../models/Courses");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    //data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    const newSection = await Section.create({ sectionName });
    const updatedCourseDetails = await Courses.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    //return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    console.log("Error Occur in create Section ");
    return res.status(401).json({
      success: false,
      message: "Unable to create Section, please try again",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    //data input
    const { sectionName, sectionId } = req.body;
    //data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    //update data
    await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

    //return res
    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update Section, please try again",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    //get ID - assuming that we are sending ID in params
    const { sectionId ,courseId } = req.body;
        
    let fetchSection =  await Section.findById(sectionId).populate("subSection").exec();

   //console.log(fetchSection);

   if(!fetchSection) {
    return res.status(404).json({
      success:false,
      message:"Section not Found",
    })

   }

   await SubSection.deleteMany({_id :{$in: fetchSection.subSection}})
   await Section.findByIdAndDelete(sectionId);
   await Courses.findByIdAndUpdate( courseId,  {$pull : {courseContent :sectionId }})
    

    const course = await Courses.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();


    return res.status(200).json({
      success: true,
      message: "Section Deleted Successfully",
      data : course
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete Section, please try again",
      error: error.message,
    });
  }
};



exports.updateMainSection = async (req, res) => {
  try {
    
    const {sectionName , courseId , sectionId}  = req.body;

    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }
     const updatedSection = await Section.findByIdAndUpdate(sectionId , {sectionName:sectionName},{ new: true })
     if(!updatedSection) {
      return res.status(404).json({
        success :false,
        message : "Section not found"
      })
     }


     const course = await Courses.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

     return   res.status(200).json({
      success :true,
      message : "Section Updated",
      data : course
    })
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error..."
    })

  }
}
