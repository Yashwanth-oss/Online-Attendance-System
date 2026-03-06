import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewAttendance.css";

function ViewAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (!backendURL) {
      console.log("Backend URL not found in .env");
      return;
    }

    axios
      .get(`${backendURL}/api/attendance`)
      .then((res) => setAttendanceData(res.data))
      .catch((err) => console.log("Attendance API Error:", err));
  }, [backendURL]);

  // 🔥 Group Attendance by Branch
  const groupedByBranch = attendanceData.reduce((acc, record) => {
    if (!record.studentId) return acc;

    const branch = record.studentId.branch || "Unknown";

    if (!acc[branch]) {
      acc[branch] = [];
    }

    acc[branch].push(record);
    return acc;
  }, {});

  return (
    <div className="attendance-page">
      <div className="container">
        <div className="attendance-card">
          <h2>📋 View Attendance</h2>

          {Object.keys(groupedByBranch).length === 0 && (
            <p>No attendance records found</p>
          )}

          {Object.keys(groupedByBranch).map((branch) => (
            <div key={branch} style={{ marginBottom: "30px" }}>
              <h3 style={{ marginBottom: "15px", color: "#1e3a8a" }}>
                Branch: {branch}
              </h3>

              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>USN</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>

                <tbody>
                  {groupedByBranch[branch].map((attendance) => (
                    <tr key={attendance._id}>
                      <td>{attendance.studentId?.name || "N/A"}</td>
                      <td>{attendance.studentId?.usn || "N/A"}</td>
                      <td>{attendance.status}</td>

                      <td>
                        {attendance.date
                          ? new Date(attendance.date)
                              .toLocaleDateString("en-GB")
                              .split("/")
                              .join(" - ")
                          : "N/A"}
                      </td>

                      <td>
                        {attendance.date
                          ? new Date(attendance.date).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewAttendance;