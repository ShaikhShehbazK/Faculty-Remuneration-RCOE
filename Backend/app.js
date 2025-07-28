//External Module
const express = require("express");
const cors = require("cors");
require("dotenv").config();

//local Module
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// const userRouter = require("./routes/userRoute");
// const candidateRouter = require("./routes/candidateRoute");
const facultyAuthRoute = require("./routes/facultyAuthRoute");
const adminAuthRoute = require("./routes/adminAuthRoute");
const subjectRouter = require("./routes/subjectRoute");
const facultyManagement = require("./routes/facultyManagement");

const app = express();

// app.use(
//   cors({
//     origin: "https://jwtbased-website-e-voting.netlify.app", // ✅ your frontend URL
//     credentials: true, // ✅ required for cookies
//   })
// );
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if using cookies / sessions
}));

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));



const MONGO_DB_URL = process.env.MONGO_URI;

app.use("/faculty", facultyAuthRoute);
app.use("/admin", adminAuthRoute);
app.use("/subject", subjectRouter);
app.use("/admin/faculty", facultyManagement);
// app.use(userRouter);
// app.use("/candidate", candidateRouter);

const Port = process.env.port || 3003;
mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(Port, () => {
      console.log(`server run on address http://localhost:${Port}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });
