// models/Faculty.js
const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, default: "faculty" },
    baseSalary: { type: Number, required: true },
    travelAllowance: { type: Number, required: true },
    designation: {
      type: String,
      enum: [
        "Assistant Professor",
        "Associate Professor",
        "Professor",
        "External Examiner",
        "HoD",
      ],
      required: true,
    },

    assignedSubjects: [
      {
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
        name: String,
        semester: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", facultySchema);
