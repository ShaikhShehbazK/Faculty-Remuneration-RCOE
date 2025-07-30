import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginRole, setLoginRole] = useState("faculty"); // faculty or admin
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

/*
const handleSubmit = (e) => {
  e.preventDefault();
  const payload = {
     role: loginRole, 
    ...(loginRole === "faculty"
      ? { username: formData.username, password: formData.password }
      : { adminId: formData.adminId, password: formData.password }),
  };
  console.log("Submitting:", payload); 
  // Send `payload` to backend
}; 
*/

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload =
    loginRole === "faculty"
      ? {
          username: formData.username,
          password: formData.password,
        }
      : {
          email: formData.adminId, // Temporarily using adminId field as email.
          password: formData.password,
        };

  try {
    if (loginRole === "admin") {
      const response = await axios.post("http://localhost:3002/admin/login", payload);

      if (response.data.token) {
        alert("Admin Login Successful ✅");

        // Save token
        localStorage.setItem("token", response.data.token);

        // Clear form
        setFormData({
          username: "",
          password: "",
          adminId: "",
        });

        // Navigate to /admin/payments
        navigate("/admin/payments");
      } else {
        alert("Unexpected response from server");
      }
    } else {
      alert("Faculty login not implemented yet");
    }
  } catch (err) {
    console.error("Login failed:", err);
    alert(
      err?.response?.data?.message || "Login failed. Check console for details."
    );
  }
};


  return (
    <>
      <div className="min-vh-100 bg-light d-flex flex-column">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center border-bottom px-4 py-3 bg-white shadow-sm">
          <div className="d-flex align-items-center gap-3">
            {/* RCOE Logo */}
            <img
              src="rcoe logo.jpg"
              alt=""
              height="40"
              style={{ objectFit: "contain" }}
            />
            <h5 className="mb-0 fw-bold">Faculty Remuneration System</h5>
          </div>
          {/* <a href="#" className="text-primary fw-medium">Sign Up</a> */}
        </header>

        {/* Main */}
        <main className="container my-5 d-flex flex-column align-items-center justify-content-center flex-grow-1">
          {/* Image */}
          <div className="text-center mb-4 w-100" style={{ maxWidth: "700px" }}>
            <img
              src="863c57b1.jpg"
              className="img-fluid rounded"
              alt="College Banner"
              style={{ maxHeight: "220px", width: "100%", objectFit: "cover" }}
            />
          </div>

          <h3 className="fw-bold text-center mb-3">
            Welcome to Rizvi College of Engineering
          </h3>

          {/* Role Tabs */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ₹{
                  loginRole === "admin" ? "active fw-bold" : "text-secondary"
                }`}
                onClick={() => setLoginRole("admin")}
              >
                Admin
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ₹{
                  loginRole === "faculty" ? "active fw-bold" : "text-secondary"
                }`}
                onClick={() => setLoginRole("faculty")}
              >
                Faculty
              </button>
            </li>
          </ul>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="w-100"
            style={{ maxWidth: "400px" }}
          >
            {loginRole === "faculty" ? (
              <>
                {/* Enter Faculty Username */}
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control bg-light border-0 shadow-sm"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                {/* Enter Admin ID */}
                <div className="mb-3">
                  <label className="form-label">Admin ID</label>
                  <input
                    type="email"
                    name="adminId"
                    className="form-control bg-light border-0 shadow-sm"
                    value={formData.adminId}
                    onChange={handleInputChange}
                    placeholder="Enter your admin ID"
                    required
                  />
                </div>
              </>
            )}

            {/* Enter Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control bg-light border-0 shadow-sm"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Remember Me */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span>Remember Me</span>
              <input type="checkbox" className="form-check-input" />
            </div>

            {/* Login Button */}
            <div className="d-grid mb-2">
              <button
                className="btn btn-primary fw-bold rounded-pill py-2"
                type="submit"
              >
                Login
              </button>
            </div>

            {/* Forgot Password */}
            <p className="text-center text-muted small">
              <a href="#" className="text-decoration-underline">
                Forgot Password?
              </a>
            </p>
          </form>
        </main>
      </div>
    </>
  );
}

export default Login;