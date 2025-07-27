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
import Log from "./Components/Log";
import SubjectRemunerationDetails from "./Components/Admin/Faculty Manager/SubjectRemunerationDetails";
import AddFacultyForm from "./Components/Admin/Faculty Manager/AddFacultyForm";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Log />}></Route> */}
        <Route path="/" element={<Login />}></Route>

        <Route path="/admin/payments" element={<Payments />}></Route>
        
        <Route path="/admin/managepayments" element={<ManagePayments />}></Route>

        <Route path="/admin/paymentstatus" element={<PaymentStatus />}></Route>

        <Route path="/admin/paymenthistory" element={<PaymentHistories />}></Route>
        
        <Route path="/admin/paymenthistory/details" element={<FacultyPaymentDetails />}></Route>

        <Route path="/admin/facultymanager" element={<FacultyManagement />}></Route>
        
        <Route path="/admin/facultymanager/details" element={<FacultyDetails />}></Route>

        <Route path="/admin/facultymanager/details/subject" element={<SubjectRemunerationDetails /> }></Route>
         
        <Route path="/admin/facultymanager/add" element={<AddFacultyForm /> }></Route>
        
      </Routes>
    </>
  );
}

export default App;
