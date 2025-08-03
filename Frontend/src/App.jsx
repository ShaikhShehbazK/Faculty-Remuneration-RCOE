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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>

        {/* Admin Routes */}
        <Route path="/admin/payments" element={<Payments />}></Route>
        
        <Route path="/admin/managepayments" element={<ManagePayments />}></Route>

        <Route path="/admin/paymentstatus" element={<PaymentStatus />}></Route>

        <Route path="/admin/paymenthistory" element={<PaymentHistories />}></Route>
        
        <Route path="/admin/paymenthistory/details" element={<FacultyPaymentDetails />}></Route>

        <Route path="/admin/facultymanager" element={<FacultyManagement />}></Route>
        
        <Route path="/admin/facultymanager/details" element={<FacultyDetails />}></Route>

        <Route path="/admin/facultymanager/details/subject" element={<SubjectRemunerationDetails /> }></Route>
         
        <Route path="/admin/facultymanager/add" element={<AddFacultyForm /> }></Route>

        <Route path="/admin/facultymanager/edit/:id" element={<EditFaculty /> }></Route>

        {/* Faculty Routes */}
        <Route path="/faculty/dashboard" element={ <FacultyDashboard /> }> </Route>

        <Route path="/faculty/payments" element={ <FacultyPayments /> }> </Route>

        <Route path="/faculty/payments/subjectremu" element={ <SubjectRemuneration /> }> </Route>

        <Route path="/faculty/payments/overall" element={ <OverallSlip /> }> </Route>
      </Routes>
    </>
  );
}

export default App;
