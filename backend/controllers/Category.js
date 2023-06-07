const categoryModel = require("../models/Category")

exports.createCategory = async (req, res) => {

    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const categoryDetails = await Tag.create({
            name: name,
        });

        if (categoryDetails) {
            return res.status(200).json({
                success: true,
                message: "Category created..",
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Category not created.."
            })
        }

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while creating category",
        });
    }
}


exports.showCategory = async (req, res) => {
    try {

        const categoryDetails = categoryModel.find({"categoryStatus" : "Active"});``
        return res.status(200).json({
            success: true,
            message: "",
            categoryDetails
        })
    } catch (error) {
        console.log("Something went wrong in show Category controller ");
        return res.status(401).json({
            success: false,
            message: "Something went wrong while show category",
        });
    }
}