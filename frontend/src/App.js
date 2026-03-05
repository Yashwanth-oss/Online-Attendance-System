import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import ViewStudents from "./components/ViewStudents";
import MarkAttendance from "./components/MarkAttendance";
import ViewAttendance from "./components/ViewAttendance";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";


function App() {
  return (
    <Router>
      <Routes>
        
        {/* Public Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  {/* ✅ MOVE HERE */}

        {/* Protected Pages */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/add" element={<AddStudent />} />
                  <Route path="/students" element={<ViewStudents />} />
                  <Route path="/mark" element={<MarkAttendance />} />
                  <Route path="/attendance" element={<ViewAttendance />} />
                  
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;