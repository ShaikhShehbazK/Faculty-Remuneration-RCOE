import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginRole, setLoginRole] = useState("faculty");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    adminId: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload =
      loginRole === "faculty"
        ? {
            email: formData.username,
            password: formData.password,
          }
        : {
            email: formData.adminId,
            password: formData.password,
          };

    try {
      if (loginRole === "admin") {
        const response = await axios.post(
          "http://localhost:3002/admin/login",
          payload
        );
        if (response.data.token) {
          alert("Admin Login Successful ✅");
          localStorage.setItem("token", response.data.token);
          setFormData({ username: "", password: "", adminId: "" });
          navigate("/admin/payments");
        } else {
          alert("Unexpected response from server");
        }
      } else {
        const response = await axios.post(
          "http://localhost:3002/faculty/login",
          payload
        );

        if (response.data.token) {
          alert("Faculty Login Successful ✅");
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", "faculty");
          localStorage.setItem("facultyId", response.data.id); // 👈 save id for dashboard
          setFormData({ username: "", password: "", adminId: "" });
          navigate("/faculty/dashboard"); // 👈 redirect to faculty dashboard
        }
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed. Check console.");
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center border-bottom px-4 py-3 bg-white shadow-sm">
        <div className="d-flex align-items-center gap-3">
          <img
            src="/rcoe-logo.jpg"
            alt="Logo"
            height="40"
            style={{ objectFit: "contain" }}
          />
          <h5 className="mb-0 fw-bold text-dark">
            Faculty Remuneration Portal
          </h5>
        </div>
      </header>

      {/* Main */}
      <main className="container my-5 d-flex flex-column align-items-center justify-content-center flex-grow-1">
        {/* College Banner */}
        <div className="text-center mb-4 w-100" style={{ maxWidth: "700px" }}>
          <img
            src="/college-banner.jpg"
            className="img-fluid rounded"
            alt="College Banner"
            style={{ maxHeight: "200px", width: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Title */}
        <h3 className="fw-bold text-center text-primary mb-4">
          Rizvi College of Engineering
        </h3>

        {/* Role Tabs */}
        <ul className="nav nav-tabs mb-4">
          {["admin", "faculty"].map((role) => (
            <li className="nav-item" key={role}>
              <button
                className={`nav-link ${
                  loginRole === role ? "active fw-bold" : "text-secondary"
                }`}
                onClick={() => setLoginRole(role)}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-100 bg-white shadow-sm rounded p-4"
          style={{ maxWidth: "400px" }}
        >
          {loginRole === "faculty" ? (
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your faculty username"
                required
              />
            </div>
          ) : (
            <div className="mb-3">
              <label className="form-label">Admin Email</label>
              <input
                type="email"
                name="adminId"
                className="form-control"
                value={formData.adminId}
                onChange={handleInputChange}
                placeholder="Enter admin email"
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={(e) => {
                e.target.readOnly = false;
              }}
              readOnly
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="small text-muted">Remember Me</span>
            <input type="checkbox" className="form-check-input" />
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-primary rounded-pill py-2 fw-bold">
              Login
            </button>
          </div>

          <p className="text-center">
            <button
              className="btn btn-link text-decoration-none small"
              onClick={() => navigate(`/forgot-password?role=${loginRole}`)}
              type="button"
            >
              Forgot Password?
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;
