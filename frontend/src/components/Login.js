import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");      // ✅ Added
  const [success, setSuccess] = useState("");  // ✅ Added

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill all fields");   // ✅ Instead of alert
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      // Save token or login flag
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isLoggedIn", "true");

      setSuccess("Login Successful!");   // ✅ Show success message

      // ✅ Redirect after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");   // change if your dashboard path is different
      }, 2000);

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Invalid Credentials"); // ✅ Instead of alert
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Admin Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <div className="error-msg">{error}</div>}   {/* ✅ Added */}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error-msg">{error}</div>}   {/* ✅ Added */}

        <button onClick={handleLogin}>Login</button>

        {success && <div className="success-msg">{success}</div>} {/* ✅ Added */}

        <p style={{ marginTop: "15px" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;