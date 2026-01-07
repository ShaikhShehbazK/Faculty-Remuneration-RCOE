const Faculty = require("../models/faculty");
const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");
const { generateToken } = require("../jwt");
const Admin = require("../models/admin");

exports.postAddAdmin = [
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existing = await Admin.findOne({ email });
      if (existing)
        return res.status(409).json({ error: "Admin already exists" });
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new Admin({
        name: name,
        email: email,
        password: hashedPassword,
      });

      const response = await user.save();

      res.status(200).json({ response: response });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          message: "A user with this email already exists.",
        });
      }
      console.log("Error while creating user: ", err);
    }
  },
];

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin not found or incorrect email" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Incorrect Password" });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    };
    const token = generateToken(payload);
    res.json({ message: "login successfully", token });
  }
  catch (err) {
    console.log("Error while logging in : ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postLogout = (req, res, next) => {
  res
    .status(200)
    .json({ message: "Token deleted on client. Logout successful." });
};
