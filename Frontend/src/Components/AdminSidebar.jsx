import {
  FaMoneyCheckAlt,
  FaSyncAlt,
  FaCheckCircle,
  FaHistory,
  FaUsers,
  FaSignOutAlt,
  FaBook,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const menuItems = [
    {
      icon: <FaMoneyCheckAlt />,
      label: "Payments",
      path: "/admin/payments",
    },
    {
      icon: <FaSyncAlt />,
      label: "Payment Management",
      path: "/admin/managepayments",
    },
    // {
    //   icon: <FaCheckCircle />,
    //   label: "Payment Status",
    //   path: "/admin/paymentstatus",
    // },
    {
      icon: <FaHistory />,
      label: "Payment History",
      path: "/admin/paymenthistory",
    },
    {
      icon: <FaUsers />,
      label: "Faculty Management",
      path: "/admin/facultymanager",
    },
    {
      icon: <FaBook />,
      label: "Subject Management",
      path: "/admin/subjectmanager",
    },
  ];

  return (
    <>
      <div className="text-center mb-4">
        <img
          src="/rcoe logo.jpg"
          alt=""
          style={{ width: 60, borderRadius: "50%" }}
          className="mb-2"
        />
        <h5 className="fw-bold mb-0">Rizvi College of Engineering</h5>
        <small className="text-muted">Admin Panel</small>
      </div>

      <ul className="list-group list-group-flush">
        {menuItems.map((item, index) => (
          <li key={index} className="list-group-item border-0 mb-1 p-0">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `d-flex align-items-center gap-2 px-3 py-2 text-decoration-none rounded ${
                  isActive ? "bg-primary text-white" : "text-dark"
                }`
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

export default AdminSidebar;

/* import {
  FaMoneyCheckAlt,
  FaSyncAlt,
  FaCheckCircle,
  FaHistory,
  FaUsers,
  } from "react-icons/fa";

function AdminSidebar() {
  return (
    <>
      <div className="text-center mb-4">
        <img
          src="rcoe logo.jpg"
          alt=""
          style={{ width: 60, borderRadius: "50%" }}
          className="mb-2"
        />
        <h5 className="fw-bold mb-0">Rizvi College of Engineering</h5>
        <small className="text-muted">Admin Panel</small>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex align-items-center gap-2 border-0 mb-1">
          <FaMoneyCheckAlt /> Payments
        </li>
        <li className="list-group-item d-flex align-items-center gap-2 border-0 mb-1">
          <FaSyncAlt /> Payment Management
        </li>
        <li className="list-group-item d-flex align-items-center gap-2 border-0 mb-1">
          <FaCheckCircle /> Payment Status
        </li>
        <li className="list-group-item d-flex align-items-center gap-2 border-0 mb-1">
          <FaHistory /> Payment History
        </li>
        <li className="list-group-item active d-flex align-items-center gap-2 border-0 rounded-3 mb-1">
          <FaUsers /> Faculty Management
        </li>
      </ul>
    </>
  );
}

export default AdminSidebar;
 */

/* import {
  FaMoneyCheckAlt,
  FaSyncAlt,
  FaCheckCircle,
  FaHistory,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const getNavClass = ({ isActive }) =>
    `list-group-item d-flex align-items-center gap-2 border-0 mb-1 ${
      isActive ? "active" : ""
    }`;

  return (
    <>
      <div className="text-center mb-4">
        <img
          src="rcoe logo.jpg"
          alt="Logo"
          style={{ width: 60, borderRadius: "50%" }}
          className="mb-2"
        />
        <h5 className="fw-bold mb-0">Rizvi College of Engineering</h5>
        <small className="text-muted">Admin Panel</small>
      </div>

      <ul className="list-group list-group-flush">
        <NavLink to="/payments" className={getNavClass}>
          <FaMoneyCheckAlt /> Payments
        </NavLink>
        <NavLink to="/payment-management" className={getNavClass}>
          <FaSyncAlt /> Payment Management
        </NavLink>
        <NavLink to="/payment-status" className={getNavClass}>
          <FaCheckCircle /> Payment Status
        </NavLink>
        <NavLink to="/payment-history" className={getNavClass}>
          <FaHistory /> Payment History
        </NavLink>
        <NavLink to="/faculty-management" className={getNavClass}>
          <FaUsers /> Faculty Management
        </NavLink>
      </ul>
    </>
  );
}

export default AdminSidebar;
 */
