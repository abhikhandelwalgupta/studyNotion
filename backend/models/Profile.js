const { models } = require("mongoose");
const mongoose = require("mongoose");



const profileSchema = new mongoose.Schema({
    bio : {
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


exports.models = models.Schema("Profile" , profileSchema);