import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { FaArrowLeft, FaUserPlus, FaUserTie, FaBookOpen, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AddFacultyForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    designation: '',
    email: '',
    phone: '',
    baseSalary: '', // new field
    travelAllowance: '',
    semester: '',
    subject: '',
  });

  const [assignedSubjects, setAssignedSubjects] = useState([]); // [{ semester, subject }]

  const [success, setSuccess] = useState(false);

  const departments = ['Computer', 'Mechanical', 'Electrical', 'Civil', 'AIDS', 'ECS'];
  const designations = ['Professor', 'Associate Professor', 'Assistant Professor', 'HoD'];
  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
  const subjects = ['Data Structures', 'Operating Systems', 'Algorithms', 'Calculus'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (formData.semester && formData.subject && formData.semester !== 'Select' && formData.subject !== 'Select') {
      // Prevent duplicate assignments
      const exists = assignedSubjects.some(
        (a) => a.semester === formData.semester && a.subject === formData.subject
      );
      if (!exists) {
        setAssignedSubjects(prev => [...prev, { semester: formData.semester, subject: formData.subject }]);
      }
      // Clear subject selection after adding
      setFormData(prev => ({ ...prev, subject: '', semester: '' }));
    }
  };

  const handleRemoveAssignment = (index) => {
    setAssignedSubjects(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 👉 Replace with API call
    const facultyData = {
      ...formData,
      assignedSubjects,
    };
    console.log('Faculty data submitted:', facultyData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  const handleGoBack = () => {
    navigate('/admin/facultymanager');
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">

      {/* Header (Back Button + Heading) */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="outline-secondary" className="d-flex align-items-center gap-2" onClick={handleGoBack}>
          <FaArrowLeft /> Back
        </Button>
        <h2 className="fw-bold mb-0">Add Faculty Member</h2>
      </div>

      {/* Card that contains Form */}
      <Card className="shadow rounded-4 border-0 p-4 bg-white mx-auto" style={{ maxWidth: 900 }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* First Part Of Form i.e Faculty Details */}
            <Col md={6}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <FaUserTie className="text-primary" />
                <h5 className="fw-bold mb-0">Faculty Details</h5>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={formData.name} onChange={handleChange} placeholder="Enter faculty name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Select name="department" value={formData.department} onChange={handleChange}>
                  <option>Select</option>
                  {departments.map((dep, idx) => <option key={idx} value={dep}>{dep}</option>)}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Form.Select name="designation" value={formData.designation} onChange={handleChange}>
                  <option>Select</option>
                  {designations.map((designation, idx) => <option key={idx} value={designation}>{designation}</option>)}
                </Form.Select>
              </Form.Group>
              {/* Remuneration Details Section */}
              <div className="d-flex align-items-center gap-2 mb-3 mt-4">
                <FaUserPlus className="text-success" />
                <h5 className="fw-bold mb-0">Remuneration Details</h5>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Base Salary</Form.Label>
                <Form.Control name="baseSalary" value={formData.baseSalary} onChange={handleChange} placeholder="Enter base salary" type="number" min="0" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Travel Allowance</Form.Label>
                <Form.Control name="travelAllowance" value={formData.travelAllowance} onChange={handleChange} placeholder="Enter travel allowance" type="number" min="0" />
              </Form.Group>
            </Col>

            {/* Second Part Of Form i.e Contact & Assignment + Subject Assignment */}
            <Col md={6}>
              <div className="d-flex align-items-center gap-2 mb-3 mt-4 mt-md-0">
                <FaEnvelope className="text-primary" />
                <h5 className="fw-bold mb-0">Contact & Assignment</h5>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
              </Form.Group>

              {/* Subject Assignment Section - moved here for better balance */}
              <Card className="shadow-sm rounded-3 border-0 p-3 mt-4 bg-light">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FaBookOpen className="text-primary" />
                  <h5 className="fw-bold mb-0">Subject Assignments</h5>
                </div>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Semester</Form.Label>
                      <Form.Select name="semester" value={formData.semester} onChange={handleChange}>
                        <option>Select</option>
                        {semesters.map((sem, idx) => <option key={idx} value={sem}>{sem}</option>)}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Subjects</Form.Label>
                      <Form.Select name="subject" value={formData.subject} onChange={handleChange}>
                        <option>Select</option>
                        {subjects.map((sub, idx) => <option key={idx} value={sub}>{sub}</option>)}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mb-3">
                  <Button variant="outline-primary" className="fw-bold px-3 py-1 rounded-pill" onClick={handleAddAssignment} disabled={!(formData.semester && formData.subject && formData.semester !== 'Select' && formData.subject !== 'Select')}>
                    Add Assignment
                  </Button>
                </div>
                {/* Assigned Subjects List */}
                {assignedSubjects.length > 0 && (
                  <div className="mb-2">
                    <h6 className="fw-bold">Assigned Subjects:</h6>
                    <ul className="list-group">
                      {assignedSubjects.map((a, idx) => (
                        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                          <span>{a.semester} - {a.subject}</span>
                          <Button variant="danger" size="sm" onClick={() => handleRemoveAssignment(idx)}>
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </Col>
          </Row>

          <div className="text-end mt-3">
            <Button type="submit" variant="primary" className="fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-pill">
              <FaUserPlus /> Add Faculty
            </Button>
          </div>

          {success && (
            <Alert variant="success" className="mt-4 rounded-3 shadow-sm">
              Faculty member <strong>{formData.name}</strong> added successfully. <a href="#" className="fw-bold text-primary text-decoration-underline">View Profile</a>
            </Alert>
          )}
          
        </Form>
      </Card>

    </Container>
  );
};

export default AddFacultyForm;
