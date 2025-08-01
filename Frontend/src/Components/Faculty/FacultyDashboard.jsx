
import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { FaBars, FaUser, FaMoneyBillWave, FaHistory, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import FacultySidebar from '../FacultySidebar';

function FacultyDashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarOpen = () => setShowSidebar(true);
  const handleSidebarClose = () => setShowSidebar(false);

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      
      {/* Mobile Hamburger Header */}
      <div className="d-flex d-md-none align-items-center mb-3">
        <Button variant="outline-primary" className="me-2" onClick={handleSidebarOpen}>
          <FaBars size={20} />
        </Button>
        <h5 className="mb-0 fw-bold">Faculty Dashboard</h5>
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
            <h2 className="mb-2 fw-bold">Dashboard</h2>
            <hr className="mb-4" />
          </div>
          <div className="d-md-none mb-3" />

          {/* Payment Overview Cards */}
          <Row className="mb-4">
            <Col md={4} className="mb-3">
              <Card className="shadow-sm border-0 rounded-4 bg-white">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                      <FaMoneyBillWave size={24} className="text-primary" />
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Base Salary</h6>
                      <h4 className="fw-bold mb-0">₹30,000</h4>
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
                      <FaHistory size={24} className="text-success" />
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">This Month</h6>
                      <h4 className="fw-bold mb-0">₹2,500</h4>
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
                      <FaUser size={24} className="text-info" />
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Subjects</h6>
                      <h4 className="fw-bold mb-0">3 Active</h4>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Payments Table */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-1">Recent Payments</h5>
            <small className="text-muted mb-3 d-block">
              Your recent payment transactions and history.
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
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Transaction Details</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-07-20</td>
                  <td className="fw-bold text-success">₹2,500.00</td>
                  <td>Direct Deposit - July Salary</td>
                  <td>
                    <span className="badge bg-success">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>2024-06-20</td>
                  <td className="fw-bold text-success">₹2,500.00</td>
                  <td>Direct Deposit - June Salary</td>
                  <td>
                    <span className="badge bg-success">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>2024-05-20</td>
                  <td className="fw-bold text-success">₹2,500.00</td>
                  <td>Direct Deposit - May Salary</td>
                  <td>
                    <span className="badge bg-success">Completed</span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>

          {/* Profile Information */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-1">Profile Information</h5>
            <small className="text-muted mb-3 d-block">
              Your personal and professional details.
            </small>
            <Row className="mt-3">
              <Col md={4} className="mb-3">
                <div className="text-muted small mb-1">Full Name</div>
                <div className="fw-bold">Prof. Mohd Ashfaque</div>
              </Col>
              <Col md={4} className="mb-3">
                <div className="text-muted small mb-1">Email</div>
                <div className="fw-bold">ashfaque@eng.rizvi.edu.in</div>
              </Col>
              <Col md={4} className="mb-3">
                <div className="text-muted small mb-1">Phone Number</div>
                <div className="fw-bold">9877658546</div>
              </Col>
              <Col md={4} className="mb-3">
                <div className="text-muted small mb-1">Department</div>
                <div className="fw-bold">Computer Engineering</div>
              </Col>
              <Col md={4} className="mb-3">
                <div className="text-muted small mb-1">Designation</div>
                <div className="fw-bold">Assistant Professor</div>
              </Col>
              <Col md={4} className="mb-3">
                <div className="text-muted small mb-1">Employee ID</div>
                <div className="fw-bold">FAC001</div>
              </Col>
            </Row>
            <div className="mt-3">
              <Button 
                variant="outline-primary" 
                className="d-flex align-items-center gap-2"
              >
                <FaEdit /> Edit Profile
              </Button>
            </div>
          </Card>

          {/* Current Semester Subjects */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-1">Current Semester Subjects</h5>
            <small className="text-muted mb-3 d-block">
              Subjects assigned for the current semester.
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
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Credits</th>
                  <th>Students</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CS301</td>
                  <td>Machine Learning</td>
                  <td>4</td>
                  <td>45</td>
                  <td>
                    <span className="badge bg-primary">Active</span>
                  </td>
                </tr>
                <tr>
                  <td>CS302</td>
                  <td>SKL OOPS JAVA</td>
                  <td>3</td>
                  <td>38</td>
                  <td>
                    <span className="badge bg-primary">Active</span>
                  </td>
                </tr>
                <tr>
                  <td>CS303</td>
                  <td>Computer Networks</td>
                  <td>3</td>
                  <td>42</td>
                  <td>
                    <span className="badge bg-primary">Active</span>
                  </td>
                </tr>
              </tbody>
            </Table>
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

export default FacultyDashboard;
