import { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Badge,
  Table,
} from "react-bootstrap";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaLayerGroup,
  FaPlus,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Select from "react-select";
import api from "../../../utils/api";
import axios from "axios";

function UpdateAssignment({ onSubmit }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // ✅ Get faculty details from previous page
  const { facultyName } = location.state || {};

  const [formData, setFormData] = useState({
    academicYear: "",
    semesterType: "",
    semester: "",
    subjects: [],
  });

  const [subjectOptions, setSubjectOptions] = useState([]);
  const [faculty, setFaculty] = useState([]);

  // 1) Fetch faculty
  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const facultyRes = await axios.get(
          `https://rcoe-remune-track.onrender.com/admin/faculty/getSingle/${id}`
        );
        console.log("✅ Getting Faculty Details", facultyRes.data);
        setFaculty(facultyRes.data);
      } catch (err) {
        console.error("❌ Error fetching faculty:", err);
      }
    };
    fetchFacultyDetails();
  }, [id]);

  // Filter semesters based on type
  const getSemesterOptions = () => {
    if (formData.semesterType === "Odd") return [1, 3, 5, 7];
    if (formData.semesterType === "Even") return [2, 4, 6, 8];
    return [];
  };

  // 2) Fetch subjects based on selected semester
  useEffect(() => {
    const fetchSubjects = async () => {
      if (formData.semester && formData.semester !== "Select") {
        try {
          const res = await axios.get(
            `https://rcoe-remune-track.onrender.com/faculty/subject/getList?semester=${formData.semester}`
          );
          const subjectNames = res.data.map((subj) => subj.name);
          setSubjectOptions(subjectNames);
        } catch (err) {
          console.error("Failed to fetch subjects:", err);
          if (err.response?.status === 401) {
            alert("Authentication failed. Please login again.");
            navigate("/");
          }
        }
      } else {
        setSubjectOptions([]);
      }
    };

    fetchSubjects();
  }, [formData.semester, navigate]);

  // Handle add subject
  const handleAddSubject = (e) => {
    e.preventDefault();
    if (formData.semester && formData.subject) {
      if (
        !formData.subjects.some(
          (s) => s.name === formData.subject && s.semester === formData.semester
        )
      ) {
        setFormData((prev) => ({
          ...prev,
          subjects: [
            ...prev.subjects,
            { name: formData.subject, semester: formData.semester },
          ],
        }));
      }
    }
  };

  /* const handleAddSubject = (e) => {
    e.preventDefault();
    if (formData.semester && formData.subject) {
      if (!formData.subjects.includes(formData.subject)) {
        setFormData((prev) => ({
          ...prev,
          subjects: [...prev.subjects, formData.subject],
        }));
      }
    }
  }; */

  // ✅ Pass all required params
  const handleDeleteSubject = async (academicYear, semesterType, subjectId) => {
    try {
      if (!subjectId) {
        console.error("❌ Missing subjectId for deletion");
        return;
      }

      await axios.put(
        `https://rcoe-remune-track.onrender.com/admin/faculty/${id}/remove-subject`,
        {
          academicYear,
          semesterType,
          subjectId,
        }
      );

      // Update UI: remove the subject from local faculty state
      setFaculty((prev) => {
        const updatedAssigned = prev.assignedSubjects
          .map((yearBlock) => {
            if (yearBlock.academicYear !== academicYear) return yearBlock;

            return {
              ...yearBlock,
              semesters: yearBlock.semesters
                .map((semBlock) => {
                  if (semBlock.semesterType !== semesterType) return semBlock;

                  return {
                    ...semBlock,
                    subjects: semBlock.subjects.filter(
                      (subj) => subj.subjectId !== subjectId
                    ),
                  };
                })
                .filter((s) => s.subjects.length > 0), // cleanup empty semesters
            };
          })
          .filter((y) => y.semesters.length > 0); // cleanup empty year blocks

        return { ...prev, assignedSubjects: updatedAssigned };
      });
    } catch (err) {
      console.error("Error removing subject:", err);
    }
  };

  const handleRemoveAssignment = (index) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index),
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://rcoe-remune-track.onrender.com/admin/faculty/${id}/update`,
        {
          academicYear: formData.academicYear,
          semesterType: formData.semesterType,
          subjects:
            formData.subjects /* .map((subj) => ({ name: subj.name, semester: subj.semester, })), */,
        }
      );

      // reset
      setFormData({
        academicYear: "",
        semesterType: "",
        semester: "",
        subjects: [],
      });

      // Hard refresh page
      window.location.reload();

      // navigate(-1); // go back
    } catch (err) {
      console.error("Error updating assignments:", err);
      alert("Failed to update assignments");
    }
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, facultyId }); // ✅ attach facultyId
  }; */

  const handleGoBack = () => {
    navigate(
      `https://rcoe-remune-track.onrender.com/admin/facultymanager/details/${id}`
    );
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <h4 className="fw-bold mb-4 text-primary d-flex align-items-center gap-2">
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
          <h4 className="fw-bold mb-1 mb-sm-0">Update Assignments</h4>
        </div>
      </h4>

      <Card
        className="mb-4 p-4 mt-4 shadow rounded-4 border-0 bg-white"
        /* className="shadow rounded-4 border-0 p-4 bg-white mx-auto"
        style={{ maxWidth: 800 }} */
      >
        {/* ✅ Faculty Name Display */}
        {facultyName && (
          <h5 className="fw-bold mb-3 text-success d-flex align-items-center gap-2">
            <FaUser className="text-secondary" />
            Faculty: {facultyName} - {id}
          </h5>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Academic Year & Semester Type */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaCalendarAlt className="me-2 text-secondary" /> Academic
                  Year
                </Form.Label>
                <Form.Select
                  value={formData.academicYear}
                  onChange={(e) => {
                    const start = e.target.value;
                    const end = (parseInt(start) + 1).toString().slice(-2);
                    setFormData({
                      ...formData,
                      academicYear: `${start}-${end}`,
                    });
                  }}
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 6 }, (_, i) => 2023 + i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
                {formData.academicYear && (
                  <div className="mt-2">
                    <Badge bg="info">
                      📅 Selected Academic Year:{" "}
                      <strong>{formData.academicYear}</strong>
                    </Badge>
                  </div>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FaLayerGroup className="me-2 text-secondary" /> Semester Type
                </Form.Label>
                <Form.Select
                  value={formData.semesterType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      semesterType: e.target.value,
                      semester: "",
                    })
                  }
                  required
                >
                  <option value="">Select Semester Type</option>
                  <option value="Odd">Odd</option>
                  <option value="Even">Even</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Semester & Subject */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>
                <Select
                  options={getSemesterOptions().map((sem) => ({
                    value: sem,
                    label: `Semester ${sem}`,
                  }))}
                  value={
                    formData.semester
                      ? {
                          value: formData.semester,
                          label: `Semester ${formData.semester}`,
                        }
                      : null
                  }
                  onChange={(selected) =>
                    setFormData({
                      ...formData,
                      semester: selected ? selected.value : "",
                    })
                  }
                  placeholder="Select Semester"
                  isDisabled={!formData.semesterType}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Subjects</Form.Label>
                <div className="d-flex gap-2">
                  <div style={{ flex: 1 }}>
                    <Select
                      options={subjectOptions.map((sub) => ({
                        value: sub,
                        label: sub,
                      }))}
                      value={
                        formData.subject
                          ? { value: formData.subject, label: formData.subject }
                          : null
                      }
                      onChange={(selected) =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: selected ? selected.value : "",
                        }))
                      }
                      placeholder="Select Subject"
                      isDisabled={!formData.semester}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline-primary"
                    onClick={handleAddSubject}
                  >
                    <FaPlus />
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Assigned Subjects */}
          {formData.subjects.length > 0 && (
            <div className="mb-3">
              <h6 className="fw-bold">Assigned Subjects:</h6>
              <ul className="list-group">
                {formData.subjects.map((subj, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {subj.name} - Sem {subj.semester}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveAssignment(index)}
                    >
                      <FaTrash />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit */}
          <div className="text-end mt-4">
            <Button
              type="submit"
              variant="primary"
              className="fw-bold px-4 py-2 rounded-pill"
            >
              Save Assignments
            </Button>
          </div>
        </Form>
      </Card>

      {/* Assigned Subjects */}
      <Card className="mb-4 p-4 mt-4 shadow rounded-4 border-0 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-semibold mb-0">Assigned Subjects</h5>
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
                        <th>Action</th>
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
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() =>
                                handleDeleteSubject(
                                  yearGroup.academicYear,
                                  semGroup.semesterType,
                                  subj.subjectId
                                )
                              }
                            >
                              Remove
                            </Button>
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
    </Container>
  );
}

export default UpdateAssignment;
