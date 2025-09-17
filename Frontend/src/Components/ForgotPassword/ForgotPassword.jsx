import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ForgotPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role") || "faculty";
  console.log(role);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://rcoe-remune-track.onrender.com/forgot-password",
        {
          email,
          role,
        }
      );
      setMessage(res.data.message || "Reset link sent");
    } catch (error) {
      setMessage(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Forgot Password ({role})</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-3 text-success">{message}</p>}
    </div>
  );
}

export default ForgotPassword;
