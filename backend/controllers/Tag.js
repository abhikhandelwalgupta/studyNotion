const Tag = require("../models/Tag");

exports.createTag = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    console.log(req.body);
    if (!name || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const tagDetais = await Tag.create({
      name: name,
      description: description,
    
    });

    if (tagDetais) {
      return res.status(200).json({
        success: true,
        message: "Tag Successfully created ",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Something went wrong while creating tag. ",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.showAlltags = async (req, res) => {
  try {
    const allTages = await Tag.find({});
    res.status(200).json({
      success: true,
      message: "Successfully Fetch.. ",
      allTages,
    });
  } catch (error) {
    console.log("Something went wrong in show tags controller ");
    return res.status(401).json({
      success: false,
      message: "Something wend wrong",
    });
  }
};
