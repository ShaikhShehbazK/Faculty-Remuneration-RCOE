const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Faculty = require("../models/faculty");
const Admin = require("../models/admin");
const nodemailer = require("nodemailer");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_RESET_URL = "http://localhost:5173/reset-password"; // Or your real frontend link

// Send Reset Link
exports.forgotPassword = async (req, res) => {
  const { email, role } = req.body;

  try {
    const Model = role === "admin" ? Admin : Faculty;
    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, {
      expiresIn: "15m",
    });
    const resetLink = `${FRONTEND_RESET_URL}/${token}`;
    // Send Email (for demo using ethereal)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your SMTP service
      auth: {
        user: "shahbazshaikh485@gmail.com",
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "shahbazshaikh485@gmail.com",
      to: email,
      subject: "Reset Password Link",
      html: `<p>Click to reset password: <a href="${resetLink}">Reset Password</a></p>`,
    });
    console.log(resetLink);

    if (!info.messageId) {
      // Fallback if nodemailer didn't return a proper ID
      return res.status(500).json({ error: "Email failed to send." });
    }

    console.log("✅ Email sent: ", info.messageId);

    // res.json({ message: "Reset link sent to email" });
    res.json({
      message: "Reset link generated",
      resetLink: `${FRONTEND_RESET_URL}/${token}`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error sending reset link");
  }
};

// Handle Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const Model = decoded.role === "admin" ? Admin : Faculty;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Model.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
