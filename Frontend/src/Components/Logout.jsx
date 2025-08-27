import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkLoginStatus = async () => {
      localStorage.removeItem("token"); // 🧹 Delete the token
      toast.success("logout Successfully");
      //   setIsLoggedIn(false); // ❌ Update your auth state
      //   setUserRole(null); // 🧽 Clear any other user info
      navigate("/");
      // window.location.reload();
    };
    checkLoginStatus();
  }, []);
};

export default Logout;
