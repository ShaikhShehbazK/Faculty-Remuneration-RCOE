import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  InputGroup,
  Form,
  Offcanvas,
  Alert,
  Modal,
} from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../AdminSidebar";
import api from "../../../utils/api";

function SubjectsManagement() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjectData, setSubjectData] = useState({
    name: "",
    code: "",
    semester: "",
    department: "",
    hasTermTest: false,
    hasPractical: false,
    hasSemesterExam: false,
  });

  const handleSidebarOpen = () => setShowSidebar(true);
  const handleSidebarClose = () => setShowSidebar(false);

  // Fetch Subjects
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        "https://rcoe-remune-track.onrender.com/faculty/subject/getList"
      );
      setSubjects(res.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch subjects:", err);
      setError("Failed to load subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Add/Edit Modal
  const handleShowModal = (subject = null) => {
    if (subject) {
      setEditingSubject(subject._id);
      setSubjectData({
        name: subject.name,
        code: subject.code,
        semester: subject.semester,
        department: subject.department,
        hasTermTest: subject.hasTermTest,
        hasPractical: subject.hasPractical,
        hasSemesterExam: subject.hasSemesterExam,
      });
    } else {
      setEditingSubject(null);
      setSubjectData({
        name: "",
        code: "",
        semester: "",
        department: "",
        hasTermTest: false,
        hasPractical: false,
        hasSemesterExam: false,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSubjectData({
      ...subjectData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Save Subject (Create or Update)
  const handleSave = async () => {
    try {
      if (editingSubject) {
        await api.put(
          `https://rcoe-remune-track.onrender.com/faculty/subject/update/${editingSubject}`,
          subjectData
        );
        alert("Subject updated successfully");
      } else {
        await api.post(
          "https://rcoe-remune-track.onrender.com/faculty/subject/create",
          subjectData
        );
        alert("Subject created successfully");
      }
      handleCloseModal();
      fetchSubjects();
    } catch (err) {
      console.error("Failed to save subject:", err);
      alert("Failed to save subject. Please try again.");
    }
  };

  // Delete Subject
  const handleDelete = async (subjectId, subjectName) => {
    if (window.confirm(`Are you sure you want to delete ${subjectName}?`)) {
      try {
        await api.delete(
          `https://rcoe-remune-track.onrender.com/faculty/subject/delete/${subjectId}`
        );
        alert("Subject deleted successfully");
        fetchSubjects();
      } catch (err) {
        console.error("Failed to delete subject:", err);
        alert("Failed to delete subject. Please try again.");
      }
    }
  };

  // Filter subjects by search
  const filteredSubjects = subjects.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Mobile Header */}
      <div className="d-flex d-md-none align-items-center mb-3">
        <Button
          variant="outline-primary"
          className="me-2"
          onClick={handleSidebarOpen}
        >
          <FaBars size={20} />
        </Button>
        <h5 className="mb-0 fw-bold">Subjects Management</h5>
      </div>

      <Row>
        {/* Sidebar Offcanvas (Mobile) */}
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
            <AdminSidebar />
          </Offcanvas.Body>
        </Offcanvas>

        {/* Sidebar Desktop */}
        <Col md={3} className="d-none d-md-block">
          <Card
            className="shadow-sm border-0 rounded-4 p-3 sticky-top"
            style={{ minHeight: "90vh" }}
          >
            <AdminSidebar />
          </Card>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <div className="d-none d-md-block">
            <h2 className="fw-bold mb-1">Subjects Management</h2>
            <p className="text-primary mb-4">Manage subject records</p>
          </div>

          {/* Error */}
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          {/* Search */}
          <Card className="mb-4 p-3 shadow rounded-4 border-0 bg-white">
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                className="border-start-0"
                placeholder="Search by name, code, or department"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Card>

          {/* Add Button */}
          <div className="d-flex justify-content-end mb-3">
            <Button
              variant="primary"
              className="rounded-pill d-flex align-items-center gap-2"
              onClick={() => handleShowModal()}
            >
              <FaPlus /> Add Subject
            </Button>
          </div>

          {/* Table */}
          <Card className="mb-4 p-4 shadow rounded-4 border-0 bg-white">
            <h5 className="fw-bold mb-3">Subject List</h5>

            {loading ? (
              <div className="text-center py-4">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
                <p className="mt-2 text-muted">Loading subjects...</p>
              </div>
            ) : filteredSubjects.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted">No subjects found.</p>
              </div>
            ) : (
              <Table bordered hover responsive striped className="align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    {/* <th>Code</th> */}
                    <th>Semester</th>
                    <th>Department</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.map((subject) => (
                    <tr key={subject._id}>
                      <td>{subject.name}</td>
                      {/* <td>{subject.code}</td> */}
                      <td>{subject.semester}</td>
                      <td>{subject.department}</td>
                      <td>
                        <Button
                          variant="link"
                          className="p-0 me-2 text-decoration-none"
                          onClick={() => handleShowModal(subject)}
                        >
                          <FaEdit className="me-1" /> Edit
                        </Button>
                        <Button
                          variant="link"
                          className="p-0 text-danger text-decoration-none"
                          onClick={() =>
                            handleDelete(subject._id, subject.name)
                          }
                        >
                          <FaTrash className="me-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSubject ? "Edit Subject" : "Add Subject"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={subjectData.name}
                onChange={handleChange}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Subject Code</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={subjectData.code}
                onChange={handleChange}
              />
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>Semester</Form.Label>
              <Form.Control
                type="number"
                name="semester"
                value={subjectData.semester}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={subjectData.department}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Has Term Test"
              name="hasTermTest"
              checked={subjectData.hasTermTest}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="Has Practical/Oral"
              name="hasPractical"
              checked={subjectData.hasPractical}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="Has Semester Exam"
              name="hasSemesterExam"
              checked={subjectData.hasSemesterExam}
              onChange={handleChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingSubject ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SubjectsManagement;
