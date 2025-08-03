const Faculty = require("../models/faculty");
const Subject = require("../models/subjects");
const bcrypt = require("bcryptjs");

exports.addFaculty = async (req, res) => {
  try {
    const subjectsInput = req.body.subjects;

    const assignedSubjects = await Promise.all(
      subjectsInput.map(async (subj) => {
        const subjectDoc = await Subject.findOne({
          name: subj.name,
          semester: subj.semester,
        });
        return {
          subjectId: subjectDoc._id,
          name: subj.name,
          semester: subj.semester,
        };
      })
    );

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const faculty = new Faculty({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      department: req.body.department,
      role: req.body.role || "faculty",
      baseSalary: req.body.baseSalary,
      travelAllowance: req.body.travelAllowance,
      designation: req.body.designation,
      assignedSubjects,
    });
    await faculty.save();
    res.status(201).json(faculty);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Faculty creation failed", details: err.message });
  }
};

exports.getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find().populate(
      "assignedSubjects.subjectId"
    );
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ error: "Failed to get faculties" });
  }
};

exports.getSingleFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate(
      "assignedSubjects.subjectId"
    );
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: "Error fetching faculty" });
  }
};

exports.editFaculty = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If password is provided, hash it before updating
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    // Handle subjects if provided
    if (updateData.subjects) {
      const assignedSubjects = await Promise.all(
        updateData.subjects.map(async (subj) => {
          const subjectDoc = await Subject.findOne({
            name: subj.name,
            semester: subj.semester,
          });
          return {
            subjectId: subjectDoc._id,
            name: subj.name,
            semester: subj.semester,
          };
        })
      );
      updateData.assignedSubjects = assignedSubjects;
    }

    const faculty = await Faculty.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate("assignedSubjects.subjectId");

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json(faculty);
  } catch (err) {
    res.status(400).json({ error: "Update failed", details: err.message });
  }
};

exports.deleteFaculty = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
