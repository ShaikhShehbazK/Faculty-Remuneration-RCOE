import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Login() {
  const [loginRole, setLoginRole] = useState("faculty");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    adminId: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload =
      loginRole === "faculty"
        ? { email: formData.username, password: formData.password }
        : { email: formData.adminId, password: formData.password };

    try {
      const url =
        loginRole === "admin"
          ? "https://rcoe-remune-track.onrender.com/admin/login"
          : "https://rcoe-remune-track.onrender.com/faculty/login";

      const response = await axios.post(url, payload);

      if (response.data.token) {
        toast.success(
          `${
            loginRole.charAt(0).toUpperCase() + loginRole.slice(1)
          } Login Successful ✅`
        );
        localStorage.setItem("token", response.data.token);
        if (loginRole === "faculty") {
          localStorage.setItem("role", "faculty");
          localStorage.setItem("facultyId", response.data.id);
          navigate("/faculty/dashboard", { replace: true });
        } else {
          navigate("/admin/payments", { replace: true });
        }
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Login failed. Check console."
      );
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{
        background:
          "linear-gradient(135deg, #0d6efd88, #0d6efd44), url('/college-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Floating decorative circles */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ overflow: "hidden", pointerEvents: "none" }}
      >
        <motion.div
          className="position-absolute bg-primary rounded-circle"
          style={{ width: 120, height: 120, top: 50, left: 30, opacity: 0.2 }}
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.div
          className="position-absolute bg-success rounded-circle"
          style={{
            width: 80,
            height: 80,
            bottom: 100,
            right: 50,
            opacity: 0.15,
          }}
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        />
      </div>

      <motion.div
        className="bg-white rounded-4 shadow-lg p-5 position-relative"
        style={{ maxWidth: "420px", width: "100%", zIndex: 1 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
      >
        <div className="text-center mb-4">
          <img src="/rcoe-logo.jpg" alt="Logo" height="60" className="mb-3" />
          <h3 className="fw-bold text-primary">Faculty Remuneration Portal</h3>
        </div>

        {/* Role Tabs */}
        <div className="d-flex justify-content-center mb-4 position-relative">
          {["admin", "faculty"].map((role) => (
            <motion.button
              key={role}
              className={`nav-link px-4 py-2 rounded-pill ${
                loginRole === role
                  ? "active fw-bold bg-primary text-white"
                  : "text-secondary"
              }`}
              onClick={() => setLoginRole(role)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {loginRole === "faculty" ? (
            <motion.input
              type="text"
              name="username"
              className="form-control rounded-pill shadow-sm"
              placeholder="Faculty Username"
              value={formData.username}
              onChange={handleInputChange}
              whileFocus={{ scale: 1.02, borderColor: "#0d6efd" }}
              required
            />
          ) : (
            <motion.input
              type="email"
              name="adminId"
              className="form-control rounded-pill shadow-sm"
              placeholder="Admin Email"
              value={formData.adminId}
              onChange={handleInputChange}
              whileFocus={{ scale: 1.02, borderColor: "#0d6efd" }}
              required
            />
          )}

          <motion.input
            type="password"
            name="password"
            className="form-control rounded-pill shadow-sm"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            whileFocus={{ scale: 1.02, borderColor: "#0d6efd" }}
            onFocus={(e) => {
              e.target.readOnly = false;
            }}
            readOnly
            required
          />

          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label small" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <button
              type="button"
              className="btn btn-link small text-decoration-none"
              onClick={() => navigate(`/forgot-password?role=${loginRole}`)}
            >
              Forgot Password?
            </button>
          </div>

          <motion.button
            type="submit"
            className="btn btn-primary rounded-pill py-2 fw-bold shadow-sm mt-3"
            whileHover={{ y: -3, boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.97 }}
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-muted mt-3 small">
          © {new Date().getFullYear()} Faculty Remuneration System
        </p>
      </motion.div>
    </div>
  );
}

export default Login;

/* 
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
          "https://rcoe-remune-track.onrender.com/admin/login",
          payload
        );
        if (response.data.token) {
          toast.success("Admin Login Successful ✅");
          localStorage.setItem("token", response.data.token);
          setFormData({ username: "", password: "", adminId: "" });
          navigate("/admin/payments");
        } else {
          toast.error("Unexpected response from server");
        }
      } else {
        const response = await axios.post(
          "https://rcoe-remune-track.onrender.com/faculty/login",
          payload
        );

        if (response.data.token) {
          // alert("Faculty Login Successful ✅");
          toast.success("Faculty Login Successful ✅");
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", "faculty");
          localStorage.setItem("facultyId", response.data.id); // 👈 save id for dashboard
          setFormData({ username: "", password: "", adminId: "" });
          navigate("/faculty/dashboard"); // 👈 redirect to faculty dashboard
        }
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Login failed. Check console."
      );
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Header *
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

      {/* Main *
      <main className="container my-5 d-flex flex-column align-items-center justify-content-center flex-grow-1">
        {/* College Banner *
        <div className="text-center mb-4 w-100" style={{ maxWidth: "700px" }}>
          <img
            src="/college-banner.jpg"
            className="img-fluid rounded"
            alt="College Banner"
            style={{ maxHeight: "200px", width: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Title *
        <h3 className="fw-bold text-center text-primary mb-4">
          Rizvi College of Engineering
        </h3>

        {/* Role Tabs *
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

        {/* Form *
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
 */
