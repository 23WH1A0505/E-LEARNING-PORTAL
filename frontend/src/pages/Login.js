import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const res = await axios.post("http://localhost:5000/api/students/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      const loggedUser = res.data.student || res.data.user;
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-panel auth-panel--brand">
          <div className="auth-badge">E-Learning Portal</div>
          <h1>Keep learning with a cleaner, faster student workspace.</h1>
          <p>
            Access your courses, quiz scores, assignments, and profile from one focused
            dashboard designed for daily learning.
          </p>

          <div className="auth-highlights">
            <div className="auth-highlight-card">
              <strong>Track courses</strong>
              <span>See enrolled courses and continue learning anytime.</span>
            </div>
            <div className="auth-highlight-card">
              <strong>Save progress</strong>
              <span>Quiz scores and assignment activity stay connected to your account.</span>
            </div>
          </div>
        </section>

        <section className="auth-panel auth-panel--form">
          <div className="auth-card__hero auth-card__hero--left">
            <div className="auth-icon">L</div>
            <h2>Login to your account</h2>
            <p>Welcome back. Enter your details and continue your learning journey.</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <input
              className="auth-input"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="auth-btn" type="submit">Login</button>
          </form>

          <p className="auth-switch">
            Don't have an account? <span onClick={() => navigate("/signup")}>Create one</span>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Login;
