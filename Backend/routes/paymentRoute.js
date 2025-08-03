const express = require("express");
const paymentRouter = express.Router();
const paymentController = require("../controllers/paymentController");

// Payment creation
paymentRouter.post("/create", paymentController.postCreate);

// Get all payments
paymentRouter.get("/getAll", paymentController.getAllPayments);

// Faculty data endpoints
paymentRouter.get("/faculty", paymentController.getAllFaculty);
paymentRouter.get("/faculty/:facultyId", paymentController.getFacultyById);
paymentRouter.get("/faculty/:facultyId/semesters", paymentController.getFacultySemesters);
paymentRouter.get("/faculty/:facultyId/semester/:semester/subjects", paymentController.getFacultySubjectsBySemester);

module.exports = paymentRouter;
