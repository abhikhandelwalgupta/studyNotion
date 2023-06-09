const { models } = require("mongoose");
const mongoose = require("mongoose");



const profileSchema = new mongoose.Schema({
    about : {
        type : String,
    },
    dob : {
        type : Date
    },
    profession : {
        type : String
    },
    createAt : {
        type : Date,
        default: Date.now(),
    }
});


exports.models = mongoose.model("Profile" , profileSchema);