import { useNavigate } from "react-router-dom";
import "./Layout.css";

function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="layout">
      <div className="sidebar">
        <h2>Admin Panel</h2>

        <ul>
          <li onClick={() => navigate("/")}>Dashboard</li>
          <li onClick={() => navigate("/add")}>Add Student</li>
          <li onClick={() => navigate("/students")}>View Students</li>
          <li onClick={() => navigate("/mark")}>Mark Attendance</li>
          <li onClick={() => navigate("/attendance")}>View Attendance</li>
        </ul>

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main-content">{children}</div>
    </div>
  );
}

export default Layout;