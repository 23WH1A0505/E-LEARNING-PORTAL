import React from "react";

function CourseCard({ course }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: "18px",
      overflow: "hidden",
      boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
      display: "flex",
      flexDirection: "column",
      minHeight: "380px"
    }}>
      <img
        src={course.image || "/logo192.png"}
        alt={course.title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/logo192.png";
        }}
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />

      <div style={{ padding: "22px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ margin: "0 0 10px", fontSize: "1.1rem", color: "#111827" }}>
          {course.title}
        </h3>
        <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.6, flex: 1 }}>
          {course.description}
        </p>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <a
            href={course.link || "#"}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              padding: "12px 16px",
              color: "#fff",
              backgroundColor: "#4f46e5",
              borderRadius: "12px",
              textAlign: "center",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Go to Course
          </a>
          <button
            type="button"
            style={{
              flex: 1,
              padding: "12px 16px",
              color: "#4f46e5",
              border: "1px solid #4f46e5",
              borderRadius: "12px",
              background: "white",
              cursor: "pointer",
              fontWeight: "600"
            }}
            onClick={() => alert("Enrolled successfully ✅")}
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
