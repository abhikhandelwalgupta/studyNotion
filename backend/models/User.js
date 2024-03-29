const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    require: true,
  },
  lastName: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    require: true,
    default: "Male",
  },
  accountStatus: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive", "Delete"],
  },
  phoneNO: {
    type: Number,
    //require: true,
    // unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  profile: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Profile",
},
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
  ],
  image: {
    type: String,
    require: true,
    trim: true,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
