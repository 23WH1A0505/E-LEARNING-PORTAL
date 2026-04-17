import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizScore from "./QuizScore";
import CourseCard from "../components/CourseCard";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCourses([
      {
        _id: "1",
        title: "React JS Bootcamp",
        description: "Build modern interfaces and reusable UI patterns.",
        link: "https://react.dev",
      },
      {
        _id: "2",
        title: "Python for Data Science",
        description: "Learn analysis, automation, and beginner-friendly ML workflows.",
        link: "https://python.org",
      },
      {
        _id: "3",
        title: "Java Fundamentals",
        description: "Strengthen OOP, APIs, and backend development basics.",
        link: "#",
      },
      {
        _id: "4",
        title: "UI/UX Design",
        description: "Design smoother user experiences with cleaner visual systems.",
        link: "#",
      },
    ]);
  }, []);

  return (
    <div
      style={{
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #38bdf8 100%)",
          color: "#fff",
          borderRadius: "28px",
          padding: "32px",
          boxShadow: "0 30px 80px rgba(15, 23, 42, 0.18)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            Student Dashboard
          </p>
          <h1 style={{ margin: "0 0 12px", fontSize: "2.4rem", lineHeight: 1.1 }}>
            Learn smarter and keep your momentum high.
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: "580px",
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.7,
            }}
          >
            Track your progress, continue your lessons, and stay ready for the next quiz
            from one clean place.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
            <button
              type="button"
              onClick={() => navigate("/courses")}
              style={{
                border: "none",
                borderRadius: "999px",
                padding: "12px 20px",
                background: "#fff",
                color: "#0f172a",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Explore Courses
            </button>
            <button
              type="button"
              onClick={() => navigate("/my-courses")}
              style={{
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "999px",
                padding: "12px 20px",
                background: "transparent",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              View My Courses
            </button>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "24px",
            padding: "24px",
            backdropFilter: "blur(10px)",
          }}
        >
          <p style={{ margin: "0 0 12px", color: "rgba(255,255,255,0.74)" }}>
            Weekly focus
          </p>
          <div style={{ display: "grid", gap: "14px" }}>
            {[
              { label: "Live courses", value: `${courses.length}` },
              { label: "Practice target", value: "3 quizzes" },
              { label: "Learning streak", value: "6 days" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 14px",
                  borderRadius: "16px",
                  background: "rgba(15,23,42,0.22)",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.8)" }}>{item.label}</span>
                <strong style={{ fontSize: "1.05rem" }}>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            padding: "22px",
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
          }}
        >
          <p style={{ margin: 0, color: "#64748b" }}>Enrolled Courses</p>
          <h2 style={{ margin: "10px 0 8px", fontSize: "2rem", color: "#0f172a" }}>
            {courses.length}
          </h2>
          <p style={{ margin: 0, color: "#475569" }}>
            Keep going. Every completed lesson builds your skill stack.
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            padding: "22px",
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
          }}
        >
          <p style={{ margin: 0, color: "#64748b" }}>Learning Status</p>
          <h2 style={{ margin: "10px 0 8px", fontSize: "2rem", color: "#0f172a" }}>On Track</h2>
          <p style={{ margin: 0, color: "#475569" }}>
            Your dashboard is ready with courses, quizzes, and assignments.
          </p>
        </div>

        <QuizScore compact />
      </section>

      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "18px",
          }}
        >
          <div>
            <p style={{ margin: 0, color: "#64748b" }}>Recommended for you</p>
            <h2 style={{ margin: "6px 0 0", color: "#0f172a" }}>Keep learning</h2>
          </div>
          <button
            type="button"
            onClick={() => navigate("/courses")}
            style={{
              border: "none",
              borderRadius: "999px",
              padding: "12px 18px",
              background: "#0f172a",
              color: "#fff",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Browse All Courses
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
