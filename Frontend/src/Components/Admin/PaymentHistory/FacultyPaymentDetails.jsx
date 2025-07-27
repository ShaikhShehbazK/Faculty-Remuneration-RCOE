import { useState } from "react";
import { Container, Row, Col, Card, Table, Button, Offcanvas } from "react-bootstrap";
import {
  FaPrint,
  FaFileExport,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";
import AdminSidebar from "../../AdminSidebar";
import { useNavigate } from "react-router-dom";

function FacultyPaymentDetails() {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarOpen = () => setShowSidebar(true);
  const handleSidebarClose = () => setShowSidebar(false);
  const navigate = useNavigate();

  const paymentOverview = {
    facultyName: 'Prof. Asif',
    paymentDate: 'July 15, 2024',
    totalAmount: '₹97,500',
    status: 'Completed',
    referenceNumber: 'TXN-20240715-EH-001',
    paymentMethod: 'Direct Deposit',
  };

  const paymentComponents = [
    {
      subject: 'Engineering Mathematics-III',
      termWork: '200 (₹50)',
      oral: '100 (₹75)',
      semester: '50 (₹100)',
      semesterType: 'Sem 3 2023',
      total: '₹22,500',
    },
    {
      subject: 'Computer Networks',
      termWork: '150 (₹50)',
      oral: '75 (₹75)',
      semester: '40 (₹100)',
      semesterType: 'Sem 5 2023',
      total: '₹15,250',
    },
    {
      subject: 'Analysis Of Algorithms',
      termWork: '180 (₹50)',
      oral: '90 (₹75)',
      semester: '45 (₹100)',
      semesterType: 'Sem 4 2023',
      total: '₹19,750',
    },
  ];

  const remunerationSummary = [
    { component: 'Travel Allowance', amount: '₹1000' },
    { component: 'Base Salary', amount: '₹30,000' },
    { component: 'Calculated Remuneration', amount: '₹57,500' },
    { component: 'Total Remuneration', amount: '₹97,500' },
  ];

  const getStatusBadge = (status) => {
    const statusClass = {
      Completed: 'bg-success text-white',
      'In Progress': 'bg-info text-white',
      Pending: 'bg-warning text-dark',
      Failed: 'bg-danger text-white',
    };
    return (
      <span className={`badge rounded-pill px-3 py-2 ${statusClass[status] || 'bg-secondary'}`}>{status}</span>
    );
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <Row>
        {/* Sidebar: Offcanvas for mobile */}
        <Offcanvas show={showSidebar} onHide={handleSidebarClose} className="d-md-none" backdrop>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {<AdminSidebar />}
            <div className="text-muted small mt-4">Role: Payment Officer</div>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Sidebar: static for desktop */}
        <Col md={3} className="d-none d-md-block">
          <Card className="shadow-sm border-0 rounded-4 p-3 sticky-top" style={{ minHeight: "90vh" }}>
            {<AdminSidebar />}
            <div className="text-muted small mt-4">Role: Payment Officer</div>
          </Card>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          {/* Mobile Header: Back Button, Title, Print Button, Export Button*/}
          <div className="d-md-none mb-3 d-flex align-items-center justify-content-between gap-2">
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                className="d-flex align-items-center gap-2"
                onClick={() => navigate("/admin/paymenthistory")}
              >
                <FaArrowLeft /> Back
              </Button>
              <h4 className="fw-bold">Payment Details</h4>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" className="d-flex align-items-center gap-2">
                <FaFileExport /> Export
              </Button>
              <Button variant="primary" className="d-flex align-items-center gap-2">
                <FaPrint /> Print
              </Button>
            </div>
          </div>

          {/* Desktop Header: Back Button, Title/Desc, Print Button, Export Button */}
          <div className="d-none d-md-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <Button
                variant="outline-secondary"
                className="d-flex align-items-center gap-2"
                onClick={() => navigate("/admin/paymenthistory")}
              >
                <FaArrowLeft /> Back
              </Button>
              <div>
                <h2 className="fw-bold mb-1">Payment Details</h2>
                <p className="text-primary mb-0">View detailed information about a specific payment entry.</p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" className="d-flex align-items-center gap-2">
                <FaFileExport /> Export
              </Button>
              <Button variant="primary" className="d-flex align-items-center gap-2">
                <FaPrint /> Print
              </Button>
            </div>
          </div>

          {/* Payment Overview */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-semibold mb-3">Payment Overview</h5>
            <Row>
              <Col md={6}>
                <p><strong>Faculty Name:</strong> {paymentOverview.facultyName}</p>
                <p><strong>Total Amount:</strong> {paymentOverview.totalAmount}</p>
                <p><strong>Reference Number:</strong> {paymentOverview.referenceNumber}</p>
              </Col>
              <Col md={6}>
                <p><strong>Payment Date:</strong> {paymentOverview.paymentDate}</p>
                <p><strong>Status:</strong> {getStatusBadge(paymentOverview.status)}</p>
                <p><strong>Payment Method:</strong> {paymentOverview.paymentMethod}</p>
              </Col>
            </Row>
          </Card>

          {/* Payment Components Table */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-semibold mb-3">Payment Components</h5>
            <Table bordered hover responsive striped className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Subject</th>
                  <th>Term Work Papers</th>
                  <th>Oral/Practical Papers</th>
                  <th>Semester Papers</th>
                  <th>Semester</th>
                  <th>Total Payment</th>
                </tr>
              </thead>
              <tbody>
                {paymentComponents.map((item, index) => (
                  <tr key={index}>
                    <td>{item.subject}</td>
                    <td>{item.termWork}</td>
                    <td>{item.oral}</td>
                    <td>{item.semester}</td>
                    <td>{item.semesterType}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>

          {/* Remuneration Summary Table */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-semibold mb-3">Remuneration Summary</h5>
            <Table bordered hover responsive striped className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Component</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {remunerationSummary.map((item, index) => (
                  <tr key={index}>
                    <td>{item.component}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>

        </Col>

      </Row>

    </Container>
  );
}

export default FacultyPaymentDetails;
