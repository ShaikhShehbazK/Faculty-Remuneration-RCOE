import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Components/Login";

import Payments from "./Components/Admin/Payments";
import ManagePayments from "./Components/Admin/ManagePayments";
import PaymentStatus from "./Components/Admin/PaymentStatus";
import PaymentHistories from "./Components/Admin/PaymentHistory/PaymentHistories";
import FacultyPaymentDetails from "./Components/Admin/PaymentHistory/FacultyPaymentDetails";
import FacultyManagement from "./Components/Admin/Faculty Manager/FacultyManagement";
import FacultyDetails from "./Components/Admin/Faculty Manager/FacultyDetails";
import SubjectRemunerationDetails from "./Components/Admin/Faculty Manager/SubjectRemunerationDetails";
import AddFacultyForm from "./Components/Admin/Faculty Manager/AddFacultyForm";

import FacultyDashboard from "./Components/Faculty/FacultyDashboard";
import FacultyPayments from "./Components/Faculty/FacultyPayments";
import SubjectRemuneration from "./Components/Faculty/SubjectRemuneration";
import OverallSlip from "./Components/Faculty/OverallSlip";
import EditFaculty from "./Components/Admin/Faculty Manager/EditFaculty";
import ResetPassword from "./Components/ForgotPassword/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ProtectedRoute from "./Components/UserProtectedRoute";
import UpdateAssignment from "./Components/Admin/Faculty Manager/UpdateAssignment";
import Logout from "./Components/Logout";
import Unauthorized from "./Components/UnAuthorized";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>

        {/* Only admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/payments" element={<Payments />}></Route>

          <Route
            path="/admin/managepayments"
            element={<ManagePayments />}
          ></Route>

          <Route
            path="/admin/paymentstatus"
            element={<PaymentStatus />}
          ></Route>

          <Route
            path="/admin/paymenthistory"
            element={<PaymentHistories />}
          ></Route>

          <Route
            path="/admin/paymenthistory/details/:id/:academicYear/:semesterType"
            element={<FacultyPaymentDetails />}
          ></Route>

          <Route
            path="/admin/facultymanager"
            element={<FacultyManagement />}
          ></Route>

          <Route
            path="/admin/facultymanager/details/:id"
            element={<FacultyDetails />}
          ></Route>

          <Route
            path="/admin/facultymanager/details/:id/subject/:subjectId/:academicYear"
            element={<SubjectRemunerationDetails />}
          ></Route>

          <Route
            path="/admin/facultymanager/add"
            element={<AddFacultyForm />}
          ></Route>

          <Route
            path="/admin/facultymanager/edit/:id"
            element={<EditFaculty />}
          ></Route>

          <Route
            path="/admin/facultymanager/update/:id"
            element={<UpdateAssignment />}
          ></Route>
        </Route>

        {/* Only faculty */}
        <Route element={<ProtectedRoute allowedRoles={["faculty"]} />}>
          <Route path="/faculty/dashboard" element={<FacultyDashboard />}>
            {" "}
          </Route>

          <Route path="/faculty/payments" element={<FacultyPayments />}>
            {" "}
          </Route>

          <Route
            path="/faculty/payments/subjectremu/:subjectId/:academicYear"
            element={<SubjectRemuneration />}
          >
            {" "}
          </Route>

          <Route path="/faculty/payments/overall" element={<OverallSlip />}>
            {" "}
          </Route>
        </Route>
        {/* Forgot password */}
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        ></Route>

        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        {/* Unauthorized page */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
