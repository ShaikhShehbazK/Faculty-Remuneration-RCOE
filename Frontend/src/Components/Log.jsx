import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

function Log() {
  const [role, setRole] = useState("faculty");
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      role, ...(role === "faculty" ? { username: data.username, password: data.password } : { adminId: data.adminId, password: data.password }),
    };
    alert(JSON.stringify(payload, null, 2));
    reset();
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-gradient" style={{ background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)" }}>
      {/* College Logo & Project Name */}
      <div className="mb-4 text-center">
        <img src="rcoe logo.jpg" alt="RCOE Logo" height="60" style={{ objectFit: "contain", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
        <h2 className="fw-bold mt-3" style={{ letterSpacing: 1 }}>Faculty Remuneration System</h2>
      </div>

      {/* Card that contains Login Form */}
      <div className="card shadow-lg border-0 animate__animated animate__fadeIn" style={{ maxWidth: 400, width: "100%", borderRadius: 18 }}>
        <div className="card-body p-4">
            
           {/* Admin & Faculty Buttons */}
          <div className="d-flex justify-content-center mb-4">
            <button
              className={`btn ${role === "admin" ? "btn-primary" : "btn-outline-primary"} fw-bold mx-2 px-4 rounded-pill`}
              style={{ transition: "all 0.2s" }}
              onClick={() => setRole("admin")}
              type="button"
            >
              Admin
            </button>
            <button
              className={`btn ${role === "faculty" ? "btn-primary" : "btn-outline-primary"} fw-bold mx-2 px-4 rounded-pill`}
              style={{ transition: "all 0.2s" }}
              onClick={() => setRole("faculty")}
              type="button"
            >
              Faculty
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {role === "faculty" ? (
              <div className="mb-3">
                <label className="form-label">Faculty Username</label>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Username is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control ${errors.username ? "is-invalid" : ""} bg-light border-0 shadow-sm`}
                      placeholder="Enter your username"
                      {...field}
                    />
                  )}
                />
                {errors.username && <div className="invalid-feedback d-block">{errors.username.message}</div>}
              </div>
            ) : (
              <div className="mb-3">
                <label className="form-label">Admin ID</label>
                <Controller
                  name="adminId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Admin ID is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control ${errors.adminId ? "is-invalid" : ""} bg-light border-0 shadow-sm`}
                      placeholder="Enter your admin ID"
                      {...field}
                    />
                  )}
                />
                {errors.adminId && <div className="invalid-feedback d-block">{errors.adminId.message}</div>}
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""} bg-light border-0 shadow-sm`}
                    placeholder="Enter your password"
                    {...field}
                  />
                )}
              />
              {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <Controller
                  name="rememberMe"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <input type="checkbox" className="form-check-input" id="rememberMe" {...field} />
                  )}
                />
                <label className="form-check-label ms-2" htmlFor="rememberMe">Remember Me</label>
              </div>
              <a href="#" className="small text-decoration-underline text-primary">Forgot Password?</a>
            </div>
            <button className="btn btn-primary w-100 fw-bold rounded-pill py-2 mt-2" type="submit" style={{ fontSize: "1.1rem", letterSpacing: 1 }}>Login</button>
          </form>
        </div>
      </div>
      <div className="mt-4 text-muted small text-center">&copy; {new Date().getFullYear()} Rizvi College of Engineering</div>
    </div>
  );
};

export default Log;
