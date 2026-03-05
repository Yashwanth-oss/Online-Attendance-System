import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">📘 Admin Panel</h2>

      <nav className="sidebar-links">
        <NavLink to="/dashboard" end className="sidebar-item">
          📊 Dashboard
        </NavLink>

        <NavLink to="/add" className="sidebar-item">
          ➕ Add Student
        </NavLink>

        <NavLink to="/students" className="sidebar-item">
          🎓 Students
        </NavLink>

        <NavLink to="/mark" className="sidebar-item">
          📝 Mark Attendance
        </NavLink>

        <NavLink to="/attendance" className="sidebar-item">
          📋 Records
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;