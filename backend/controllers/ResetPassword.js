
const User = require("../models/User")
exports.resetPassword = async (req , res)=> {

    try {
        const email = req.body;

        const user = await User.findOne(email);
        if(!user) {
            return res.status(401).json({
                succuss : false,
                message : "Please Enter valid email"
            });
        }
    }catch(e) {
        return res.status(500).json({
            succuss : false,
            message:'Something went wrong while sending reset pwd mail' 
        })
    }
   
}