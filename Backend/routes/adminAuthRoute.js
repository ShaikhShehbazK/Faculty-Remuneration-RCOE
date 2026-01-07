const express = require("express");
const adminAuthRouter = express.Router();
const adminAuth = require("../controllers/adminAuth");
const { jwtAuthMiddleware } = require("../jwt");
const isAdmin = require("../controllers/isAdmin");

adminAuthRouter.post(
  "/add-admin",
  jwtAuthMiddleware,
  isAdmin,
  adminAuth.postAddAdmin
);
adminAuthRouter.post("/login", adminAuth.postLogin);
adminAuthRouter.post("/logout", adminAuth.postLogout);

module.exports = adminAuthRouter;
