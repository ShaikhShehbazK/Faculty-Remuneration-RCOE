const express = require("express");
const paymentRouter = express.Router();
const paymentController = require("../controllers/paymentController");

// Payment creation
paymentRouter.post("/create", paymentController.postCreate);

//Update payment
paymentRouter.put("/:paymentId", paymentController.putUpdate);

// Get all payments
paymentRouter.get("/getAll", paymentController.getAllPayments);

// Get single payment
// For all academic years of a faculty
paymentRouter.get(
  "/getSinglePayment/:facultyId",
  paymentController.getSinglePayment
);

// Get single payment
// For all subjects of a faculty in a year
paymentRouter.get(
  "/getSinglePayment/:facultyId/:academicYear",
  paymentController.getSinglePayment
);

// Get single payment
// For one subject of a faculty
paymentRouter.get(
  "/getSinglePayment/:facultyId/:subjectId/:academicYear",
  paymentController.getSinglePayment
);

// Faculty data endpoints
paymentRouter.get("/faculty", paymentController.getAllFaculty);
paymentRouter.get("/faculty/:facultyId", paymentController.getFacultyById);
paymentRouter.get(
  "/faculty/:facultyId/semesters",
  paymentController.getFacultySemesters
);
paymentRouter.get(
  "/faculty/:facultyId/semester/:semester/year/:academicYear/semType/:semesterType/subjects",
  paymentController.getFacultySubjectsBySemester
);

module.exports = paymentRouter;
