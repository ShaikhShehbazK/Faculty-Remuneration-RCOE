import { useState } from "react";
import {Form, Button, Table, Row, Col, Container, Card, InputGroup, Offcanvas} from "react-bootstrap";
import {FaSave, FaSyncAlt, FaFileInvoiceDollar, FaBars} from "react-icons/fa";
import AdminSidebar from "../AdminSidebar";

function Payments() {
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
        <h5 className="mb-0 fw-bold">Faculty Payments</h5>
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
            <h2 className="mb-2 fw-bold">Faculty Payments</h2>
            <hr className="mb-4" />
          </div>
          <div className="d-md-none mb-3" />

          {/* Initiate Payments */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-1">Initiate Payments</h5>
            <small className="text-muted mb-3 d-block">
              Start a new payment process for faculty members.
            </small>

            <Row className="mb-3">
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Group>
                  <Form.Label>Select Faculty</Form.Label>
                  <Form.Select>
                    <option>Choose...</option>
                    <option>Prof. Mohd Ashfaque</option>
                    <option>Prof. Reshma Lohar</option>
                    <option>Prof. Anupam Choudhary</option>
                    <option>Prof. Manila Gupta</option>
                    <option>Prof. Dinesh Chouhan</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Select Semester</Form.Label>
                  <Form.Select>
                    <option>Choose...</option>
                    <option>Sem 1 2023</option>
                    <option>Sem 3 2023</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Subjects Assigned</Form.Label>
                  <Form.Control
                    type="text"
                    value="Calculus, Linear Algebra"
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Base Salary</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>₹</InputGroup.Text>
                    <Form.Control type="text" value="30,000" disabled />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            {/* Remuneration Calculation */}
            <div className="border-top pt-3 mt-4 mb-2">
              <h5 className="fw-bold mb-1">Remuneration Calculation</h5>
              <small className="text-muted mb-3 d-block">
                Calculate remuneration for each subject.
              </small>
            </div>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Select Subject</Form.Label>
                  <Form.Select>
                    <option>Choose...</option>
                    <option>Machine Learning</option>
                    <option>Big Data Analytics</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>No. of Term Work Papers</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Rate per Paper</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>₹</InputGroup.Text>
                    <Form.Control type="number" />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Oral/Practical Papers</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Rate per Paper</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>₹</InputGroup.Text>
                    <Form.Control type="number" />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Semester Papers</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Rate per Paper</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>₹</InputGroup.Text>
                    <Form.Control type="number" />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Form.Group className="w-100">
                  <Form.Label>Calculated Total</Form.Label>
                  <Form.Control type="text" value="Calculated total" disabled />
                </Form.Group>
              </Col>
            </Row>

            {/* Save Payment Button */}
            <div className="d-flex justify-content-end">
              <Button
                variant="success"
                className="px-4 py-2 fw-bold d-flex align-items-center gap-2"
              >
                <FaSave /> Save Payment
              </Button>
            </div>

          </Card>

          {/* Calculated Remunerations */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-1">Calculated Remunerations</h5>
            <small className="text-muted mb-3 d-block">
              Review calculated remunerations for each subject.
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
                  <th>Subject</th>
                  <th>Term Work Papers</th>
                  <th>Oral/Practical Papers</th>
                  <th>Semester Papers</th>
                  <th>Semester</th>
                  <th>Total Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Calculus</td>
                  <td>
                    200 <span className="badge bg-secondary ms-1">₹50</span>
                  </td>
                  <td>
                    100 <span className="badge bg-secondary ms-1">₹75</span>
                  </td>
                  <td>
                    50 <span className="badge bg-secondary ms-1">₹100</span>
                  </td>
                  <td>
                    <span className="badge bg-info text-dark">
                      Odd Sem 2023
                    </span>
                  </td>
                  <td className="fw-bold text-success">₹22,500</td>
                </tr>
                <tr>
                  <td>Linear Algebra</td>
                  <td>
                    150 <span className="badge bg-secondary ms-1">₹50</span>
                  </td>
                  <td>
                    75 <span className="badge bg-secondary ms-1">₹75</span>
                  </td>
                  <td>
                    40 <span className="badge bg-secondary ms-1">₹100</span>
                  </td>
                  <td>
                    <span className="badge bg-info text-dark">
                      Odd Sem 2023
                    </span>
                  </td>
                  <td className="fw-bold text-success">₹15,250</td>
                </tr>
                <tr>
                  <td>Discrete Mathematics</td>
                  <td>
                    180 <span className="badge bg-secondary ms-1">₹50</span>
                  </td>
                  <td>
                    90 <span className="badge bg-secondary ms-1">₹75</span>
                  </td>
                  <td>
                    45 <span className="badge bg-secondary ms-1">₹100</span>
                  </td>
                  <td>
                    <span className="badge bg-info text-dark">
                      Even Sem 2023
                    </span>
                  </td>
                  <td className="fw-bold text-success">₹19,750</td>
                </tr>
              </tbody>
            </Table>
          </Card>

          {/* Final Remuneration */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-1">Final Calculated Remuneration</h5>
            <small className="text-muted mb-3 d-block">
              Summary of all remuneration components.
            </small>
            <Table bordered responsive striped className="mt-3 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Component</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Travel Allowance</td>
                  <td>
                    <span className="fw-bold text-primary">₹1000</span>
                  </td>
                </tr>
                <tr>
                  <td>Base Salary</td>
                  <td>
                    <span className="fw-bold text-primary">₹30,000</span>
                  </td>
                </tr>
                <tr>
                  <td>Calculated Remuneration</td>
                  <td>
                    <span className="fw-bold text-success">₹57,500</span>
                  </td>
                </tr>
                <tr className="fw-bold table-success">
                  <td>Total Remuneration</td>
                  <td>₹97,500</td>
                </tr>
              </tbody>
            </Table>

            <div className="d-flex justify-content-end gap-3 mt-3">
              <Button
                variant="primary"
                className="d-flex align-items-center gap-2"
              >
                <FaSyncAlt /> Update Final Calculation
              </Button>
              <Button
                variant="outline-secondary"
                className="d-flex align-items-center gap-2"
              >
                <FaFileInvoiceDollar /> Generate Payment Slip
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

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

export default Payments;
