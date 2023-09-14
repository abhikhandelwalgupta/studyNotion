
const Category = require("../models/Category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

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
    const categoryDetails = await Category.find({ categoryStatus: "Active" })



    return res.status(200).json({
      success: true,
      message: "",
      categoryDetails,

    });
  } catch (error) {
    console.log("Something went wrong in show Category controller ", error.message);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while show category",
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log(req.body);
    const selectCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();
    console.log(selectCategory);
    if (!selectCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }

    if (selectCategory.courses.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
        selectCategory
      })
    }

    //get coursesfor different categories 
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    const differentCategories = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec()
    console.log(differentCategories);
    //get top 10 selling courses
    const allCategories = await Category.find({ categoryStatus: "Active" }).populate({
      path: "courses",
      match: { status: "Published" },
      populate: {
        path: "instructor",
      },
    }).exec()

    const allCourses = allCategories.flatMap((category) => category.courses)
    console.log(JSON.stringify(allCourses));

    const topSelling = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
    console.log("mostSellingCourses COURSE", topSelling)
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
