import {
  FaUser,
  FaMoneyBillWave,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

// Faculty Sidebar Component
function FacultySidebar() {
  const menuItems = [
    {
      icon: <FaUser />,
      label: "Dashboard",
      path: "/faculty/dashboard",
    },
    {
      icon: <FaMoneyBillWave />,
      label: "Payments",
      path: "/faculty/payments",
    },
    {
      icon: <FaHistory />,
      label: "Payment History",
      path: "/faculty/payment-history",
    },
  ];

  return (
    <>
      <div className="text-center mb-4">
        <div className="position-relative d-inline-block mb-3">
          <img
            src="/rcoe logo.jpg"
            alt="Profile"
            className="rounded-circle border border-3 border-primary"
            width="80"
            height="80"
            style={{ objectFit: "cover" }}
          />
          <div
            className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white"
            style={{ width: "20px", height: "20px" }}
          ></div>
        </div>
        <h6 className="fw-bold mb-0">Prof. Mohd Ashfaque</h6>
        <small className="text-muted">Assistant Professor</small>
        <div className="mt-2">
          <span className="badge bg-success">Online</span>
        </div>
      </div>

      <ul className="list-group list-group-flush">
        {menuItems.map((item, index) => (
          <li key={index} className="list-group-item border-0 mb-1 p-0">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `d-flex align-items-center gap-2 px-3 py-2 text-decoration-none rounded ${
                  isActive ? "bg-primary text-white" : "text-dark" }`
              }
            >
              {item.icon} {item.label}
            </NavLink>
          </li>
        ))}

        <li className="list-group-item border-0 mb-1 p-0 mt-4">
          <a
            href="/logout"
            className="d-flex align-items-center gap-2 px-3 py-2 text-decoration-none rounded text-danger"
          >
            <FaSignOutAlt /> Logout
          </a>
        </li>
        
      </ul>
    </>
  );
}

export default FacultySidebar;




  /*   const menuItems = [
    { 
      icon: <FaUser />, 
      label: "Dashboard", 
      path: "/faculty",
    },
    {
      icon: <FaMoneyBillWave />,
      label: "Payments",
      path: "/faculty/payments",
      active: true
    },
    {
      icon: <FaHistory />,
      label: "Payment History",
      path: "/faculty/payment-history",
    },
  ];

  return (
    <>
      <div className="text-center mb-4">
        <div className="position-relative d-inline-block mb-3">
          <img
            src="/rcoe logo.jpg"
            alt="Profile"
            className="rounded-circle border border-3 border-primary"
            width="80"
            height="80"
            style={{ objectFit: 'cover' }}
          />
          <div className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white" 
               style={{ width: '20px', height: '20px' }}>
          </div>
        </div>
        <h6 className="fw-bold mb-0">Prof. Mohd Ashfaque</h6>
        <small className="text-muted">Assistant Professor</small>
        <div className="mt-2">
          <span className="badge bg-success">Online</span>
        </div>
      </div>

      <ul className="list-group list-group-flush">
        {menuItems.map((item, index) => (
          <li key={index} className="list-group-item border-0 mb-1 p-0">
            <a
              href={item.path}
              className={`d-flex align-items-center gap-2 px-3 py-2 text-decoration-none rounded ${
                item.active ? "bg-primary text-white" : "text-dark"
              }`}
            >
              {item.icon} {item.label}
            </a>
          </li>
        ))}
        <li className="list-group-item border-0 mb-1 p-0 mt-4">
          <a
            href="/logout"
            className="d-flex align-items-center gap-2 px-3 py-2 text-decoration-none rounded text-danger"
          >
            <FaSignOutAlt /> Logout
          </a>
        </li>
      </ul>
    </>
  ); */