import React, { useEffect, useState } from "react";
import axios from "axios";

function AssignmentSubmission() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [file, setFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      if (!user?._id) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/enroll/${user._id}`);
        const enrolledCourses = Array.isArray(res.data)
          ? res.data.map((item) => item.course).filter(Boolean)
          : [];

        setCourses(enrolledCourses);
        if (enrolledCourses.length) {
          setSelectedCourseIds([enrolledCourses[0]._id]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCourses();
  }, [user]);

  const submitAssignment = async () => {
    if (!user?._id) {
      alert("Please login first");
      return;
    }

    if (selectedCourseIds.length === 0) {
      alert("Please select at least one course");
      return;
    }

    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("studentId", user._id);
      formData.append("courseIds", JSON.stringify(selectedCourseIds));

      await axios.post("http://localhost:5000/api/submissions/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Assignment PDF submitted successfully");
      setFile(null);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || error.response?.data?.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "28px" }}>
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "28px",
          boxShadow: "0 30px 80px rgba(15, 23, 42, 0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "28px 30px",
            background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
            color: "#fff",
          }}
        >
          <p style={{ margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.72)", fontSize: "0.8rem" }}>
            Assignment Submission
          </p>
          <h2 style={{ margin: "0 0 10px", color: "#fff" }}>Submit your assignment</h2>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
            Choose one or more of your enrolled courses and upload a single PDF assignment.
          </p>
        </div>

        <div style={{ padding: "30px", display: "grid", gap: "18px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", color: "#334155", fontWeight: "600" }}>
              Select Courses
            </label>
            <div
              style={{
                display: "grid",
                gap: "10px",
                border: "1px solid #cbd5e1",
                borderRadius: "14px",
                padding: "16px",
                background: "#f8fafc",
              }}
            >
              {courses.length === 0 ? (
                <p style={{ margin: 0, color: "#64748b" }}>No enrolled courses found</p>
              ) : (
                courses.map((course) => {
                  const isSelected = selectedCourseIds.includes(course._id);

                  return (
                    <label
                      key={course._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 12px",
                        borderRadius: "12px",
                        background: isSelected ? "#dbeafe" : "#fff",
                        border: isSelected ? "1px solid #60a5fa" : "1px solid #e2e8f0",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() =>
                          setSelectedCourseIds((current) =>
                            isSelected
                              ? current.filter((id) => id !== course._id)
                              : [...current, course._id]
                          )
                        }
                      />
                      <span style={{ color: "#0f172a", fontWeight: "600" }}>{course.title}</span>
                    </label>
                  );
                })
              )}
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", color: "#334155", fontWeight: "600" }}>
              Upload PDF
            </label>
            <label
              htmlFor="assignmentFile"
              style={{
                display: "block",
                border: "2px dashed #93c5fd",
                borderRadius: "18px",
                padding: "28px",
                textAlign: "center",
                background: "#eff6ff",
                cursor: "pointer",
              }}
            >
              <input
                id="assignmentFile"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                style={{ display: "none" }}
              />
              <p style={{ margin: 0, fontWeight: "700", color: "#1d4ed8" }}>
                Click here to choose your assignment PDF
              </p>
              <p style={{ margin: "8px 0 0", color: "#475569" }}>
                {file ? file.name : "No PDF selected yet"}
              </p>
            </label>
          </div>

          <button
            type="button"
            onClick={submitAssignment}
            disabled={isSubmitting || courses.length === 0}
            style={{
              border: "none",
              borderRadius: "16px",
              padding: "14px 18px",
              background: isSubmitting || courses.length === 0
                ? "#94a3b8"
                : "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
              color: "#fff",
              fontWeight: "700",
              fontSize: "1rem",
              cursor: isSubmitting || courses.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit Assignment PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignmentSubmission;
