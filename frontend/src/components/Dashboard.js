import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const today = new Date().toLocaleDateString("en-GB");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/api/attendance")
      .then((res) => setAttendance(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Group students by branch
  const studentsByBranch = students.reduce((acc, student) => {
    if (!acc[student.branch]) acc[student.branch] = [];
    acc[student.branch].push(student);
    return acc;
  }, {});

  // Group attendance by branch (Only Today)
  const attendanceByBranch = attendance.reduce((acc, record) => {
    const branch = record.studentId?.branch || "Unknown";
    const recordDate = new Date(record.date).toLocaleDateString("en-GB");

    if (recordDate !== today) return acc;

    if (!acc[branch]) acc[branch] = { present: 0, absent: 0 };

    if (record.status === "Present") acc[branch].present += 1;
    else if (record.status === "Absent") acc[branch].absent += 1;

    return acc;
  }, {});

  return (
    <div className="dashboard-page">
      <div className="container">
        <h2 className="dashboard-heading">📊 Dashboard</h2>
        <p className="date-text">Date: {today}</p>

        <div className="cards-grid">
          {Object.keys(studentsByBranch).map((branch) => {
            const totalStudents = studentsByBranch[branch].length;
            const present = attendanceByBranch[branch]?.present || 0;
            const absent = attendanceByBranch[branch]?.absent || 0;

            return (
              <div key={branch} className="branch-card">
                <h3>{branch}</h3>
                <p>Total Students: {totalStudents}</p>
                <p className="present">Present Today: {present}</p>
                <p className="absent">Absent Today: {absent}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;