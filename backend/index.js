const express = require("express");
const app = express();
const dbConnect = require("../backend/config/dbConfig");
require("dotenv").config();
const route = require("./routes/routes");
const cookieParser = require("cookie-parser");

const portNo = process.env.PORT || 5000;
dbConnect.connect();
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", route);
app.get("/", (req, res) => {
  res.send("Server is running.. ");
});
app.listen(portNo, () => {
  console.log(`Server is running on ${portNo}`);
});
