import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const today = new Date().toLocaleDateString("en-GB");

  const backendURL =
    process.env.REACT_APP_BACKEND_URL ||
    "https://online-attendance-system-rgth.onrender.com";

  useEffect(() => {

    fetchStudents();
    fetchAttendance();

  });

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/students`);
      setStudents(res.data || []);
    } catch (error) {
      console.log("Student API Error:", error);
    }
  };

  // Fetch attendance
  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/attendance`);
      setAttendance(res.data || []);
    } catch (error) {
      console.log("Attendance API Error:", error);
    }
  };

  // Group students by branch
  const studentsByBranch = students.reduce((acc, student) => {

    if (!student.branch) return acc;

    if (!acc[student.branch]) {
      acc[student.branch] = [];
    }

    acc[student.branch].push(student);

    return acc;

  }, {});

  // Group attendance by branch (today only)
  const attendanceByBranch = attendance.reduce((acc, record) => {

    if (!record.studentId || !record.date) return acc;

    const branch = record.studentId.branch || "Unknown";

    const recordDate = new Date(record.date).toLocaleDateString("en-GB");

    if (recordDate !== today) return acc;

    if (!acc[branch]) {
      acc[branch] = { present: 0, absent: 0 };
    }

    if (record.status === "Present") {
      acc[branch].present++;
    } else {
      acc[branch].absent++;
    }

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