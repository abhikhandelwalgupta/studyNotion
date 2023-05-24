const mongoose = require("mongoose")


const sectionSchema = mongoose.Schema({
    sectionName : {
        type : String,
        require : true,
        trim : true
    },
    subSection : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "SubSection"
    }],
    createAt : {
        type : Date,
        default: Date.now(),
    }
})


module.exports = mongoose.model("Section" , sectionSchema)