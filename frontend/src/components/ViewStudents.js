import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewStudents.css";

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchStudents();
  }, );

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/students`);
      setStudents(res.data);
    } catch (error) {
      console.error("Fetch students failed", error);
    }
  };

  // ✅ DELETE
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${backendURL}/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // ✅ UPDATE
  const updateStudent = async () => {
    try {
      await axios.put(
        `${backendURL}/api/students/${editStudent._id}`,
        editStudent
      );
      setEditStudent(null);
      fetchStudents();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  // ✅ Divide by branch
  const branches = [...new Set(students.map((s) => s.branch))];

  return (
    <div className="table-container">
      <h2 className="main-heading">👨‍🎓 View Students</h2>

      {branches.map((branch) => (
        <div key={branch} className="branch-section">
          <h3 className="branch-heading">{branch}</h3>

          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>USN</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students
                .filter((student) => student.branch === branch)
                .map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.usn}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => setEditStudent(student)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteStudent(student._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* ✅ EDIT MODAL */}
      {editStudent && (
        <div className="edit-modal">
          <div className="edit-box">
            <h3>Edit Student</h3>

            <input
              type="text"
              value={editStudent.name}
              onChange={(e) =>
                setEditStudent({ ...editStudent, name: e.target.value })
              }
            />

            <input
              type="text"
              value={editStudent.usn}
              onChange={(e) =>
                setEditStudent({ ...editStudent, usn: e.target.value })
              }
            />

            <div className="modal-buttons">
              <button className="update-btn" onClick={updateStudent}>
                Update
              </button>

              <button
                className="cancel-btn"
                onClick={() => setEditStudent(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewStudents;