import { useEffect, useState } from "react";
import axios from "axios";
import "./MarkAttendance.css";

function MarkAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState(""); // ✅ success/error message

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (id, status) => {
    setAttendance({ ...attendance, [id]: status });
  };

  const handleSubmit = async () => {
    if (Object.keys(attendance).length === 0) {
      setMessage("⚠️ Please mark attendance first");
      return;
    }

    try {
      const records = Object.keys(attendance).map((id) => ({
        studentId: id,
        status: attendance[id],
      }));

      await axios.post(
        "http://localhost:5000/api/attendance/mark",
        records
      );

      setMessage("✅ Attendance Marked Successfully!");
      setAttendance({});

      // Clear message after 2 sec
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      setMessage("❌ Error marking attendance");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const groupedStudents = students.reduce((acc, student) => {
    if (!acc[student.branch]) acc[student.branch] = [];
    acc[student.branch].push(student);
    return acc;
  }, {});

  return (
    <div className="attendance-page">
      <div className="container">
        <div className="attendance-card">
          <h2>📝 Mark Attendance</h2>

          {Object.keys(groupedStudents).map((branch) => (
            <div key={branch} className="branch-section">
              <h3 className="branch-title">Branch: {branch}</h3>

              <table className="attendance-table">
                <colgroup>
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "40%" }} />
                </colgroup>

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>USN</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {groupedStudents[branch].map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.usn}</td>
                      <td>
                        <div className="status-buttons">
                          <button
                            className={`present-btn ${
                              attendance[student._id] === "Present"
                                ? "active-present"
                                : ""
                            }`}
                            onClick={() =>
                              handleChange(student._id, "Present")
                            }
                          >
                            Present
                          </button>

                          <button
                            className={`absent-btn ${
                              attendance[student._id] === "Absent"
                                ? "active-absent"
                                : ""
                            }`}
                            onClick={() =>
                              handleChange(student._id, "Absent")
                            }
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <button className="submit-btn" onClick={handleSubmit}>
            Submit Attendance
          </button>

          {/* ✅ Message below button */}
          {message && <p className="attendance-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default MarkAttendance;