// generate-pdf-controller.js
const Faculty = require("../models/faculty");
const Subject = require("../models/subjects");
const Payment = require("../models/payment");
const PDFDocument = require("pdfkit");
const moment = require("moment");
const path = require("path");
const { toWords } = require("number-to-words");

exports.getPDF = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId)
      .populate("facultyId")
      .populate("subjectBreakdown.subjectId");

    if (!payment) return res.status(404).send("Payment not found");

    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const fileName = `Remuneration_Slip_${payment.facultyId.name}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    doc.pipe(res);

    // =============================
    // 💠 HEADER WITH LOGO & COLLEGE
    // =============================
    const logoPath = path.join(__dirname, "../public/logo.jpg");
    doc.image(logoPath, 50, 30, { width: 60 });

    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text("RIZVI EDUCATION SOCIETY", 120, 35, { align: "center" })
      .text("Rizvi College of Engineering", { align: "center" })
      .fontSize(10)
      .font("Helvetica")
      .text("Approved by AICTE | Affiliated to University of Mumbai", {
        align: "center",
      })
      .text("Off Carter Road, Bandra (W), Mumbai - 400050", {
        align: "center",
      });

    doc.moveDown().moveTo(40, 105).lineTo(570, 105).stroke();

    // =============================
    // 🎓 Faculty Details
    // =============================
    doc.moveDown(1.5).fontSize(11);
    const leftX = 50;
    const rightX = 320;
    const spacing = 18;
    let y = doc.y;

    doc.font("Helvetica-Bold").text("Faculty Name:", leftX, y);
    doc.font("Helvetica").text(payment.facultyId.name, leftX + 100, y);
    doc.font("Helvetica-Bold").text("Semester:", rightX, y);
    doc.font("Helvetica").text(payment.semester, rightX + 80, y);

    y += spacing;
    doc.font("Helvetica-Bold").text("Department:", leftX, y);
    doc.font("Helvetica").text(payment.facultyId.department, leftX + 100, y);
    doc.font("Helvetica-Bold").text("Academic Year:", rightX, y);
    doc.font("Helvetica").text(payment.academicYear, rightX + 80, y);

    y += spacing;
    doc.font("Helvetica-Bold").text("Designation:", leftX, y);
    doc
      .font("Helvetica")
      .text(payment.facultyId.designation || "Faculty", leftX + 100, y);
    doc.font("Helvetica-Bold").text("Generated Date:", rightX, y);
    doc.font("Helvetica").text(moment().format("DD-MM-YYYY"), rightX + 80, y);

    y += spacing;
    doc.font("Helvetica-Bold").text("Email:", leftX, y);
    doc.font("Helvetica").text(payment.facultyId.email, leftX + 100, y);

    doc.moveDown();

    // =============================
    // 📋 Subject Breakdown Table
    // =============================
    doc.moveDown(1);
    doc.font("Helvetica-Bold").fontSize(12);
    doc.text("No.", 50).text("Subject", 100).text("Amount (Rs.)", 400);
    doc
      .moveTo(40, doc.y + 5)
      .lineTo(570, doc.y + 5)
      .stroke();
    doc.font("Helvetica").fontSize(11);

    let totalBreakdown = 0;
    y = doc.y + 10;

    payment.subjectBreakdown.forEach((entry, index) => {
      const subjectName = entry.subjectId.name;
      const subjectAmount = entry.subjectTotal;
      totalBreakdown += subjectAmount;

      doc.text(`${index + 1}`, 50, y);
      doc.text(subjectName, 100, y);
      doc.text(`Rs. ${subjectAmount.toFixed(2)}`, 400, y);
      y += 20;
    });

    doc.moveDown();
    doc.text(`Base Salary       : Rs. ${payment.baseSalary.toFixed(2)}`);
    doc.text(`Travel Allowance  : Rs. ${payment.travelAllowance.toFixed(2)}`);
    doc.text(`Duties Total      : Rs. ${payment.totalRemuneration.toFixed(2)}`);

    // 💰 Total Box
    doc.moveDown();
    const boxY = doc.y;
    doc.rect(50, boxY, 500, 30).fillAndStroke("#eee", "black");
    doc.fillColor("black").font("Helvetica-Bold").fontSize(12);
    doc.text("Total :", 60, boxY + 8);
    doc
      .fillColor("green")
      .text(`Rs. ${payment.totalAmount.toFixed(2)}`, 400, boxY + 8);
    doc.fillColor("black");

    // =============================
    // 🔤 Amount in Words
    // =============================
    const amountWords = toWords(payment.totalAmount).toUpperCase();
    doc.moveDown().text(`Amount in words: ${amountWords} ONLY`);

    // ✅ Footer
    doc.moveDown().text("Payment Mode: NEFT/UPI");
    doc.text("For Principal", { align: "right" });

    doc
      .moveDown()
      .fontSize(8)
      .text("Note: This is a system-generated slip. Signature not required.", {
        align: "center",
      });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating PDF.");
  }
};
