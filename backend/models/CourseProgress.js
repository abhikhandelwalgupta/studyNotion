const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({
    
    courseID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    completedVideos: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
        }
    ],
    createAt : {
        type : Date,
        default: Date.now(),
    },
    updateAt : {
        type : Date
    }

});

module.exports = mongoose.model("CourseProgress", courseProgress);