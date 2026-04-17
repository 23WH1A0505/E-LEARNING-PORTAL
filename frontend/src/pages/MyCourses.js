import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const loadMyCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/enroll/${user._id}`);
        const enrollData = Array.isArray(res.data) ? res.data : [];
        const courseList = enrollData.map((item) => item.course).filter(Boolean);

        setCourses(courseList);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    loadMyCourses();
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Courses</h2>

      {courses.length === 0 ? (
        <div
          onClick={() => navigate("/courses")}
          style={{
            marginTop: "20px",
            padding: "18px",
            border: "1px dashed #94a3b8",
            borderRadius: "12px",
            background: "#f8fafc",
            cursor: "pointer",
            maxWidth: "420px",
          }}
        >
          <p style={{ margin: 0, fontWeight: "600" }}>No courses enrolled</p>
          <p style={{ margin: "8px 0 0", color: "#475569" }}>
            Click here to browse and enroll in courses.
          </p>
        </div>
      ) : (
        courses.map((c) => (
          <div
            key={c._id}
            style={{
              margin: "10px 0",
              padding: "18px",
              border: "1px solid #cbd5e1",
              borderRadius: "16px",
              background: "#fff",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
            }}
          >
            <h3 style={{ margin: "0 0 10px" }}>{c.title}</h3>
            <p style={{ margin: "0 0 14px", color: "#475569" }}>{c.description}</p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => navigate(`/quiz/${c._id}`, { state: { courseTitle: c.title } })}
                style={{
                  border: "none",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  background: "#0f766e",
                  color: "#fff",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Take Quiz
              </button>
              <button
                type="button"
                onClick={() => navigate("/quiz")}
                style={{
                  border: "none",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  background: "#0f172a",
                  color: "#fff",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                View Quiz Score
              </button>
              <button
                type="button"
                onClick={() => navigate("/assignment")}
                style={{
                  border: "1px solid #cbd5e1",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  background: "#fff",
                  color: "#0f172a",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Submit Assignment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyCourses;
