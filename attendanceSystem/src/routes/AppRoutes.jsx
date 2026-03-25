import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentDashboard from "../Pages/student/StudentDashboard";
import AttendanceForm from "../pages/student/AttendanceForm";
import MarkAttendance from "../Pages/student/MarkAttendance";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="Lecturer">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute role="Student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
       <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/attendance" element={<AttendanceForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;