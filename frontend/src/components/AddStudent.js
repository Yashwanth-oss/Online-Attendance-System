import { useState } from "react";
import axios from "axios";
import "./AddStudent.css";

function AddStudent() {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [branch, setBranch] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");   // ✅ success state

  const handleSubmit = async () => {
    let newErrors = {};
    setSuccess(""); // clear old success message

    if (!name.trim()) newErrors.name = "Name is required";
    if (!usn.trim()) newErrors.usn = "USN is required";
    if (!branch.trim()) newErrors.branch = "Branch is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/students/add", {
        name,
        usn,
        branch
      });

      // Clear form
      setName("");
      setUsn("");
      setBranch("");
      setErrors({});

      // ✅ Show success message
      setSuccess("Student added successfully ✅");

      setTimeout(() => {
  setSuccess("");
}, 3000);

    } catch (error) {
      const message = error.response?.data?.message || "Error adding student";

      if (message.includes("USN")) {
        setErrors({ usn: message });
      } else {
        setErrors({ general: message });
      }
    }
  };

  return (
    <div className="main-container">
      <div className="card">
        <h2 className="title">🎓 Add Student</h2>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: "" });
            }}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="input-group">
          <label>USN</label>
          <input
            type="text"
            placeholder="Enter USN"
            value={usn}
            onChange={(e) => {
              setUsn(e.target.value);
              setErrors({ ...errors, usn: "" });
            }}
          />
          {errors.usn && <p className="error">{errors.usn}</p>}
        </div>

        <div className="input-group">
          <label>Branch</label>
          <input
            type="text"
            placeholder="Enter Branch"
            value={branch}
            onChange={(e) => {
              setBranch(e.target.value);
              setErrors({ ...errors, branch: "" });
            }}
          />
          {errors.branch && <p className="error">{errors.branch}</p>}
        </div>

        {errors.general && <p className="error">{errors.general}</p>}

        <button className="btn" onClick={handleSubmit}>
          Add Student
        </button>

        {/* ✅ Success message below button */}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
}

export default AddStudent;