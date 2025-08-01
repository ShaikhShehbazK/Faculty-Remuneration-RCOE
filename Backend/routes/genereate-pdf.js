// routes/paymentRoutes.js
const express = require("express");
const pdfController = require("../controllers/generate-pdf-controller");
const generatePDF = express.Router();

generatePDF.get("/generate-pdf/:paymentId", pdfController.getPDF);

module.exports = generatePDF;
