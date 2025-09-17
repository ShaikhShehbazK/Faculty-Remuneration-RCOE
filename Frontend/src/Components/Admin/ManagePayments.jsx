import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Offcanvas,
  Form,
} from "react-bootstrap";
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
import api from "../../utils/api";
import toast from "react-hot-toast";

function ManagePayments() {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarOpen = () => setShowSidebar(true);
  const handleSidebarClose = () => setShowSidebar(false);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("");
  const [filterSemester, setFilterSemester] = useState("");
  const [facultyList, setFacultyList] = useState([]);
  const [semesters] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const handlePay = async (paymentId) => {
    console.log(paymentId);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      console.log(token);

      const response = await axios.post(
        `https://rcoe-remune-track.onrender.com/make-payment/${paymentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      toast.success("Payment marked as paid!");
      fetchPayments(); // refresh table
    } catch (error) {
      console.error("Error marking payment as paid:", error);
      toast.error("Failed to mark payment as paid.");
    }
  };

  // Fetch all payments on component mount
  useEffect(() => {
    fetchPayments();
    fetchFacultyList();
  }, []);

  // Fetch faculty list for filter dropdown
  const fetchFacultyList = async () => {
    try {
      const response = await axios.get(
        "https://rcoe-remune-track.onrender.com/admin/faculty/getAll"
      );
      console.log("Fetched faculty list:", response.data);
      setFacultyList(response.data);
    } catch (error) {
      console.error("Error fetching faculty list:", error);
    }
  };

  // Fetch all payments from MongoDB
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://rcoe-remune-track.onrender.com/admin/payment/getAll"
      );
      console.log("Fetched payments:", response.data);
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Failed to fetch payment records");
    } finally {
      setLoading(false);
    }
  };

  const handleSlip = async (
    paymentId,
    facultyName,
    academicYear,
    semesterType
  ) => {
    console.log("Payment ID : ", paymentId);

    try {
      const url = `https://rcoe-remune-track.onrender.com/payment/generate-pdf/${paymentId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });
      console.log("Checking area", response);
      // if (!response.ok) {
      //   throw new Error("Failed to download slip");
      // }
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message || "Failed to generate slip. Try again later.";
        // alert(errorMessage);
        toast.error(errorMessage); // "Slip can only be generated after payment is successful"
        throw new Error(errorMessage);
      }

      // Convert to Blob
      const blob = await response.blob();
      const fileURL = window.URL.createObjectURL(blob);

      // Create <a> link and trigger download
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `PaymentSlip_${facultyName}_${academicYear}_${semesterType}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(fileURL);
    } catch (err) {
      console.error("Error downloading slip:", err);
    }

    /* const safeName = facultyName.replace(/\s+/g, "_"); // replace spaces with _
    const fileName = `Remuneration_Slip_${safeName}_${academicYear}_${semesterType}.pdf`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/pdf",
        },
      });

      if (!response.ok) throw new Error("Failed to download slip");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading slip:", error);
    } */

    /* try {
      const response = await fetch(url, { method: "GET" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // cleanup
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading slip:", error);
    } */

    /* const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); */
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
    return date.toLocaleDateString("en-IN");
  };

  /*  // Get faculty name by ID
  const getFacultyName = (facultyId) => {
    const faculty = facultyList.find(f => f._id === facultyId);
    return faculty ? faculty.name : 'Unknown Faculty';
  }; */

  // // Filter payments based on search and filters
  // const filteredPayments = payments.filter((payment) => {
  //   const facultyName = payment.facultyName;
  //   const matchesSearch =
  //     searchTerm === "" ||
  //     facultyName.includes(searchTerm.toLowerCase()) ||
  //     payment.academicYear.toString().includes(searchTerm) ||
  //     payment.semester.toString().includes(searchTerm);

  //   const matchesFaculty =
  //     filterFaculty === "" || payment.facultyId === filterFaculty;
  //   const matchesSemester =
  //     filterSemester === "" || payment.semester.toString() === filterSemester;

  //   return matchesSearch && matchesFaculty && matchesSemester;
  // });
  // Filter payments based on search and filters
  const filteredPayments = payments.filter((payment) => {
    const facultyName = payment.facultyName || "";
    const academicYear = payment.academicYear
      ? payment.academicYear.toString()
      : "";
    const semester = payment.semester ? payment.semester.toString() : "";

    const matchesSearch =
      searchTerm === "" ||
      facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      academicYear.includes(searchTerm) ||
      semester.includes(searchTerm);

    const matchesFaculty =
      filterFaculty === "" || payment.facultyId === filterFaculty;

    const matchesSemester =
      filterSemester === "" || semester === filterSemester;

    return matchesSearch && matchesFaculty && matchesSemester;
  });

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
        <h5 className="mb-0 fw-bold">Manage Faculty Payments</h5>
      </div>
      <Row>
        {/* Sidebar: Offcanvas for mobile, static for desktop */}
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
                        {faculty.facultyName}
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
                    <th>Semester Type</th>
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
                        {payments.length === 0
                          ? "No payment records found. Create payments using the Payments page."
                          : "No payments match your search criteria."}
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((payment, index) => (
                      <tr key={payment._id || index}>
                        <td className="fw-bold">{payment.facultyName}</td>
                        {/* <td>
                          <span className="badge bg-info text-dark">
                            Semester {payment.semester}
                          </span>
                        </td> */}
                        <td>{payment.academicYear}</td>
                        <td>{payment.semesterType}</td>
                        <td className="text-primary">
                          {formatDate(payment.createdAt)}
                        </td>
                        <td className="fw-bold text-success">
                          ₹{payment.totalAmount?.toLocaleString() || "0"}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              payment.status === "paid"
                                ? "bg-success text-white"
                                : payment.status === "unpaid"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                            }`}
                          >
                            {payment.status?.toUpperCase() || "UNDEFINED"}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex flex-wrap align-items-center gap-2">
                            {/* <Button
                              variant="outline-primary"
                              className="d-flex align-items-center px-2 py-1"
                              size="sm"
                              title="View Payment Details"
                            >
                              <FaEye className="me-1" /> <span>View</span>
                            </Button> */}
                            <Button
                              variant="outline-secondary"
                              className="d-flex align-items-center px-2 py-1"
                              size="sm"
                              title="Edit Payment"
                              // onClick={() => handleEditpayment(payment._id)}
                            >
                              <FaEdit className="me-1" /> <span>Edit</span>
                            </Button>
                            <Button
                              variant="success"
                              className="d-flex align-items-center px-2 py-1"
                              size="sm"
                              title="Mark as Paid"
                              onClick={() => handlePay(payment._id)}
                              disabled={payment.status === "paid"}
                            >
                              {/* <span
                                role="img"
                                aria-label="Pay"
                                className="me-1"
                              >
                                💰
                              </span> */}
                              <span>₹ Pay</span>
                            </Button>
                            <Button
                              variant="info"
                              className="d-flex align-items-center px-2 py-1"
                              size="sm"
                              title="Download Remuneration Slip"
                              onClick={() =>
                                handleSlip(
                                  payment._id,
                                  payment.facultyId.name,
                                  payment.academicYear,
                                  payment.semesterType
                                )
                              }
                            >
                              <FaFileInvoiceDollar className="me-1" />{" "}
                              <span>Slip</span>
                            </Button>
                          </div>
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
