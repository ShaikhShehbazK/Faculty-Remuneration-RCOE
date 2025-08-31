const express = require("express");
const amountPayRouter = express.Router();
const amountPayController = require("../controllers/amountPayController");
const isAdmin = require("../controllers/isAdmin");
const { jwtAuthMiddleware } = require("../jwt");

amountPayRouter.post(
  "/make-payment/:paymentId",
  jwtAuthMiddleware,
  isAdmin,
  amountPayController.amountPay
);

module.exports = amountPayRouter;
