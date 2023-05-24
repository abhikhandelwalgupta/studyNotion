const moogse = require("mongoose")
require("dotenv").config();


exports.connect = () => {
    moogse.connect(process.env.dbUrl , {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("Db connected...");
    }).catch( (error)=>{
        console.log("Something went wrong in db connection... "),
        console.error(error);
        process.exit(1)
    })
}
