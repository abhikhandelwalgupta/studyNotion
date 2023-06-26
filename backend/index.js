const express = require("express");
const app = express();

require("dotenv").config();
const dbConnect = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {cloudinaryConnect } = require("./config/cloudinaryConnect");

const portNo = process.env.PORT || 5000;

const userRouter = require("./routes/User");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");



app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
dbConnect.connect();
cloudinaryConnect();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Server is running.. ");
});
app.listen(portNo, () => {
  console.log(`Server is running on ${portNo}`);
});
