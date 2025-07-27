// middleware/isAdmin.js

const isAdmin = (req, res, next) => {
  try {
    // JWT should be decoded already by auth middleware
    const user = req.user;

    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = isAdmin;
