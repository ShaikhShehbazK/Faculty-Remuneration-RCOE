exports.getRole = (req, res, next) => {
  const userData = req.user;
  res.status(200).json({ userData });
};
