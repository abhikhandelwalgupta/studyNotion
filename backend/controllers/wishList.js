
const WishList = require("../models/WishList");


exports.getUserWishList = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishListDetails = await WishList.find({ User: userId }).populate({
            path: "Courses"
          }).exec()
          console.log(wishListDetails);
        return res.status(200).json({
            success: true,
            wishListDetails: wishListDetails
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Something went wrong while get user wish list"
        })
    }
}


exports.addWishList = async (req, res) => {
    try {

        const { coursesId } = req.body;
        let userId = req.user.id;
        console.log(req.body);

        if (!coursesId) {
            return res.status(400).json({
                success: false,
                message: "Please enter course id"
            })
        }

        const wishListDetails = await WishList.find({ User: userId });
        let wishListAdd;
        if (!wishListDetails.length) {
            wishListAdd = await WishList.create({
                User: userId,
                Courses: coursesId
            })
        } else {

            wishListAdd = await WishList.find(
                {
                    $and: [
                        { User: userId },
                        { Courses: coursesId }
                    ]
                }
            )

            if (!wishListAdd.length) {
                wishListAdd = await WishList.findOneAndUpdate(
                    { User: userId }, {
                    $push: {
                        Courses: coursesId,
                    }
                }, { new: true }
                )
            } else {
                wishListAdd = await WishList.findOneAndUpdate(
                    { User: userId }, {
                    $pull: {
                        Courses: coursesId,
                    }
                }, { new: true })
            }
        }
        return res.status(200).json({
            success: true,
            wishListAdd
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while add  wishlist"
        })
    }
}

exports.removeWishList = async (req, res) => {
    try {

        const { coursesId } = req.body;
        const userId = req.user.id;

        if (!coursesId) {
            return res.status(400).json({
                success: false,
                message: "Please enter course id"
            })
        }

        const wishListDetails = await WishList.findOneAndUpdate({ userId: userId }, {
            $pop: {
                courses: coursesId,
            }
        }, { new: true }

        );

        return res.status(200).json({
            success: true,
            wishListDetails
        })

    } catch (error) {
        return res.state(500).json({
            success: false,
            message: "Something went wrong while remove  wishlist"
        })
    }
}