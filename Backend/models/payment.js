// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },

    semester: { type: Number, required: true },
    academicYear: { type: String, required: true }, // e.g., "2024–25"

    // Copied from Faculty model at generation time
    //   baseSalary: { type: Number, required: true },

    subjectBreakdown: [
      {
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },

        termTestAssessment: {
          applicable: { type: Boolean, default: false },
          copiesChecked: { type: Number, default: 0 },
          ratePerCopy: { type: Number, default: 0 },
          amount: { type: Number, default: 0 },
        },

        oralPracticalAssessment: {
          applicable: { type: Boolean, default: false },
          copiesChecked: { type: Number, default: 0 },
          ratePerCopy: { type: Number, default: 0 },
          amount: { type: Number, default: 0 },
        },

        paperChecking: {
          applicable: { type: Boolean, default: false },
          copiesChecked: { type: Number, default: 0 },
          ratePerCopy: { type: Number, default: 0 },
          amount: { type: Number, default: 0 },
        },

        subjectTotal: { type: Number, default: 0 },
      },
    ],

    travelAllowance: { type: Number, default: 0 },

    // ✅ Sum of duties only (from subjectBreakdown)
    totalRemuneration: { type: Number, required: true },

    // ✅ Sum of baseSalary + travelAllowance + totalRemuneration
    totalAmount: { type: Number, required: true },

    status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
    paidDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
