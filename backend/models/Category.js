const mongoose = require("mongoose");
const { models } = require("./Profile");


const categorySchema = mongoose.Schema({
    Name : {
        type : String,
        require:true,
        trim : true
    },
    description: { type: String },
    courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
    categoryStatus: {
        type : String,
        enum : ["Active" , "Inactive"],
        default : "Active"
    },
    createAt : {
        type : Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model("Category" , categorySchema);