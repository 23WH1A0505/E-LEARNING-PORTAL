import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentProfile({ setUser }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  if (!user) {
    return <h2>Please login first</h2>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const payload = { name, email };
      if (password) payload.password = password;

      const res = await axios.put(
        `http://localhost:5000/api/students/${user._id}`,
        payload
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      if (setUser) {
        setUser(res.data);
      }
      setPassword("");
      alert("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.response?.data?.error || "Update failed");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    background: "#fff",
    fontSize: "1rem",
    color: "#0f172a",
    boxSizing: "border-box",
  };

  return (
    <div style={{ padding: "28px" }}>
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        <section
          style={{
            background: "linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #2563eb 100%)",
            color: "#fff",
            borderRadius: "28px",
            padding: "30px",
            boxShadow: "0 30px 80px rgba(15, 23, 42, 0.16)",
          }}
        >
          <div
            style={{
              width: "76px",
              height: "76px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            {(name || "U").charAt(0).toUpperCase()}
          </div>
          <p style={{ margin: "0 0 10px", color: "rgba(255,255,255,0.72)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.8rem" }}>
            Student Profile
          </p>
          <h2 style={{ margin: "0 0 10px", color: "#fff", fontSize: "2rem" }}>{name || "Your profile"}</h2>
          <p style={{ margin: "0 0 24px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
            Keep your account details updated so your learning experience stays personal,
            secure, and easy to manage.
          </p>

          <div style={{ display: "grid", gap: "14px" }}>
            {[
              { label: "Email", value: email || "Not available" },
              { label: "Account type", value: "Student" },
              { label: "Profile status", value: "Active" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "14px 16px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <p style={{ margin: "0 0 6px", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                  {item.label}
                </p>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "28px",
            padding: "30px",
            boxShadow: "0 30px 80px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <p style={{ margin: 0, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.8rem" }}>
              Edit Details
            </p>
            <h2 style={{ margin: "8px 0 10px", color: "#0f172a" }}>Update your profile</h2>
            <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
              Change your name, email, or password here. Leave the password field empty if
              you want to keep the current one.
            </p>
          </div>

          <form onSubmit={handleUpdate} style={{ display: "grid", gap: "18px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", color: "#334155", fontWeight: "600" }}>
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", color: "#334155", fontWeight: "600" }}>
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", color: "#334155", fontWeight: "600" }}>
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              style={{
                border: "none",
                borderRadius: "16px",
                padding: "14px 18px",
                background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
                color: "#fff",
                fontWeight: "700",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default StudentProfile;
