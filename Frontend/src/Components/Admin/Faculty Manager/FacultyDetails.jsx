import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Offcanvas,
} from "react-bootstrap";
import {
  FaBars,
  FaEdit,
  FaArrowLeft,
  FaFileInvoiceDollar,
  FaSyncAlt,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../AdminSidebar";
import axios from "axios";

function FacultyDetails() {
  const token = localStorage.getItem("token");
  const header = {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Pass the token in Authorization header
    },
  };
  const { id } = useParams(); // URL param: /admin/facultymanager/details/:id
  const [faculty, setFaculty] = useState([]);
  const [remuneration, setRemuneration] = useState([]);

  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarOpen = () => setShowSidebar(true);
  const handleSidebarClose = () => setShowSidebar(false);

  const handleGoBack = () => {
    navigate("/admin/facultymanager", { replace: true });
  };

  // 1) Fetch faculty
  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const facultyRes = await axios.get(
          `https://rcoe-remune-track.onrender.com/admin/faculty/getSingle/${id}`,
          header
        );
        console.log("✅ Getting Faculty Details", facultyRes.data);
        setFaculty(facultyRes.data);
      } catch (err) {
        console.error("❌ Error fetching faculty:", err);
      }
    };
    fetchFacultyDetails();
  }, [id]);

  // 2) Once faculty is loaded, fetch payment details for each academic year
  useEffect(() => {
    if (
      !faculty ||
      !Array.isArray(faculty.assignedSubjects) ||
      faculty.assignedSubjects.length === 0
    )
      return;

    const uniqueYears = Array.from(
      new Set(
        faculty.assignedSubjects.map((yg) => yg?.academicYear).filter(Boolean)
      )
    );

    if (uniqueYears.length === 0) return;

    const fetchPaymentByYears = async () => {
      try {
        const results = await Promise.all(
          uniqueYears.map(async (year) => {
            const res = await axios.get(
              `https://rcoe-remune-track.onrender.com/admin/payment/getSinglePayment/${id}/${year}`
            );
            return res.data; // shape: { facultyName, department, breakdown }
          })
        );

        console.log("Entire Payment Data ", results);
        // merge all breakdowns into one array, keep same shape { breakdown: [...] }
        const merged = results.flatMap((r) => r.breakdown || []);
        setRemuneration({ breakdown: merged });

        console.log("✅ Merged remuneration breakdown:", merged);
      } catch (err) {
        console.error("❌ Error fetching remuneration:", err);
      }
    };

    fetchPaymentByYears();
  }, [id, faculty]);

  /* useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const facultyRes = await axios.get(`https://rcoe-remune-track.onrender.com/admin/faculty/getSingle/${id}`);
        console.log("Getting Faculty Details");
        console.log(facultyRes.data);
        setFaculty(facultyRes.data);
      } catch (err) {
        console.error("❌ Error fetching faculty:", err);
      }

      try {
        academicYear = faculty.assignedSubjects.academicYear;
        const paymentRes = await axios.get(`https://rcoe-remune-track.onrender.com/admin/payment/getSinglePayment/${id}/${academicYear}`);
        console.log("Getting Payment Details");
        console.log(paymentRes.data);
        setRemuneration(paymentRes.data);
      } catch (err) {
        console.error("❌ Error fetching remuneration:", err);
      }
    };

    fetchFacultyDetails();
  }, [id]); */

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
                {faculty.designation} of {faculty.department}
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
                  <strong>Contact Number:</strong> {faculty.phone}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Employee ID:</strong> {faculty.employeeId}
                </p>
                <p>
                  <strong>Designation:</strong> {faculty.designation}
                </p>
                <p>
                  <strong>Email:</strong> {faculty.email}
                </p>
              </Col>
            </Row>
          </Card>

          {/* Assigned Subjects */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-semibold mb-0">Assigned Subjects</h5>

              {/* <Button
                variant="outline-primary"
                size="sm"
                onClick={() =>
                  navigate(
                    `https://rcoe-remune-track.onrender.com/admin/facultymanager/update/${id}`,
                    {
                      state: { facultyName: faculty.name },
                    }
                  )
                }
              >
                Update Assignments
              </Button> */}
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() =>
                  navigate(`/admin/facultymanager/update/${id}`, {
                    state: { facultyName: faculty.name },
                  })
                }
              >
                Update Assignments
              </Button>
            </div>

            {faculty.assignedSubjects && faculty.assignedSubjects.length > 0 ? (
              faculty.assignedSubjects.map((yearGroup, yIdx) => (
                <div key={yIdx} className="mb-4">
                  <h6 className="fw-bold text-primary mb-2">
                    Academic Year: {yearGroup.academicYear}
                  </h6>

                  {yearGroup.semesters.map((semGroup, sIdx) => (
                    <div key={sIdx} className="mb-3 ps-3">
                      <p className="fw-semibold text-secondary mb-1">
                        {semGroup.semesterType} Semester
                      </p>
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
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {semGroup.subjects.map((subj, subjIdx) => (
                            <tr key={subjIdx}>
                              <td>{subj.name}</td>
                              <td className="text-primary">
                                Semester {subj.semester}
                              </td>
                              <td>
                                <span className="badge bg-primary">Active</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-muted mb-0">No assigned subjects</p>
            )}
          </Card>

          {/* Assigned Subjects */}
          {/* <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
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
                  <th>Academic Year</th>
                </tr>
              </thead>
              <tbody>
                {faculty.assignedSubjects &&
                faculty.assignedSubjects.length > 0 ? (
                  faculty.assignedSubjects.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.name}</td>
                      <td className="text-primary">
                        Semester {subject.semester}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center text-muted">
                      No assigned subjects
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card> */}

          {/* Remuneration Summary */}

          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-semibold mb-0">Remuneration Summary</h5>
            </div>

            {remuneration?.breakdown && remuneration.breakdown.length > 0 ? (
              // Group by year
              [
                ...new Set(remuneration.breakdown.map((i) => i.academicYear)),
              ].map((year, yIdx) => {
                const yearGroup = remuneration.breakdown.filter(
                  (i) => i.academicYear === year
                );

                return (
                  <div key={yIdx} className="mb-4">
                    <h6 className="fw-bold text-primary mb-2">
                      Academic Year: {year}
                    </h6>

                    {["Odd", "Even"].map((semType, sIdx) => {
                      const semGroup = yearGroup.filter(
                        (i) => i.semesterType === semType
                      );
                      if (semGroup.length === 0) return null;

                      return (
                        <div key={sIdx} className="mb-3 ps-3">
                          <p className="fw-semibold text-secondary mb-1">
                            {semType} Semester
                          </p>

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
                                <th>Remuneration</th>
                              </tr>
                            </thead>
                            <tbody>
                              {semGroup.map((item, idx) => (
                                <tr key={idx}>
                                  <td>
                                    <button
                                      className="btn btn-link p-0 text-decoration-none fw-medium text-primary"
                                      onClick={() =>
                                        navigate(
                                          `/admin/facultymanager/details/${id}/subject/${item.subjectId}/${item.academicYear}`
                                        )
                                      }
                                      style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        textAlign: "left",
                                      }}
                                    >
                                      {item.subjectName}
                                    </button>
                                  </td>

                                  {/* <td>{item.subjectName}</td> */}
                                  <td className="text-primary">
                                    Semester {item.semester}
                                  </td>
                                  <td className="text-success fw-semibold">
                                    ₹{item.subjectTotal}
                                  </td>
                                </tr>
                              ))}

                              {/* One row per sem-type for the Sem Slip */}
                              <tr>
                                <td colSpan={3} className="text-center">
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => {
                                      const paymentId = semGroup[0]?.paymentId; // pick the paymentId for this semType
                                      if (paymentId) {
                                        window.open(
                                          `https://rcoe-remune-track.onrender.com/payment/generate-pdf/${paymentId}`,
                                          "_blank"
                                        );
                                      } else {
                                        console.error(
                                          "❌ No paymentId found for",
                                          semType,
                                          year
                                        );
                                      }
                                    }}
                                  >
                                    Generate {semType} Slip
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      );
                    })}

                    {/* One row per year for Yearly Slip */}
                    <div className="ps-3 mt-2">
                      <Table
                        bordered
                        hover
                        responsive
                        striped
                        className="align-middle mb-0"
                      >
                        <tbody>
                          <tr>
                            <td className="text-center">
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => {
                                  if (id) {
                                    window.open(
                                      `https://rcoe-remune-track.onrender.com/payment/generate-pdf/${id}/${year}`,
                                      "_blank"
                                    );
                                  } else {
                                    console.error(
                                      "❌ No paymentId found for",
                                      // semType,
                                      year
                                    );
                                  }
                                }}
                                /* onClick={() =>
                                  navigate(
                                    `https://rcoe-remune-track.onrender.com/payment/generate-pdf/${id}/${year}`
                                  )
                                } */
                              >
                                Generate Yearly Slip
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-muted mb-0">No remuneration records found</p>
            )}
          </Card>

          {/* ChatGpt 2 */}
          {/* <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h5 className="fw-semibold mb-0">Remuneration Summary</h5>
  </div>

  {remuneration?.breakdown && remuneration.breakdown.length > 0 ? (
    // Group by Academic Year
    [...new Set(remuneration.breakdown.map(item => item.academicYear))].map((year, yIdx) => {
      const yearGroup = remuneration.breakdown.filter(item => item.academicYear === year);

      return (
        <div key={yIdx} className="mb-4">
          <h6 className="fw-bold text-primary mb-2">Academic Year: {year}</h6>

          {/* Odd & Even semester grouping 
          {["Odd", "Even"].map((semType, sIdx) => {
            const semGroup = yearGroup.filter(item => item.semesterType === semType);
            if (semGroup.length === 0) return null;

            return (
              <div key={sIdx} className="mb-3 ps-3">
                <p className="fw-semibold text-secondary mb-1">{semType} Semester</p>

                <Table bordered hover responsive striped className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Subject Name</th>
                      <th>Semester</th>
                      <th>Remuneration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semGroup.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.subjectName}</td>
                        <td className="text-primary">Semester {item.semester}</td>
                        <td className="text-success fw-semibold">₹{item.subjectTotal}</td>
                      </tr>
                    ))}

                    // ✅ One row only for slips 
                    <tr>
                      <td colSpan={3} className="text-center">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() =>
                            navigate(`/admin/payment/semSlip/${id}/${year}/${semType}`)
                          }
                        >
                          Generate {semType} Slip
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() =>
                            navigate(`/admin/payment/yearSlip/${id}/${year}`)
                          }
                        >
                          Generate Yearly Slip
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            );
          })}
        </div>
      );
    })
  ) : (
    <p className="text-muted mb-0">No remuneration records found</p>
  )}
</Card> */}

          {/* ChatGpt 1 */}
          {/* Remuneration Summary */}
          {/*  <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h5 className="fw-semibold mb-0">Remuneration Summary</h5>
  </div>

  {remuneration?.breakdown && remuneration.breakdown.length > 0 ? (
    // Group by Academic Year
    [...new Set(remuneration.breakdown.data.map(item => item.academicYear))].map((year, yIdx) => {
      const yearGroup = remuneration.breakdown.data.filter(item => item.academicYear === year);

      return (
        <div key={yIdx} className="mb-4">
          <h6 className="fw-bold text-primary mb-2">Academic Year: {year}</h6>

          {/* // Odd & Even semester grouping  
          {["Odd", "Even"].map((semType, sIdx) => {
            const semGroup = yearGroup.filter(item => item.semesterType === semType);
            if (semGroup.length === 0) return null;

            return (
              <div key={sIdx} className="mb-3 ps-3">
                <p className="fw-semibold text-secondary mb-1">{semType} Semester</p>

                <Table bordered hover responsive striped className="align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Subject Name</th>
                      <th>Semester</th>
                      <th>Remuneration</th>
                      <th>Sem Slip</th>
                      <th>Yearly Slip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semGroup.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.subjectName}</td>
                        <td className="text-primary">Semester {item.semester}</td>
                        <td className="text-success fw-semibold">₹{item.subjectTotal}</td>
                        <td className="text-center">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/payment/semSlip/${id}/${item.academicYear}/${semType}`)
                            }
                          >
                            Generate {semType} Slip
                          </Button>
                        </td>
                        <td className="text-center">
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/payment/yearSlip/${id}/${item.academicYear}`)
                            }
                          >
                            Generate Yearly Slip
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            );
          })}
        </div>
      );
    })
  ) : (
    <p className="text-muted mb-0">No remuneration records found</p>
  )}
</Card> */}

          {/* Original */}
          {/*  <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
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
                  <th>Academic Year</th>
                  <th>Semester</th>
                  <th>Subject Name</th>
                  <th>Remuneration Amount</th>
                </tr>
              </thead>
              <tbody>
                {remuneration?.breakdown?.length > 0 ? (
                  remuneration.breakdown.map((item, index) => (
                    <tr key={index}>
                      <td>{item.academicYear}</td>
                      <td className="text-primary">Semester {item.semester}</td>
                      <td>
                        <button
                          className="btn btn-link p-0 text-decoration-none fw-medium text-primary"
                          onClick={() =>
                            navigate(
                              `/admin/facultymanager/details/${id}/subject/${item.subjectId}/${item.academicYear}`
                            )
                          }
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          {item.subjectName}
                        </button>
                      </td>
                      <td className="text-success">₹{item.subjectTotal}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      No remuneration data found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
}

export default FacultyDetails;
