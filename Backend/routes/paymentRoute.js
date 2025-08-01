const express = require("express");
const paymentRouter = express.Router();
const paymentController = require("../controllers/paymentController");

paymentRouter.post("/create", paymentController.postCreate);

module.exports = paymentRouter;
