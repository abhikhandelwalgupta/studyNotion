const mongoose = require("mongoose");


const instructorSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    },
    experience : {
        type : Number,
        default : 0
    },
    rating : {
        type : Number,
    },
    studentCount : {
        type : Number
    },
    createAt : {
        type : Date,
        default: Date.now(),
    }
});


module.exports = mongoose.model("Instructor" , instructorSchema)