const mongoose = require("mongoose")

const subSectionSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type:String,
    },
    videoUrl:{
        type:String,
    },
    createAt : {
        type : Date,
        default: Date.now(),
    }
});


module.exports = mongoose.model("SubSection" , subSectionSchema);
