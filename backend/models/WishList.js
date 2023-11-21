const mongoose = require("mongoose")

const wishListSchema = mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    Courses: 
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "course",
        }]
    
})
module.exports = mongoose.model("WishList" , wishListSchema)