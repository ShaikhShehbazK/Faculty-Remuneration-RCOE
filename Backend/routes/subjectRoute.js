const express = require("express");
const subjectRouter = express.Router();
const subjectController = require("../controllers/subjectController");
const Subject = require("../models/subjects");
const isAdmin = require("../controllers/isAdmin");

// ✅ GET all subjects (optionally filtered by semester or department)
subjectRouter.get("/getList", isAdmin, subjectController.getSubjects);

// ✅ POST create new subject
subjectRouter.post("/create", isAdmin, subjectController.postCreate);

// ✅ PUT update subject
subjectRouter.put("/update/:id", isAdmin, subjectController.putUpdate);

// ✅ DELETE subject
subjectRouter.delete("/delete/:id", isAdmin, subjectController.delete);

// POST /api/admin/subjects/bulk — Create multiple subjects
subjectRouter.post("/bulk", isAdmin, subjectController.createBulk);

module.exports = subjectRouter;
