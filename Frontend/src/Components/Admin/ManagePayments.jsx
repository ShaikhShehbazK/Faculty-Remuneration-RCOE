import { useState } from "react";
import { Container, Row, Col, Card, Table, Button, Offcanvas } from "react-bootstrap";
import {
  FaEye,
  FaEdit,
  FaFileInvoiceDollar,
  FaBars,
} from "react-icons/fa";
import AdminSidebar from "../AdminSidebar";

function ManagePayments() {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarOpen = () => setShowSidebar(true);
  const handleSidebarClose = () => setShowSidebar(false);

  const payments = [
    { name: "Prof. Mohd Ashfaque", date: "2024-07-26", amount: "₹2,500" },
    { name: "Prof. Reshma Lohar", date: "2024-07-20", amount: "₹3,000" },
    { name: "Prof. Anupam Choudhary", date: "2024-07-15", amount: "₹2,200" },
    { name: "Prof. Manila Gupta", date: "2024-07-10", amount: "₹2,800" },
    { name: "Prof. Dinesh Deore", date: "2024-07-05", amount: "₹2,600" },
  ];

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Mobile Hamburger Header */}
      <div className="d-flex d-md-none align-items-center mb-3">
        <Button variant="outline-primary" className="me-2" onClick={handleSidebarOpen}>
          <FaBars size={20} />
        </Button>
        <h5 className="mb-0 fw-bold">Manage Faculty Payments</h5>
      </div>
      <Row>
        {/* Sidebar: Offcanvas for mobile, static for desktop */}
        <Offcanvas show={showSidebar} onHide={handleSidebarClose} className="d-md-none" backdrop>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {<AdminSidebar />}
            <div className="text-muted small mt-4">Role: Payment Officer</div>
          </Offcanvas.Body>
        </Offcanvas>
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
          <div className="d-none d-md-block">
            <h2 className="mb-2 fw-bold">Manage Faculty Payments</h2>
            <hr className="mb-4" />
          </div>
          <div className="d-md-none mb-3" />

          {/* Tabs */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Search
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Filters
              </a>
            </li>
          </ul>

          {/* Search Box */}
          <Card className="mb-4 p-3 shadow rounded-4 border-0 bg-white">
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search payments"
              />
              <Button variant="outline-secondary" type="button">
                Search
              </Button>
            </div>
          </Card>

          {/* Table */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-3">Faculty Payment Records</h5>
            <Table bordered hover responsive striped className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Faculty Name</th>
                  <th>Payment Date</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.name}</td>
                    <td className="text-primary">{payment.date}</td>
                    <td>{payment.amount}</td>
                    <td>
                      <Button
                        variant="link"
                        className="p-0 me-2 text-decoration-none"
                      >
                        <FaEye className="me-1" /> View Details
                      </Button>
                      <span className="text-muted">|</span>
                      <Button
                        variant="link"
                        className="p-0 mx-2 text-decoration-none"
                      >
                        <FaEdit className="me-1" /> Edit
                      </Button>
                      <span className="text-muted">|</span>
                      <Button
                        variant="link"
                        className="p-0 ms-2 text-decoration-none"
                      >
                        <FaFileInvoiceDollar className="me-1" /> Regenerate Slip
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

export default ManagePayments;
