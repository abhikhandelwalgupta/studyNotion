const mailSender = require("../util/mailSender");

exports.contentSave = async (req, res) => {
  try {
   
    const { firstName, lastName, email, phoneNo, message } = req.body;
    const supportEmail = "abhishekkhandelwl1212@gmail.com";

    await mailSender(
      email,
      "Study Notion",
      "Thankyou for contact us. Our team will contact you shortly."
    );

    const contantFromData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNo: phoneNo,
      message: message,
    };

    await mailSender(supportEmail, "Some One want to content", contantFromData);

    return res.status(200).json({
      success: true,
      message: "Thankyou for contact us.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
