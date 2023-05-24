const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinay = async (file, folder, height, quality) => {
  const options = { folder };

  if (height) {
    options.quality = height;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
