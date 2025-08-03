const express = require("express");
const forgetPasswordRouter = express.Router();
const forgetPasswordController = require("../controllers/forgetPasswordController");

forgetPasswordRouter.post(
  "/forgot-password",
  forgetPasswordController.forgotPassword
);
forgetPasswordRouter.post(
  "/reset-password/:token",
  forgetPasswordController.resetPassword
);

module.exports = forgetPasswordRouter;
