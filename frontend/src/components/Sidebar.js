import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>📋 Menu</h3>
      <ul>
        <li><Link to="/">🏠 Dashboard</Link></li>
        <li><Link to="/profile">👤 Profile</Link></li>
        <li><Link to="/courses">📚 Enroll Course</Link></li>
        <li><Link to="/my-courses">📖 My Courses</Link></li>
        <li><Link to="/quiz">⭐ Quiz Scores</Link></li>
        <li><Link to="/assignment">✍️ Assignments</Link></li>
        <li><Link to="/login">🔐 Login</Link></li>
        <li><Link to="/signup">📝 Signup</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;