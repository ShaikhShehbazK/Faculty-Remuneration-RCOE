import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  InputGroup,
  Form,
  Offcanvas,
  Button,
} from "react-bootstrap";
import { FaSearch, FaBars } from "react-icons/fa";
import AdminSidebar from "../../AdminSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentHistories() {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarOpen = () => setShowSidebar(true);
  const handleSidebarClose = () => setShowSidebar(false);
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));
  const header = {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Pass the token in Authorization header
    },
  };

  // Fetch all payments on component mount
  useEffect(() => {
    fetchPayments();
  }, []);

  // Fetch all payments from MongoDB
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://rcoe-remune-track.onrender.com/admin/payment/getAll"
      );
      console.log("Fetched payments For Payment History Page : ");
      console.log(response.data);
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      alert("Failed to fetch payment records");
    } finally {
      setLoading(false);
    }
  };

  // Filter payments based on search and filters
  const filteredPayments = payments.filter((payment) => {
    const facultyName = payment.facultyId?.name?.toLowerCase() || "";
    const designation = payment.facultyId?.designation?.toLowerCase() || "";
    const academicYear = payment.academicYear?.toString().toLowerCase() || "";

    const matchesSearch =
      searchTerm === "" ||
      facultyName.includes(searchTerm.toLowerCase()) ||
      designation.includes(searchTerm.toLowerCase()) ||
      academicYear.includes(searchTerm.toLowerCase());

    const matchesFaculty =
      filterFaculty === "" || payment.facultyId?._id === filterFaculty;

    return matchesSearch && matchesFaculty;
  });

  /* const filteredPayments = payments.filter((payment) => {
    const facultyName = payment.facultyId.name.toLowerCase();
    const designation = payment.facultyId.designation.toLowerCase(); // ADDed this
    const academicYear = payment.academicYear.toString().toLowerCase(); // ADDed this

    const matchesSearch =
      searchTerm === "" ||
      facultyName.includes(searchTerm.toLowerCase()) ||
      designation.includes(searchTerm.toLowerCase()) || // ADDed this
      academicYear.includes(searchTerm.toLowerCase());

    const matchesFaculty =
      filterFaculty === "" || payment.facultyId._id === filterFaculty;

    return matchesSearch && matchesFaculty;
  }); */

  // For dynamicallly giving colors to status
  const getStatusBadge = (status) => {
    const statusClass = {
      paid: "bg-success text-white",
      unpaid: "bg-warning text-dark",
      Failed: "bg-danger text-white",
    };
    return (
      <span
        className={`badge rounded-pill px-3 py-2 ${
          statusClass[status] || "bg-secondary"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
        {/* To Show data in Camel Case */}
      </span>
    );
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Mobile Hamburger Header */}
      <div className="d-flex d-md-none align-items-center mb-3">
        <Button
          variant="outline-primary"
          className="me-2"
          onClick={handleSidebarOpen}
        >
          <FaBars size={20} />
        </Button>
        <h5 className="mb-0 fw-bold">Payment History</h5>
      </div>
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
          <div className="d-none d-md-block">
            <h2 className="mb-2 fw-bold">Payment History</h2>
            <hr className="mb-4" />
          </div>
          <div className="d-md-none mb-3" />

          {/* Search Input */}
          <Card className="mb-4 p-3 shadow rounded-4 border-0 bg-white">
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                className="border-start-0"
                placeholder="Search by faculty name or designation"
                value={searchTerm} // ADDed this
                onChange={(e) => setSearchTerm(e.target.value)} // ADDed this
              />
            </InputGroup>
          </Card>

          {/* Table */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-3">Faculty Payment History</h5>
            <Table bordered hover responsive striped className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Faculty Name</th>
                  <th>Designation</th>
                  <th>Academic Year</th>
                  <th>Semester Type</th>
                  <th>Payment Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        className="btn btn-link p-0 text-decoration-none fw-medium text-primary"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                        onClick={() =>
                          navigate(
                            `/admin/paymenthistory/details/${item.facultyId._id}/${item.academicYear}/${item.semesterType}`
                          )
                        }
                      >
                        {item.facultyName}
                      </button>
                    </td>
                    <td className="text-primary">
                      {item.facultyId?.designation || "-"}
                    </td>
                    <td className="text-primary">{item.academicYear}</td>
                    <td className="text-primary">{item.semesterType}</td>
                    <td className="text-primary">
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="fw-bold text-success">
                      ₹ {item.totalAmount}
                    </td>
                    <td>{getStatusBadge(item.status)}</td>
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

export default PaymentHistories;
