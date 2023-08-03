const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");
const Course = require("../models/Courses");


exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const categoryDetails = await Category.create({
      Name: name,
    });

    if (categoryDetails) {
      return res.status(200).json({
        success: true,
        message: "Category created..",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Category not created..",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while creating category",
    });
  }
};

exports.showCategory = async (req, res) => {
  try {
    const categoryDetails = await Category.find({ categoryStatus: "Active" });
   
    return res.status(200).json({
      success: true,
      message: "",
      categoryDetails,
    });
  } catch (error) {
    console.log("Something went wrong in show Category controller ");
    return res.status(401).json({
      success: false,
      message: "Something went wrong while show category",
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();

    if (!selectCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }

    //get coursesfor different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    //get top 10 selling courses
    const topSelling = await Course.aggregate([
      {
        $match: {
          category: new mongoose.Types.ObjectId(categoryId),
        },
      },
      {
        $group: {
          _id: null,
          topCourse: { $avg: "$courses" },
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      data: {
        selectCategory,
        differentCategories,
        topSelling,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
