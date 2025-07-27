import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { FaBars, FaEdit, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../AdminSidebar";

function FacultyDetails() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarOpen = () => setShowSidebar(true);
  const handleSidebarClose = () => setShowSidebar(false);

  const handleGoBack = () => {
    navigate("/admin/facultymanager");
  };

  const faculty = {
    name: "Prof. Manila Gupta",
    department: "Computer Engineering",
    role: "Professor",
    employeeId: "123456",
    contact: "+1-555-123-4567",
    email: "manila@eng.rizvi.edu.in",
    profileImg: "/vite.svg",
  };

  const assignedSubjects = [
    { name: "Data Structures and Algorithms", semester: "Semester 3" },
    { name: "Operating Systems", semester: "Semester 4" },
  ];

  const remunerationSummary = [
    {
      semester: "Semester 3",
      subject: "Data Structures and Algorithms",
      amount: "₹5,000",
    },
    { semester: "Semester 4", subject: "Operating Systems", amount: "₹4,500" },
  ];

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Mobile Hamburger Header */}
      {/* 
      <div className="d-flex d-md-none align-items-center mb-3"> 
        <Button
          variant="outline-primary"
          className="me-2"
          onClick={handleSidebarOpen}
        >
          <FaBars size={20} />
        </Button>
        <h5 className="mb-0 fw-bold">Faculty Management</h5>
      </div> 
      */}

      <Row>
        {/* Sidebar: Offcanvas for mobile */}
        <Offcanvas
          show={showSidebar}
          onHide={handleSidebarClose}
          className="d-md-none"
          backdrop
        >
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
          <Card
            className="shadow-sm border-0 rounded-4 p-3 sticky-top"
            style={{ minHeight: "90vh" }}
          >
            {<AdminSidebar />}
            <div className="text-muted small mt-4">Role: Payment Officer</div>
          </Card>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          {/* Mobile Header */}
          <div className="d-md-none d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            {/* Back Button */}
            <Button
              variant="outline-secondary"
              className="d-flex align-items-center gap-2"
              onClick={handleGoBack}
            >
              <FaArrowLeft /> Back
            </Button>

            {/* Heading */}
            <div className="flex-grow-1 text-start">
              <h4 className="fw-bold mb-1 mb-sm-0">Faculty Profile</h4>
            </div>

            {/* Edit Button */}
            <Button
              variant="outline-secondary"
              className="d-flex align-items-center gap-2"
            >
              <FaEdit /> Edit
            </Button>
          </div>

          {/* Desktop Header */}
          <div className="d-none d-md-flex d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
            {/* Left Side (Back button + heading) */}
            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 w-100">
              <Button
                variant="outline-secondary"
                className="d-flex align-items-center gap-2"
                onClick={handleGoBack}
              >
                <FaArrowLeft /> Back
              </Button>
              <div className="text-start">
                <h2 className="fw-bold mb-1">Faculty Profile</h2>
                <p className="text-primary mb-0">
                  Detailed information about the faculty member
                </p>
              </div>
            </div>

            {/* Right Side (Edit Button) */}
            <div>
              <Button
                variant="outline-secondary"
                className="d-flex align-items-center gap-2 w-100 w-md-auto"
              >
                <FaEdit /> Edit
              </Button>
            </div>
          </div>

          {/* Profile Header */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white d-flex flex-row align-items-center gap-4">
            <img
              src={faculty.profileImg}
              alt="Faculty"
              className="rounded-circle border"
              width="100"
              height="100"
            />
            <div>
              <h5 className="fw-semibold mb-1">{faculty.name}</h5>
              <p className="mb-1 text-primary">
                {faculty.role} of {faculty.department}
              </p>
              <p className="mb-0 text-secondary">
                Employee ID: {faculty.employeeId}
              </p>
            </div>
          </Card>

          {/* Core Details */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-semibold mb-3">Core Details</h5>
            <Row>
              <Col md={6}>
                <p>
                  <strong>Name:</strong> {faculty.name}
                </p>
                <p>
                  <strong>Department:</strong> {faculty.department}
                </p>
                <p>
                  <strong>Contact Number:</strong> {faculty.contact}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Employee ID:</strong> {faculty.employeeId}
                </p>
                <p>
                  <strong>Role:</strong> {faculty.role}
                </p>
                <p>
                  <strong>Email:</strong> {faculty.email}
                </p>
              </Col>
            </Row>
          </Card>

          {/* Assigned Subjects */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-semibold mb-3">Assigned Subjects</h5>
            <Table
              bordered
              hover
              responsive
              striped
              className="align-middle mb-0"
            >
              <thead className="table-light">
                <tr>
                  <th>Subject Name</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {assignedSubjects.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="text-primary">{item.semester}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>

          {/* Remuneration Summary */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-semibold mb-3">Remuneration Summary</h5>
            <Table
              bordered
              hover
              responsive
              striped
              className="align-middle mb-0"
            >
              <thead className="table-light">
                <tr>
                  <th>Semester</th>
                  <th>Subject Name</th>
                  <th>Remuneration Amount</th>
                </tr>
              </thead>
              <tbody>
                {remunerationSummary.map((item, index) => (
                  <tr key={index}>
                    <td className="text-primary">{item.semester}</td>
                    <td>
                      <button
                        className="btn btn-link p-0 text-decoration-none fw-medium text-primary"
                        onClick={() =>
                          navigate("/admin/facultymanager/details/subject")
                        }
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        {item.subject}
                      </button>
                    </td>
                    <td className="text-success">{item.amount}</td>
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

export default FacultyDetails;
