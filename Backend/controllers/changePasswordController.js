const bcrypt = require("bcryptjs");
const Faculty = require("../models/faculty");
const Admin = require("../models/admin");

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;
  const role = req.user.role;

  try {
    const Model = role === "admin" ? Admin : Faculty;
    const user = await Model.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Model.findByIdAndUpdate(userId, { password: hashedPassword });

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error changing password" });
  }
};
