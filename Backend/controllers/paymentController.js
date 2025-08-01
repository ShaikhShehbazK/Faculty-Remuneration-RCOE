const Faculty = require("../models/faculty");
const Subject = require("../models/subjects");
const Payment = require("../models/payment");

exports.postCreate = async (req, res) => {
  try {
    const {
      facultyId,
      semester,
      academicYear,
      subjectBreakdown, // Contains subjectId + dynamic data only: counts and rates
    } = req.body;

    // Fetch base salary from faculty
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    const baseSalary = faculty.baseSalary || 0;
    const travelAllowance = faculty.travelAllowance || 0;

    let totalRemuneration = 0;

    const updatedSubjectBreakdown = [];

    for (const subjectItem of subjectBreakdown) {
      const subject = await Subject.findById(subjectItem.subjectId);
      if (!subject) continue;

      const updated = {
        subjectId: subject._id,
        termTestAssessment: {},
        oralPracticalAssessment: {},
        paperChecking: {},
        subjectTotal: 0,
      };

      let subjectTotal = 0;

      // 💠 Term Work Assessment

      if (subject.hasTermTest) {
        const { count, rate } = subjectItem.termTestAssessment || {};
        const amount = count * rate;
        updated.termTestAssessment = { applicable: true, count, rate, amount };
        subjectTotal += amount;
      }

      // 💠 Oral/Practical Assessment
      if (subject.hasPractical) {
        const { count, rate } = subjectItem.oralPracticalAssessment || {};
        const amount = count * rate;
        updated.oralPracticalAssessment = {
          applicable: true,
          count,
          rate,
          amount,
        };
        subjectTotal += amount;
      }

      // 💠 Semester Exam / Paper Checking
      if (subject.hasSemesterExam) {
        const { count = 0, rate = 0 } = subjectItem.paperChecking || {};
        const amount = count * rate;
        updated.paperChecking = { applicable: true, count, rate, amount };
        subjectTotal += amount;
      }

      updated.subjectTotal = subjectTotal;
      updatedSubjectBreakdown.push(updated);
      totalRemuneration += subjectTotal;
    }

    const totalAmount = baseSalary + travelAllowance + totalRemuneration;

    const payment = new Payment({
      facultyId,
      semester,
      academicYear,
      baseSalary,
      travelAllowance,
      subjectBreakdown: updatedSubjectBreakdown,
      totalRemuneration,
      totalAmount,
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    console.error("Error calculating payment:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
