import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/students/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      setMessage(data.message || "Signup successful");

      if (res.ok) {
        setTimeout(() => navigate("/login"), 800);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-panel auth-panel--brand auth-panel--brand-alt">
          <div className="auth-badge">Join E-Learn</div>
          <h1>Create your student account and start building your skills.</h1>
          <p>
            Sign up once to access courses, submit assignments, view quiz scores, and keep
            your learning profile organized.
          </p>

          <div className="auth-highlights">
            <div className="auth-highlight-card">
              <strong>Simple signup</strong>
              <span>Create your account in a minute and enter the learning dashboard.</span>
            </div>
            <div className="auth-highlight-card">
              <strong>All in one place</strong>
              <span>Courses, assignments, quizzes, and profile tools stay connected.</span>
            </div>
          </div>
        </section>

        <section className="auth-panel auth-panel--form">
          <div className="auth-card__hero auth-card__hero--left">
            <div className="auth-icon">S</div>
            <h2>Create account</h2>
            <p>Enter your details below to register as a student.</p>
          </div>

          <form onSubmit={handleSignup} className="auth-form">
            <input
              className="auth-input"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="auth-btn" type="submit">Signup</button>
          </form>

          {message ? <p className="auth-message">{message}</p> : null}

          <p className="auth-switch">
            Already have an account? <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Signup;
