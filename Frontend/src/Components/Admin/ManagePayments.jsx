import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Offcanvas, Form } from "react-bootstrap";
import {
  FaEye,
  FaEdit,
  FaFileInvoiceDollar,
  FaBars,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";
import AdminSidebar from "../AdminSidebar";
import axios from "axios";

function ManagePayments() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("");
  const [filterSemester, setFilterSemester] = useState("");
  const [facultyList, setFacultyList] = useState([]);
  const [semesters] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const handleSidebarOpen = () => setShowSidebar(true);
  const handleSidebarClose = () => setShowSidebar(false);

  // Fetch all payments on component mount
  useEffect(() => {
    fetchPayments();
    fetchFacultyList();
  }, []);

  // Fetch faculty list for filter dropdown
  const fetchFacultyList = async () => {
    try {
      const response = await axios.get('http://localhost:3002/admin/faculty/getAll');
      console.log('Fetched faculty list:', response.data);
      setFacultyList(response.data);
    } catch (error) {
      console.error('Error fetching faculty list:', error);
    }
  }; 

  // Fetch all payments from MongoDB
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3002/admin/payment/getAll');
      console.log('Fetched payments:', response.data);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      alert('Failed to fetch payment records');
    } finally {
      setLoading(false);
    }
  };

  // Handle search and filtering
  const handleSearch = () => {
    // This will be implemented when we add search functionality to the backend
    fetchPayments();
  };

  // Handle filter changes
  const handleFilterChange = () => {
    fetchPayments();
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

 /*  // Get faculty name by ID
  const getFacultyName = (facultyId) => {
    const faculty = facultyList.find(f => f._id === facultyId);
    return faculty ? faculty.name : 'Unknown Faculty';
  }; */

  // Filter payments based on search and filters
  const filteredPayments = payments.filter(payment => {
    const facultyName = payment.facultyId.name.toLowerCase();
    const matchesSearch = searchTerm === "" || 
      facultyName.includes(searchTerm.toLowerCase()) ||
      payment.academicYear.toString().includes(searchTerm) ||
      payment.semester.toString().includes(searchTerm);
    
    const matchesFaculty = filterFaculty === "" || payment.facultyId === filterFaculty;
    const matchesSemester = filterSemester === "" || payment.semester.toString() === filterSemester;
    
    return matchesSearch && matchesFaculty && matchesSemester;
  });

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

          {/* Search and Filter Section */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Search & Filter</h5>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={fetchPayments}
                disabled={loading}
              >
                <FaSyncAlt className="me-1" />
                Refresh
              </Button>
            </div>
            
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>Search</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      placeholder="Search by faculty name, year, semester..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button 
                      variant="outline-secondary" 
                      onClick={handleSearch}
                      disabled={loading}
                    >
                      <FaSearch />
                    </Button>
                  </div>
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label>Filter by Faculty</Form.Label>
                  <Form.Select
                    value={filterFaculty}
                    onChange={(e) => {
                      setFilterFaculty(e.target.value);
                      handleFilterChange();
                    }}
                  >
                    <option value="">All Faculty</option>
                    {facultyList.map((faculty) => (
                      <option key={faculty._id} value={faculty._id}>
                        {faculty.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={2} className="mb-3 d-flex align-items-end">
                <Button 
                  variant="outline-secondary" 
                  onClick={() => {
                    setSearchTerm("");
                    setFilterFaculty("");
                    setFilterSemester("");
                  }}
                  className="w-100"
                >
                  Clear Filters
                </Button>
              </Col>
            </Row>
          </Card>

          {/* Table */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Faculty Payment Records</h5>
              <div className="text-muted small">
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <span>{filteredPayments.length} payment record(s) found</span>
                )}
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading payment records...</p>
              </div>
            ) : (
              <Table bordered hover responsive striped className="align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Faculty Name</th>
                    {/* <th>Semester</th> */}
                    <th>Academic Year</th>
                    <th>Payment Date</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-4">
                        {payments.length === 0 ? 
                          "No payment records found. Create payments using the Payments page." : 
                          "No payments match your search criteria."
                        }
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((payment, index) => (
                      <tr key={payment._id || index}>
                        <td className="fw-bold">{payment.facultyId.name}</td>
                        {/* <td>
                          <span className="badge bg-info text-dark">
                            Semester {payment.semester}
                          </span>
                        </td> */}
                        <td>{payment.academicYear}</td>
                        <td className="text-primary">{formatDate(payment.createdAt)}</td>
                        <td className="fw-bold text-success">
                          ₹{payment.totalAmount?.toLocaleString() || '0'}
                        </td>
                        <td>
                          <span className={`badge ${
                            payment.status === 'paid' ? 'bg-success text-white' : 
                            payment.status === 'unpaid' ? 'bg-warning text-dark' : 'bg-secondary'
                          }`}>
                            {payment.status?.toUpperCase() || 'UNDEFINED'}
                          </span>
                        </td>
                        <td>
                          <Button
                            variant="link"
                            className="p-0 me-2 text-decoration-none"
                            size="sm"
                          >
                            <FaEye className="me-1" /> View
                          </Button>
                          <span className="text-muted">|</span>
                          <Button
                            variant="link"
                            className="p-0 mx-2 text-decoration-none"
                            size="sm"
                          >
                            <FaEdit className="me-1" /> Edit
                          </Button>
                          <span className="text-muted">|</span>
                          <Button
                            variant="link"
                            className="p-0 ms-2 text-decoration-none"
                            size="sm"
                          >
                            <FaFileInvoiceDollar className="me-1" /> Slip
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ManagePayments;
