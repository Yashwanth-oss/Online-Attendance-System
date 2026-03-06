import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const backendURL =
    process.env.REACT_APP_BACKEND_URL ||
    "https://online-attendance-system-rgth.onrender.com";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {

      await axios.post(`${backendURL}/api/auth/register`, {
        name,
        email,
        password
      });

      setSuccess("Admin Registered Successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message || "Registration failed"
      );

    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h2>📝 Admin Register</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

<button onClick={handleRegister}>Register</button>

{/* Success message ONLY under the button */}
{success && <div className="success-msg" style={{ marginTop: "10px" }}>{success}</div>}

{error && <div className="error-msg">{error}</div>}

<p>
  Already have an account?{" "}
  <span
    style={{ color: "blue", cursor: "pointer" }}
    onClick={() => navigate("/login")}
  >
    Login
  </span>
</p>

      </div>
    </div>
  );
}

export default Register;