const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinay = async (file, folder, height, quality) => {
  const options = { folder };
console.log(`Inside file upload`);
  if (height) {
    options.quality = height;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
