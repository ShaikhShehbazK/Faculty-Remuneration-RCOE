import React, { useState , useEffect } from 'react';
import { Container, Form, Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { FaArrowLeft, FaUserPlus, FaUserTie, FaBookOpen, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import Select from 'react-select';
import axios from 'axios';

function AddFacultyForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    designation: '',
    email: '',
    password: '',
    phone: '',
    baseSalary: '', 
    travelAllowance: '',
    semester: '',
    subject: '',
  });

  const [assignedSubjects, setAssignedSubjects] = useState([]); // [{ semester, subject }]

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [subjectOptions, setSubjectOptions] = useState([]);

  const departments = ['Computer', 'Mechanical', 'Electrical', 'Civil', 'AIDS', 'ECS'];
  const designations = ['Professor', 'Associate Professor', 'Assistant Professor', 'HoD', 'External Examiner'];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  /* const subjects = ['Data Structures', 'Operating Systems', 'Algorithms', 'Calculus']; */

  useEffect(() => {
  const fetchSubjects = async () => {
    console.log("Fetching subjects for semester:", formData.semester);
    if (formData.semester && formData.semester !== 'Select') {
      try {
        //Sending token to backend for authentication 
       /* const token = JSON.parse(localStorage.getItem("token"));
        console.log(token);
        const header = {
          headers: {
            Authorization: `Bearer ${token}`, //Passing the token in Authorization Header
          },
        };  */
        const res = await api.get(`/faculty/subject/getList?semester=${formData.semester}`);
        console.log(res.data);

        const subjectNames = res.data.map((subj) => subj.name); // assuming Subject has a 'name'
        setSubjectOptions(subjectNames);
      } catch (err) {
        console.error('Failed to fetch subjects:', err);
        if (err.response?.status === 401) {
          alert('Authentication failed. Please login again.');
          navigate('/login');
        }
      }
    } else {
      setSubjectOptions([]); // clear when no semester selected
    }
  };

  fetchSubjects();
}, [formData.semester, navigate]);


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
      // Clear subject selection field after adding
      setFormData(prev => ({ ...prev, subject: '', semester: '' }));
    }
  };

  const handleRemoveAssignment = (index) => {
    setAssignedSubjects(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Format the data according to backend expectations
      const facultyData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        department: formData.department,
        designation: formData.designation,
        baseSalary: Number(formData.baseSalary),
        travelAllowance: Number(formData.travelAllowance),
        subjects: assignedSubjects.map(subject => ({
          name: subject.subject,
          semester: Number(subject.semester)
        }))
      };

      const response = await api.post('/admin/faculty/add', facultyData);
      
      console.log('Faculty created successfully:', response.data);
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        department: '',
        designation: '',
        email: '',
        password: '',
        phone: '',
        baseSalary: '', 
        travelAllowance: '',
        semester: '',
        subject: '',
      });
      setAssignedSubjects([]);
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error creating faculty:', err);
      if (err.response?.status === 401) {
        alert('Authentication failed. Please login again.');
        navigate('/login');
      } else {
        setError(err.response?.data?.error || 'Failed to create faculty. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
                <Form.Control name="name" value={formData.name} onChange={handleChange} placeholder="Enter faculty name" required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Select
                  options={departments.map(dep => ({ value: dep, label: dep }))}
                  value={formData.department ? { value: formData.department, label: formData.department } : null}
                  onChange={selected => setFormData(prev => ({ ...prev, department: selected ? selected.value : '' }))}
                  placeholder="Select Department"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Select
                  options={designations.map(des => ({ value: des, label: des }))}
                  value={formData.designation ? { value: formData.designation, label: formData.designation } : null}
                  onChange={selected => setFormData(prev => ({ ...prev, designation: selected ? selected.value : '' }))}
                  placeholder="Select Designation"
                  required
                />
              </Form.Group>

              {/* Remuneration Details Section */}
              <div className="d-flex align-items-center gap-2 mb-3 mt-4">
                <FaUserPlus className="text-success" />
                <h5 className="fw-bold mb-0">Remuneration Details</h5>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Base Salary</Form.Label>
                <Form.Control name="baseSalary" value={formData.baseSalary} onChange={handleChange} placeholder="Enter base salary" type="number" min="0" required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Travel Allowance</Form.Label>
                <Form.Control name="travelAllowance" value={formData.travelAllowance} onChange={handleChange} placeholder="Enter travel allowance" type="number" min="0" required/>
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
                <Form.Control name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required/>
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
                      <Select
                        options={semesters.map(sem => ({ value: sem, label: `Semester ${sem}` }))}
                        value={formData.semester ? { value: formData.semester, label: `Semester ${formData.semester}` } : null}
                        onChange={selected => setFormData(prev => ({ ...prev, semester: selected ? selected.value : '' }))}
                        placeholder="Select Semester"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Subjects</Form.Label>
                      <Select
                        options={subjectOptions.map(sub => ({ value: sub, label: sub }))}
                        value={formData.subject ? { value: formData.subject, label: formData.subject } : null}
                        onChange={selected => setFormData(prev => ({ ...prev, subject: selected ? selected.value : '' }))}
                        placeholder="Select Subject"
                        required
                      />
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
            <Button 
              type="submit" 
              variant="primary" 
              className="fw-bold px-4 py-2 d-flex align-items-center gap-2 rounded-pill"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Creating...
                </>
              ) : (
                <>
                  <FaUserPlus /> Add Faculty
                </>
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="danger" className="mt-4 rounded-3 shadow-sm">
              <strong>Error:</strong> {error}
            </Alert>
          )}

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
