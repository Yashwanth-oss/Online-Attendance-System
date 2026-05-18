Online Attendance Management System (MERN Stack)

A full-stack web application built using the MERN Stack that helps administrators manage students and track attendance efficiently. The system allows adding students, marking attendance, viewing attendance records, and securing access using JWT authentication.

Features:
Add and manage students
Mark student attendance (Present/Absent)
View attendance records
JWT-based authentication
REST API integration
MongoDB database storage
Responsive React frontend
Secure environment variable handling using dotenv


Technologies Used :
Frontend:
React.js
CSS
Axios
React Router DOM

Backend :
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
CORS
dotenv




Project Architecture
Frontend (React)
        ↓
Axios API Calls
        ↓
Backend (Node + Express)
        ↓
Mongoose
        ↓
MongoDB Database
📁 Project Structure
Frontend
frontend/
 ├── src/
 │   ├── components/
 │   │    ├── AddStudent.js
 │   │    ├── MarkAttendance.js
 │   │    ├── ViewAttendance.js
 │   │    ├── Login.js
 │   ├── App.js
 │   ├── index.js
 │   ├── CSS files
Backend
backend/
 ├── models/
 │     ├── Student.js
 │     ├── Attendance.js
 │     ├── Admin.js
 ├── routes/
 │     ├── studentRoutes.js
 │     ├── attendanceRoutes.js
 │     ├── authRoutes.js
 ├── middleware/
 │     ├── authMiddleware.js
 ├── server.js
 ├── .env
 ├── package.json
🔐 Authentication (JWT)

The project uses JSON Web Tokens (JWT) for secure authentication.

Workflow
Admin logs in
Backend validates credentials
JWT token is generated
Token stored in localStorage
Protected routes verify token before granting access
🗂 Database Models
Student Model
{
  name: String,
  rollNo: String
}
Attendance Model
{
  student: ObjectId,
  status: String,
  date: Date
}
🔄 Project Workflow
1. Add Student
Admin enters student details
Data sent to backend using Axios
MongoDB stores student record
2. Mark Attendance
Students fetched from database
Admin selects attendance status
Attendance data stored with date
3. View Attendance
Attendance records fetched
Student details populated using MongoDB references
Displayed in a table format
📡 REST API Endpoints
Authentication
POST /api/auth/login
Students
GET    /api/students
POST   /api/students
Attendance
GET    /api/attendance
POST   /api/attendance
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone <repository-url>
cd attendance-management-system
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm start
3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000

Backend runs on:

http://localhost:5000
🧠 Important Concepts Used
React Hooks (useState, useEffect)
CRUD Operations
REST APIs
JWT Authentication
MongoDB Relationships
Axios API Calls
React Router
Middleware
MVC Architecture
🔐 Why CORS is Used

CORS (Cross-Origin Resource Sharing) allows the React frontend running on port 3000 to communicate with the Node.js backend running on port 5000 securely.

🌟 Future Enhancements
Role-Based Access Control
Attendance Percentage Calculation
Dashboard Analytics
Export Attendance to Excel/PDF
Email Notifications
Mobile Responsive Dashboard
📸 Screenshots

Add screenshots of:
Register Page
Login Page
Dashboard
Add Student Page
Mark Attendance Page
View Attendance Page
View Students Page
🎯 Conclusion

The Online Attendance Management System simplifies attendance tracking using the MERN stack. It demonstrates full-stack development concepts including authentication, REST APIs, database relationships, and responsive UI design. The project is scalable and can be extended with advanced features for real-world deployment.

👨‍💻 Author

Yashwanth S D




