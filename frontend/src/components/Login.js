import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const backendURL =
    process.env.REACT_APP_BACKEND_URL ||
    "https://online-attendance-system-rgth.onrender.com";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/api/auth/login`, { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);

      navigate("/dashboard"); // Go to dashboard
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login"); // Stay on login page
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Admin Login</h2>

        {isLoggedIn ? (
          <>
            <p>You are already logged in.</p>
            <button
              onClick={handleLogout}
              style={{ backgroundColor: "red", color: "white", padding: "10px 20px" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="error-msg">{error}</div>}

            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p style={{ marginTop: "15px" }}>
              Don't have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;