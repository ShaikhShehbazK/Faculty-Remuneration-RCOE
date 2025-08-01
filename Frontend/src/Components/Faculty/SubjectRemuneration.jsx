
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Nav, Card, Offcanvas, Badge } from "react-bootstrap";
import { FaBars, FaPrint, FaDownload, FaFileInvoiceDollar, FaArrowLeft } from "react-icons/fa";
import FacultySidebar from '../FacultySidebar';

const remunerationData = {
  subjectName: "Machine Learning",
  semester: "Odd Semester 2024",
  referenceNumber: "REF-2024-03-001",
  facultyName: "Prof. Mohd Ashfaque",
  department: "Computer Engineering",
  components: [
    {
      name: "Term Work Papers Assessed",
      rate: 50,
      quantity: 200,
      amount: 10000,
    },
    {
      name: "Oral/Practicals",
      rate: 75,
      quantity: 100,
      amount: 7500,
    },
    {
      name: "Semester Papers Assessed",
      rate: 100,
      quantity: 50,
      amount: 5000,
    },
  ],
};

function SubjectRemuneration() {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const handleSidebarOpen = () => setShowSidebar(true);
  const handleSidebarClose = () => setShowSidebar(false);

  const totalAmount = remunerationData.components.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate('/faculty/payments');
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      
      {/* Mobile Hamburger Header */}
      <div className="d-flex d-md-none align-items-center mb-3">
        <Button variant="outline-primary" className="me-2" onClick={handleSidebarOpen}>
          <FaBars size={20} />
        </Button>
        <h5 className="mb-0 fw-bold">Subject Remuneration</h5>
      </div>

      <Row>
        {/* Sidebar: Offcanvas for mobile */}
        <Offcanvas show={showSidebar} onHide={handleSidebarClose} className="d-md-none" backdrop>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <FacultySidebar />
            <div className="text-muted small mt-4">Role: Faculty Member</div>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Sidebar: static for desktop */}
        <Col md={3} className="d-none d-md-block">
          <Card
            className="shadow-sm border-0 rounded-4 p-3 sticky-top"
            style={{ minHeight: "90vh" }}
          >
            <FacultySidebar />
            <div className="text-muted small mt-4">Role: Faculty Member</div>
          </Card>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <div className="d-none d-md-block">
            <div className="d-flex align-items-center mb-3">
              <Button 
                variant="outline-primary" 
                className="me-3 d-flex align-items-center gap-2"
                onClick={handleBack}
              >
                <FaArrowLeft /> Back
              </Button>
              <h2 className="mb-0 fw-bold">Subject Remuneration Breakdown</h2>
            </div>
            <hr className="mb-4" />
          </div>
          <div className="d-md-none mb-3" />

          {/* Subject Information Card */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-1">Subject Information</h5>
            <small className="text-muted mb-3 d-block">
              Detailed information about the subject and remuneration calculation.
            </small>
            
            <Row className="mt-3">
              <Col md={6} className="mb-3">
                <div className="text-muted small mb-1">Subject Name</div>
                <div className="fw-bold">{remunerationData.subjectName}</div>
              </Col>
              <Col md={6} className="mb-3">
                <div className="text-muted small mb-1">Semester</div>
                <div className="fw-bold">{remunerationData.semester}</div>
              </Col>
              <Col md={6} className="mb-3">
                <div className="text-muted small mb-1">Faculty Name</div>
                <div className="fw-bold">{remunerationData.facultyName}</div>
              </Col>
              <Col md={6} className="mb-3">
                <div className="text-muted small mb-1">Department</div>
                <div className="fw-bold">{remunerationData.department}</div>
              </Col>
              <Col md={12} className="mb-3">
                <div className="text-muted small mb-1">Reference Number</div>
                <div className="fw-bold">
                  <Badge bg="secondary" className="fs-6">{remunerationData.referenceNumber}</Badge>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Remuneration Summary Cards */}
          <Row className="mb-4">
            <Col md={4} className="mb-3">
              <Card className="shadow-sm border-0 rounded-4 bg-white">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                      <FaFileInvoiceDollar size={24} className="text-primary" />
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Total Amount</h6>
                      <h4 className="fw-bold mb-0">₹{totalAmount.toLocaleString()}</h4>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="shadow-sm border-0 rounded-4 bg-white">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 p-3 rounded-3 me-3">
                      <FaFileInvoiceDollar size={24} className="text-success" />
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Components</h6>
                      <h4 className="fw-bold mb-0">{remunerationData.components.length}</h4>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="shadow-sm border-0 rounded-4 bg-white">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-info bg-opacity-10 p-3 rounded-3 me-3">
                      <FaFileInvoiceDollar size={24} className="text-info" />
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Status</h6>
                      <h4 className="fw-bold mb-0">
                        <Badge bg="success">Completed</Badge>
                      </h4>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Remuneration Components Table */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-1">Remuneration Components</h5>
            <small className="text-muted mb-3 d-block">
              Detailed breakdown of all remuneration components and calculations.
            </small>
            
            <Table
              bordered
              hover
              responsive
              striped
              className="mt-3 align-middle"
            >
              <thead className="table-light">
                <tr>
                  <th>Component</th>
                  <th>Rate (₹)</th>
                  <th>Quantity</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {remunerationData.components.map((item, index) => (
                  <tr key={index}>
                    <td className="fw-bold">{item.name}</td>
                    <td>
                      <span className="badge bg-secondary">{item.rate}</span>
                    </td>
                    <td>{item.quantity}</td>
                    <td className="fw-bold text-success">₹{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Total Row */}
            <div className="mt-4 p-3 bg-light rounded-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Total Remuneration</h5>
                <h4 className="fw-bold text-primary mb-0">₹{totalAmount.toLocaleString()}</h4>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-1">Actions</h5>
            <small className="text-muted mb-3 d-block">
              Download or print your remuneration details.
            </small>
            
            <div className="d-flex gap-3">
              <Button 
                variant="primary" 
                className="d-flex align-items-center gap-2"
                onClick={handlePrint}
              >
                <FaPrint /> Print Remuneration
              </Button>
              <Button 
                variant="outline-success" 
                className="d-flex align-items-center gap-2"
              >
                <FaDownload /> Download PDF
              </Button>
              <Button 
                variant="outline-secondary" 
                className="d-flex align-items-center gap-2"
              >
                <FaFileInvoiceDollar /> Export Details
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <footer className="text-center text-muted mt-4 small">
        <hr />
        <div>
          Role: <span className="fw-bold">Faculty</span> &nbsp;|&nbsp; &copy;{" "}
          {new Date().getFullYear()} Rizvi College of Engineering
        </div>
      </footer>
    </Container>
  );
}

export default SubjectRemuneration;
