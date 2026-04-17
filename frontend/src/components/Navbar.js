import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand" style={{ fontSize: "1.35rem", fontWeight: "800" }}>
          E-Learn
        </span>
      </div>

      <div className="navbar-right">
        <button className="nav-btn" onClick={() => navigate("/my-courses")}>My Learning</button>
        <button className="nav-btn" onClick={handleLogout}>Logout</button>
        <div className="profile" onClick={() => navigate("/profile")}>Profile</div>
      </div>
    </nav>
  );
}

export default Navbar;
