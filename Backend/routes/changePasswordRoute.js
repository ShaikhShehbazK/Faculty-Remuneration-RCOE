const express = require("express");
const changePasswordRouter = express.Router();
const changePasswordController = require("../controllers/changePasswordController");
const { jwtAuthMiddleware } = require("../jwt");

changePasswordRouter.post(
  "/change-password",
  jwtAuthMiddleware,
  changePasswordController.changePassword
);

module.exports = changePasswordRouter;
