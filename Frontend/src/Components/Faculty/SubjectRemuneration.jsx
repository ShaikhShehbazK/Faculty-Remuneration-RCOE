import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  FaPrint,
  FaFileInvoiceDollar,
  FaDownload,
  FaEye,
  FaCalculator,
  FaMoneyBillWave,
  FaInfoCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
/* import api from "../../../utils/api"; */

function SubjectRemuneration() {
  const { id, subjectId, academicYear } = useParams(); // id = facultyId
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const header = {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Pass the token in Authorization header
    },
  };
  useEffect(() => {
    const facultyId = localStorage.getItem("facultyId");
    const fetchFacultyDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://rcoe-remune-track.onrender.com/admin/payment/getSinglePayment/${facultyId}/${subjectId}/${academicYear}`
        );
        console.log(
          "Fetched Subject Payments for SubjectRemuneration page for Faculty :"
        );
        console.log(res.data);

        // Extract single subject breakdown from API
        const breakdownItem = res.data.breakdown[0]; // Only 1 because subjectId was passed

        // Prepare frontend structure
        setSubjectData({
          facultyName: res.data.facultyName,
          department: res.data.department,
          subjectName: breakdownItem.subjectName,
          academicYear: breakdownItem.academicYear,
          semesterType: breakdownItem.semesterType,
          semester: breakdownItem.semester,
          total: breakdownItem.subjectTotal,
          referenceNumber: `REF-${Date.now()}`,
          breakdown: [
            {
              component: "Term Work Papers Assessed",
              rate: breakdownItem.termTestAssessment.rate,
              quantity: breakdownItem.termTestAssessment.count,
              amount: breakdownItem.termTestAssessment.amount,
              color: "primary",
            },
            {
              component: "Oral/Practicals",
              rate: breakdownItem.oralPracticalAssessment.rate,
              quantity: breakdownItem.oralPracticalAssessment.count,
              amount: breakdownItem.oralPracticalAssessment.amount,
              color: "success",
            },
            {
              component: "Semester Papers Assessed",
              rate: breakdownItem.paperChecking.rate,
              quantity: breakdownItem.paperChecking.count,
              amount: breakdownItem.paperChecking.amount,
              color: "info",
            },
          ],
        });
      } catch (err) {
        console.error("❌ Error fetching remuneration:", err);
        setError(
          err.response?.data?.message || "Failed to load remuneration details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyDetails();
  }, [id, subjectId]);

  const handleGoBack = () => {
    navigate(`/faculty/payments`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="p-4">
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={handleGoBack}>
          <FaArrowLeft /> Back
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Desktop Header */}
      <div className="d-none d-md-flex d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center gap-2"
            onClick={handleGoBack}
          >
            <FaArrowLeft /> Back
          </Button>
          <div>
            <h2 className="mb-1 fw-bold">Remuneration Details</h2>
            <p className="text-muted mb-0">
              Detailed breakdown of remuneration for the subject
            </p>
          </div>
        </div>
        {/* <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            className="d-flex align-items-center gap-2"
          >
            <FaDownload /> Export
          </Button>
          <Button variant="primary" className="d-flex align-items-center gap-2">
            <FaPrint /> Print
          </Button>
        </div> */}
      </div>

      {/* Mobile Header */}
      <div className="d-md-none d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center gap-2"
            onClick={handleGoBack}
          >
            <FaArrowLeft /> Back
          </Button>
          <div>
            <h3 className="mb-1 fw-bold">Remuneration Details</h3>
          </div>
        </div>
        {/* <div className="d-flex flex-column gap-2">
          <Button
            variant="outline-primary"
            className="d-flex align-items-center gap-2"
          >
            <FaDownload /> Export
          </Button>
          <Button variant="primary" className="d-flex align-items-center gap-2">
            <FaPrint /> Print
          </Button>
        </div> */}
      </div>

      {/* Subject Information Card */}
      <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="bg-primary bg-opacity-10 p-3 rounded-3">
            <FaCalculator className="text-primary" size={24} />
          </div>
          <div>
            <h5 className="fw-bold mb-1">Subject Information</h5>
            <small className="text-muted">
              Basic details about the subject and faculty
            </small>
          </div>
        </div>

        <Row>
          <Col md={6} className="mb-3">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaInfoCircle className="text-muted" size={16} />
              <span className="text-muted small fw-medium">Subject Name</span>
            </div>
            <h6 className="fw-bold mb-0">{subjectData.subjectName}</h6>
          </Col>
          <Col md={6} className="mb-3">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaInfoCircle className="text-muted" size={16} />
              <span className="text-muted small fw-medium">Academic Year</span>
            </div>
            <h6 className="fw-bold mb-0">{subjectData.academicYear}</h6>
          </Col>
          <Col md={6} className="mb-3">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaInfoCircle className="text-muted" size={16} />
              <span className="text-muted small fw-medium">Semester Type</span>
            </div>
            <h6 className="fw-bold mb-0">{subjectData.semesterType}</h6>
          </Col>
          <Col md={6} className="mb-3">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaInfoCircle className="text-muted" size={16} />
              <span className="text-muted small fw-medium">Semester</span>
            </div>
            <Badge bg="info" className="px-3 py-2 fs-6">
              Semester {subjectData.semester}
            </Badge>
          </Col>
          <Col md={6} className="mb-3">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaInfoCircle className="text-muted" size={16} />
              <span className="text-muted small fw-medium">Faculty Member</span>
            </div>
            <h6 className="fw-bold mb-0">{subjectData.facultyName}</h6>
          </Col>
          <Col md={6} className="mb-3">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaInfoCircle className="text-muted" size={16} />
              <span className="text-muted small fw-medium">Department</span>
            </div>
            <h6 className="fw-bold mb-0">{subjectData.department}</h6>
          </Col>
        </Row>
      </Card>

      {/* Remuneration Breakdown Card */}
      <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="bg-success bg-opacity-10 p-3 rounded-3">
            <FaMoneyBillWave className="text-success" size={24} />
          </div>
          <div>
            <h5 className="fw-bold mb-1">Remuneration Breakdown</h5>
            <small className="text-muted">
              Detailed calculation of each component
            </small>
          </div>
        </div>

        <Table bordered hover responsive striped className="mt-3 align-middle">
          <thead className="table-light">
            <tr>
              <th className="fw-bold">Component</th>
              <th className="fw-bold text-center">Rate (₹)</th>
              <th className="fw-bold text-center">Quantity</th>
              <th className="fw-bold text-center">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {subjectData.breakdown.map((item, index) => (
              <tr key={index}>
                <td className="fw-medium">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className={`bg-${item.color} bg-opacity-10 p-2 rounded-2`}
                    >
                      <FaCalculator
                        className={`text-${item.color}`}
                        size={14}
                      />
                    </div>
                    {item.component}
                  </div>
                </td>
                <td className="text-center">
                  <Badge bg="secondary" className="px-3 py-2">
                    ₹{item.rate}
                  </Badge>
                </td>
                <td className="text-center fw-bold">{item.quantity}</td>
                <td className="text-center">
                  <span className="fw-bold text-success">
                    ₹{item.amount.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Total Remuneration Card */}
      <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="bg-warning bg-opacity-10 p-3 rounded-3">
            <FaFileInvoiceDollar className="text-warning" size={24} />
          </div>
          <div>
            <h5 className="fw-bold mb-1">Payment Summary</h5>
            <small className="text-muted">
              Final calculation and payment details
            </small>
          </div>
        </div>

        <Row className="align-items-end">
          {/* Display Of Reference Number
          <Col md={6}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaInfoCircle className="text-muted" size={16} />
              <span className="text-muted small fw-medium">
                Reference Number
              </span>
            </div>
            <h6 className="fw-bold mb-0 text-primary">
              {subjectData.referenceNumber}
            </h6>
          </Col> 
          */}

          <Col md={6} className="text-md-end">
            <div className="d-flex align-items-center gap-2 mb-2 justify-content-md-end">
              <FaMoneyBillWave className="text-success" size={16} />
              <span className="text-muted small fw-medium">
                Total Remuneration
              </span>
            </div>
            <h3 className="fw-bold text-success mb-0">
              ₹{subjectData.total.toLocaleString()}
            </h3>
          </Col>
        </Row>

        {/* Buttons
         <div className="d-flex justify-content-end gap-3 mt-4">
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center gap-2"
          >
            <FaEye /> View Details
          </Button>
          <Button variant="success" className="d-flex align-items-center gap-2">
            <FaFileInvoiceDollar /> Generate Invoice
          </Button>
        </div> */}
      </Card>

      {/* Footer */}
      <footer className="text-center text-muted mt-4 small">
        <hr />
        <div>
          Role: <span className="fw-bold">Admin</span> &nbsp;|&nbsp; &copy;{" "}
          {new Date().getFullYear()} Rizvi College of Engineering
        </div>
      </footer>
    </Container>
  );
}

export default SubjectRemuneration;
