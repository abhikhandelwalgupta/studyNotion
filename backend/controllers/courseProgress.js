const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async (req, res) => {
    try {
        const { courseID, subSectionId } = req.body;
        const userId = req.user.id;

        if (!subSectionId) {
            return res.status(404).json({
                success: false,
                message: "Invalid subsection"
            })
        }

        const courseProgressDetails = await CourseProgress.findOne({
            courseID: courseID,
            userId: userId
        })


        if (!courseProgressDetails) {
            return res.status(404).json({
                success: false,
                message: "Course progress Does Not Exist",
            })
        } else {

            if (courseProgressDetails.completedVideos.includes(subSectionId)) {
                return res.status(400).json({ error: "Subsection already completed" })
            } else {
                courseProgressDetails.completedVideos.push(subSectionId)
            }
            await courseProgressDetails.save()
        }



        return res.status(200).json({ message: "Course progress updated" })


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}