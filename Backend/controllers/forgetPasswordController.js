const Admin = require("../models/admin");
const Faculty = require("../models/faculty");
const bcrypt = require("bcryptjs");
const axios = require("axios");

// ==============================
// HARDCODED FOR NOW (change to env in production)
// ==============================
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_NAME = "RemuneTrack";

// ==============================
// SEND OTP EMAIL FUNCTION
// ==============================
async function sendOtpEmail(email, otp) {
  return axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email }],
      subject: "RemuneTrack Password Reset OTP",
      htmlContent: `<h2>Your OTP is ${otp}</h2><p>Valid for 10 minutes.</p>`
    },
    {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
  );
}

// ==============================
// FORGOT PASSWORD
// ==============================
exports.forgotPassword = async (req, res) => {
  try {
    const { email, role } = req.body;
    const Model = role === "admin" ? Admin : Faculty;

    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
    user.resetOTPAttempts = 0;
    await user.save();

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("OTP Send Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// ==============================
// RESET PASSWORD
// ==============================
exports.resetPassword = async (req, res) => {
  try {
    const { email, role, otp, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const Model = role === "admin" ? Admin : Faculty;
    const user = await Model.findOne({ email });

    if (!user || !user.resetOTP)
      return res.status(400).json({ message: "OTP not requested" });

    if (user.resetOTPAttempts >= 5)
      return res.status(403).json({ message: "Too many attempts. Try later." });

    if (Date.now() > user.resetOTPExpiry)
      return res.status(400).json({ message: "OTP expired" });

    if (user.resetOTP !== otp) {
      user.resetOTPAttempts++;
      await user.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOTP = null;
    user.resetOTPExpiry = null;
    user.resetOTPAttempts = 0;
    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.error("Reset Error:", error.message);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

