import { useState } from "react";
import { Container, Row, Col, Card, Table, Button, InputGroup, Form, Offcanvas } from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash, FaUserPlus, FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import AdminSidebar from "../../AdminSidebar";

function FacultyManagement() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarOpen = () => setShowSidebar(true);
  const handleSidebarClose = () => setShowSidebar(false);

  const handleFacultyClick = () => {
    navigate('/admin/facultymanager/details');
  };

  const handleAddFaculty = () => {
    navigate('/admin/facultymanager/add');
  };

  const facultyList = [
    {
      name: 'Prof. Mohd Ashfaque Shaikh',
      department: 'Computer',
      role: 'Professor',
      contact: 'shaikh@eng.rizvi.edu.in',
      subjects: 'Machine Learning (Sem 7), SKL OOP JAVA (Sem 3)',
    },
    {
      name: 'Prof. Reshma Lohar',
      department: 'Computer',
      role: 'Associate Professor',
      contact: 'Lohar@eng.rizvi.edu.in',
      subjects: 'Big Data Analytics (Sem 7)',
    },
    {
      name: 'Prof. Saji Daniel',
      department: 'AIDS',
      role: 'Professor',
      contact: 'saji@eng.rizvi.edu.in',
      subjects: 'DMMM (Sem 7), CS&L (Sem 5)',
    },
  ];

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Mobile Hamburger Header Button */}
      <div className="d-flex d-md-none align-items-center mb-3">
        <Button variant="outline-primary" className="me-2" onClick={handleSidebarOpen}>
          <FaBars size={20} />
        </Button>
        <h5 className="mb-0 fw-bold">Faculty Management</h5>
      </div>

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
          <div className="d-none d-md-block">
            <h2 className="fw-bold mb-1">Faculty Management</h2>
            <p className="text-primary mb-4">Manage faculty member information</p>
          </div>         

          {/* Search Bar */}
          <Card className="mb-4 p-3 shadow rounded-4 border-0 bg-white">
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                className="border-start-0"
                placeholder="Search by name, department, or role"
              />
            </InputGroup>
          </Card>

          {/* Add Faculty Button */}
          <div className="d-flex justify-content-end mb-3">
            <Button 
              variant="primary" 
              className="rounded-pill d-flex align-items-center gap-2"
              onClick={handleAddFaculty}
            >
              <FaUserPlus /> Add Faculty
            </Button>
          </div>
          {/* Table */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-3">Faculty List</h5>
            <Table bordered hover responsive striped className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Contact Information</th>
                  <th>Assigned Subjects</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((faculty, index) => (
                  <tr key={index}>
                    <td>
                      <button 
                        className="btn btn-link p-0 text-decoration-none fw-medium text-primary"
                        onClick={handleFacultyClick}
                        style={{ 
                          background: 'none', 
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        {faculty.name}
                      </button>
                    </td>
                    <td><a href="#" className="text-decoration-none text-primary">{faculty.department}</a></td>
                    <td><a href="#" className="text-decoration-none text-primary">{faculty.role}</a></td>
                    <td>{faculty.contact}</td>
                    <td>
                      {faculty.subjects.split(',').map((subject, idx) => (
                        <span key={idx} className="badge bg-info text-dark me-1 mb-1">
                          {subject.trim()}
                        </span>
                      ))}
                    </td>
                    <td>
                      <Button variant="link" className="p-0 me-2 text-decoration-none">
                        <FaEdit className="me-1" /> Edit
                      </Button>
                      <Button variant="link" className="p-0 text-danger text-decoration-none">
                        <FaTrash className="me-1" /> Delete
                      </Button>
                    </td>
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

export default FacultyManagement;
