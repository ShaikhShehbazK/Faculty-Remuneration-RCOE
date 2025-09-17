import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ allowedRoles }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          "https://rcoe-remune-track.onrender.com/role",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserRole(res.data.userData.role);
      } catch (error) {
        console.error("Error checking role:", error);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  return allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default ProtectedRoute;

// import React, { useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   const [userRole, setUserRole] = useState();
//    useEffect(() => {
//     try {
//       const token = JSON.parse(localStorage.getItem("token"));
//       const header = {
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ Pass the token in Authorization header
//         },
//       };

//       axios
//         .get("https://rcoe-remune-track.onrender.com/role", header)
//         .then((response) => {
//           console.log(response.data.userData);
//           setUserRole(response.data.userData.role);
//         });
//     } catch (error) {
//       console.error("Error checking session:", error);
//     }
//   }, []);

//   return userRole=="admin" <Outlet />;
// };

// export default ProtectedRoute;
