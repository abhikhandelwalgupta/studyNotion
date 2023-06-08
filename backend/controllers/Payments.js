const { instance } = require("../config/razorpay")
const Courses = require("../models/Courses")
const User = require("../models/User")
const mailSender = require("../util/mailSender")
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail")
const { default: mongoose } = require("mongoose")



exports.capturePayment = async (req, res) => {
    const { course_id } = req.body;
    const userId = req.user.id;

    if (!course_id) {
        return res.json({
            success: false,
            message: "Please provide valid course ID",
        });
    }


    let course;
    try {
        course = await Courses.findById(course_id);
        if (!course) {
            return res.json({
                success: false,
                message: "Clould not find course"
            })
        }

        const uid = new mongoose.Types.ObjectId(userId);
        if (Courses.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: 'Student is already enrolled'
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

    const amount = course.price;
    const currency = "INR";

    const option = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseID: course_id,
            userId
        }
    };

    try {
        const paymentResponse = await instance.orders.create(option);
        console.log(paymentResponse);
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.coursDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Could not initiate order"
        })
    }
}



exports.verifySignature = async (req, res) => {
    const webhookSecret = "1234678";
    const signature = req.header["x-razorpay-signature"]

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("payment is Authorised");

        const { courseId, userId } = req.body.payload.payment.entity.notes;

        try {
            const enrolledCourse = await Courses.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true },
            );
            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: 'Course not Found',
                });
            }

            console.log(enrolledCourse);

            const studentEnroll = await User.findOneAndUpdate(
                { _id: userId },
                {
                    $push: {
                        courses: courseId
                    }
                }, { new: true }
            );

            console.log(enrolledStudent);
            const emailResponse = await mailSender(enrolledStudent.email, "Congratulations from CodeHelp",
                "Congratulations, you are onboarded into new CodeHelp Course");

            console.log(emailResponse);
            return res.status(200).json({
                success: true,
                message: "Signature Verified and COurse Added",
            });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid request',
        });
    }

}