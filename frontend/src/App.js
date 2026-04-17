import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import CourseEnrollment from "./pages/CourseEnrollment";
import MyCourses from "./pages/MyCourses";
import QuizScore from "./pages/QuizScore";
import AssignmentSubmission from "./pages/AssignmentSubmission";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuizPage from "./pages/QuizPage";

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar setUser={setUser} />
      <div className="app-container">
        <Sidebar />
        <main className="page-content">
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={user ? <StudentDashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/profile"
              element={user ? <StudentProfile setUser={setUser} /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/courses"
              element={user ? <CourseEnrollment /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/my-courses"
              element={user ? <MyCourses /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/quiz"
              element={user ? <QuizScore /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/assignment"
              element={user ? <AssignmentSubmission /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/quiz/:courseId"
              element={user ? <QuizPage /> : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
