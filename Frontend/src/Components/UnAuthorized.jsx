import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        {/* 🚫 Icon */}
        <div className="text-red-500 text-6xl mb-4">⚠️</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Unauthorized Access
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page. Please log in with the
          correct account.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-blue-600 text-gray-800 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go to Login
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
