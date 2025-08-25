const Faculty = require("../models/faculty");
const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");
const { generateToken } = require("../jwt");
const Admin = require("../models/admin");

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res
        .status(404)
        .json({ message: "Faculty is not found or incorrect email" });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Incorrect Password" });
    }
    const payload = {
      id: faculty._id,
      email: faculty.email,
      role: faculty.role,
    };
    const token = generateToken(payload);
    res.json({ message: "login successfully", token , id: faculty._id }); // 👈 ADDed this id: faculty._id
  } catch (err) {
    console.log("Error while logging in : ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postLogout = (req, res, next) => {
  res
    .status(200)
    .json({ message: "Token deleted on client. Logout successful." });
};
