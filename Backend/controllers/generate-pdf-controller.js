// generate-pdf-controller.js
const Faculty = require("../models/faculty");
const Subject = require("../models/subjects");
const Payment = require("../models/payment");
const PDFDocument = require("pdfkit");
const moment = require("moment");
const path = require("path");
const { toWords } = require("number-to-words");
//new version
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
    // 💠 HEADER WITH LOGO & COLLEGE (Enhanced)
    // =============================
    const logoPath = path.join(__dirname, "../public/logo.jpg");
    doc
      .rect(40, 25, 530, 90)
      .fillAndStroke("#f5f7fa", "#2c3e50")
      .fillColor("black");

    doc.image(logoPath, 55, 35, { width: 60, align: "left" });

    doc
      .fontSize(20)
      .fillColor("#2c3e50")
      .font("Helvetica-Bold")
      .text("RIZVI EDUCATION SOCIETY", 0, 40, { align: "center" })
      .fontSize(15)
      .font("Helvetica-Bold")
      .text("Rizvi College of Engineering", { align: "center" })
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#34495e")
      .text("Approved by AICTE | Affiliated to University of Mumbai", {
        align: "center",
      })
      .text("Off Carter Road, Bandra (W), Mumbai - 400050", {
        align: "center",
      });

    doc
      .moveTo(40, 120)
      .lineTo(570, 120)
      .lineWidth(2)
      .strokeColor("#2c3e50")
      .stroke();

    // =============================
    // 🎓 Faculty Details (Enhanced as Table)
    // =============================
    doc.moveDown(1.5).fontSize(11);
    const leftX = 50;
    const rightX = 320;
    const spacing = 20;
    let y = 130;

    // Draw a light background box for faculty details
    doc
      .rect(40, y - 8, 530, 90)
      .fillAndStroke("#eaf6fb", "#b2bec3")
      .fillColor("black");

    doc
      .font("Helvetica-Bold")
      .fillColor("#2c3e50")
      .text("Faculty Name:", leftX, y);
    doc
      .font("Helvetica")
      .fillColor("black")
      .text(payment.facultyId.name, leftX + 110, y);
    doc
      .font("Helvetica-Bold")
      .fillColor("#2c3e50")
      .text("Semester:", rightX, y);
    doc
      .font("Helvetica")
      .fillColor("black")
      .text(payment.semester, rightX + 90, y);

    y += spacing;
    doc
      .font("Helvetica-Bold")
      .fillColor("#2c3e50")
      .text("Department:", leftX, y);
    doc
      .font("Helvetica")
      .fillColor("black")
      .text(payment.facultyId.department, leftX + 110, y);
    doc
      .font("Helvetica-Bold")
      .fillColor("#2c3e50")
      .text("Academic Year:", rightX, y);
    doc
      .font("Helvetica")
      .fillColor("black")
      .text(payment.academicYear, rightX + 90, y);

    y += spacing;
    doc
      .font("Helvetica-Bold")
      .fillColor("#2c3e50")
      .text("Designation:", leftX, y);
    doc
      .font("Helvetica")
      .fillColor("black")
      .text(payment.facultyId.designation || "Faculty", leftX + 110, y);
    doc
      .font("Helvetica-Bold")
      .fillColor("#2c3e50")
      .text("Generated Date:", rightX, y);
    doc
      .font("Helvetica")
      .fillColor("black")
      .text(moment().format("DD-MM-YYYY"), rightX + 90, y);

    y += spacing;
    doc.font("Helvetica-Bold").fillColor("#2c3e50").text("Email:", leftX, y);
    doc
      .font("Helvetica")
      .fillColor("black")
      .text(payment.facultyId.email, leftX + 110, y);

    doc.moveDown(2);

    // =============================
    // 📋 Subject Breakdown Table (Enhanced)
    // =============================
    doc.moveDown(1);
    const tableTopY = doc.y;
    const tableLeftX = 50;
    const tableColWidths = [40, 270, 160];
    const tableHeaderBg = "#d1f2eb";
    const tableRowBg = "#f8f9f9";
    const tableBorder = "#b2bec3";

    // Draw table header background
    doc
      .rect(
        tableLeftX,
        tableTopY,
        tableColWidths[0] + tableColWidths[1] + tableColWidths[2],
        24
      )
      .fillAndStroke(tableHeaderBg, tableBorder);

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor("#117864")
      .text("No.", tableLeftX + 8, tableTopY + 6, {
        width: tableColWidths[0] - 8,
        align: "left",
      })
      .text("Subject", tableLeftX + tableColWidths[0] + 8, tableTopY + 6, {
        width: tableColWidths[1] - 16,
        align: "left",
      })
      .text(
        "Amount (Rs.)",
        tableLeftX + tableColWidths[0] + tableColWidths[1] + 8,
        tableTopY + 6,
        { width: tableColWidths[2] - 16, align: "right" }
      );

    let yTable = tableTopY + 24;
    let totalBreakdown = 0;

    payment.subjectBreakdown.forEach((entry, index) => {
      const subjectName = entry.subjectId.name;
      const subjectAmount = entry.subjectTotal;
      totalBreakdown += subjectAmount;

      // Alternate row background
      if (index % 2 === 0) {
        doc
          .rect(
            tableLeftX,
            yTable,
            tableColWidths[0] + tableColWidths[1] + tableColWidths[2],
            22
          )
          .fillAndStroke(tableRowBg, tableBorder);
      } else {
        doc
          .rect(
            tableLeftX,
            yTable,
            tableColWidths[0] + tableColWidths[1] + tableColWidths[2],
            22
          )
          .strokeColor(tableBorder)
          .stroke();
      }

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor("black")
        .text(`${index + 1}`, tableLeftX + 8, yTable + 6, {
          width: tableColWidths[0] - 8,
          align: "left",
        })
        .text(subjectName, tableLeftX + tableColWidths[0] + 8, yTable + 6, {
          width: tableColWidths[1] - 16,
          align: "left",
        })
        .text(
          `Rs. ${subjectAmount.toFixed(2)}`,
          tableLeftX + tableColWidths[0] + tableColWidths[1] + 8,
          yTable + 6,
          { width: tableColWidths[2] - 16, align: "right" }
        );

      yTable += 22;
    });

    // Draw table border
    doc
      .rect(
        tableLeftX,
        tableTopY,
        tableColWidths[0] + tableColWidths[1] + tableColWidths[2],
        yTable - tableTopY
      )
      .lineWidth(1)
      .strokeColor(tableBorder)
      .stroke();

    doc.moveDown(2);

    // =============================
    // 💵 Salary Breakdown (Enhanced)
    // =============================
    const salaryBoxY = doc.y;
    doc
      .rect(50, salaryBoxY, 500, 60)
      .fillAndStroke("#fef9e7", "#f7ca18")
      .fillColor("black");

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor("#b9770e")
      .text("Base Salary:", 60, salaryBoxY + 10)
      .font("Helvetica")
      .fillColor("black")
      .text(`Rs. ${payment.baseSalary.toFixed(2)}`, 180, salaryBoxY + 10)
      .font("Helvetica-Bold")
      .fillColor("#b9770e")
      .text("Travel Allowance:", 60, salaryBoxY + 28)
      .font("Helvetica")
      .fillColor("black")
      .text(`Rs. ${payment.travelAllowance.toFixed(2)}`, 180, salaryBoxY + 28)
      .font("Helvetica-Bold")
      .fillColor("#b9770e")
      .text("Duties Total:", 320, salaryBoxY + 10)
      .font("Helvetica")
      .fillColor("black")
      .text(
        `Rs. ${payment.totalRemuneration.toFixed(2)}`,
        440,
        salaryBoxY + 10
      );

    doc.moveDown(3);

    // 💰 Total Box (Enhanced)
    const boxY = doc.y;
    doc
      .rect(50, boxY, 500, 36)
      .fillAndStroke("#d4efdf", "#229954")
      .fillColor("black");

    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#229954")
      .text("Total :", 60, boxY + 10)
      .font("Helvetica-Bold")
      .fillColor("#145a32")
      .text(`Rs. ${payment.totalAmount.toFixed(2)}`, 400, boxY + 10, {
        width: 130,
        align: "right",
      });

    doc.fillColor("black");

    // =============================
    // 🔤 Amount in Words (Enhanced)
    // =============================
    const amountWords = toWords(payment.totalAmount).toUpperCase();
    doc
      .moveDown(2)
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#2e4053")
      .text(`Amount in words:`, 50)
      .font("Helvetica")
      .fillColor("black")
      .text(`${amountWords} ONLY`, 180);

    // =============================
    // ✅ Footer (Enhanced)
    // =============================
    doc.moveDown(2);

    // Payment Mode
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#2874a6")
      .text("Payment Mode:", 50, doc.y)
      .font("Helvetica")
      .fillColor("black")
      .text("NEFT/UPI", 150, doc.y - 15);

    // For Principal
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#7d6608")
      .text("For Principal", 0, doc.y - 15, { align: "right" });

    // Note
    doc
      .moveDown(2)
      .fontSize(9)
      .fillColor("#616a6b")
      .text("Note: This is a system-generated slip. Signature not required.", {
        align: "center",
      });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating PDF.");
  }
};
