import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function QuizScore({ compact = false }) {
  const [score, setScore] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadScore = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?._id) {
        setScore(null);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/score/student/${user._id}`);
        const scores = Array.isArray(res.data) ? res.data : [];
        if (scores.length > 0) {
          setScore(scores[0].score);
          setCourseTitle(scores[0].courseId?.title || "");
          return;
        }
      } catch (error) {
        console.log(error);
      }

      const storedQuizData = localStorage.getItem(`quizScore_${user._id}`);
      if (storedQuizData !== null) {
        try {
          const parsedQuizData = JSON.parse(storedQuizData);
          if (typeof parsedQuizData === "object" && parsedQuizData !== null) {
            setScore(typeof parsedQuizData.score === "number" ? parsedQuizData.score : null);
            setCourseTitle(parsedQuizData.courseTitle || "");
            return;
          }
        } catch {
          setScore(Number(storedQuizData));
          return;
        }
      }

      setScore(null);
    };

    const latestScore = location.state?.latestScore;
    if (latestScore) {
      setScore(latestScore.score);
      setCourseTitle(latestScore.courseTitle || "");
      return;
    }

    loadScore();
  }, [location.state]);

  const scoreLabel = score !== null ? `${score}%` : "No quiz taken yet";
  const performanceText =
    score === null
      ? "Your score will appear here after you complete a quiz."
      : score >= 80
        ? "Excellent work. Your quiz performance looks strong."
        : score >= 50
          ? "Nice progress. A little more practice can push this higher."
          : "Keep practicing. Your next attempt can improve quickly.";

  if (compact) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
          borderRadius: "22px",
          padding: "22px",
          color: "#fff",
          boxShadow: "0 20px 60px rgba(20, 184, 166, 0.25)",
        }}
      >
        <p style={{ margin: 0, color: "rgba(255,255,255,0.8)" }}>Quiz Score</p>
        <h2 style={{ margin: "10px 0 8px", fontSize: "2rem", color: "#fff" }}>{scoreLabel}</h2>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.86)", lineHeight: 1.6 }}>
          {performanceText}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "28px" }}>
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          display: "grid",
          gap: "24px",
        }}
      >
        <section
          style={{
            background: "linear-gradient(135deg, #082f49 0%, #0f766e 55%, #2dd4bf 100%)",
            borderRadius: "30px",
            padding: "32px",
            color: "#fff",
            boxShadow: "0 30px 80px rgba(8, 47, 73, 0.18)",
          }}
        >
          <p style={{ margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.74)", fontSize: "0.8rem" }}>
            Quiz Performance
          </p>
          <h1 style={{ margin: "0 0 10px", fontSize: "2.4rem" }}>{scoreLabel}</h1>
          <p style={{ margin: 0, maxWidth: "620px", color: "rgba(255,255,255,0.86)", lineHeight: 1.7 }}>
            {performanceText}
          </p>
          {courseTitle ? (
            <p style={{ margin: "14px 0 0", color: "rgba(255,255,255,0.78)" }}>
              Latest scored course: {courseTitle}
            </p>
          ) : null}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          {[
            { title: "Latest Result", value: scoreLabel, tone: "#0f172a" },
            {
              title: "Performance Level",
              value: score === null ? "Pending" : score >= 80 ? "Advanced" : score >= 50 ? "Growing" : "Starter",
              tone: "#0369a1",
            },
            {
              title: "How to see score",
              value: score === null ? "Complete a quiz first" : "Score saved successfully",
              tone: "#0f766e",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "#fff",
                borderRadius: "22px",
                padding: "22px",
                boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
              }}
            >
              <p style={{ margin: 0, color: "#64748b" }}>{item.title}</p>
              <h2 style={{ margin: "10px 0 0", color: item.tone }}>{item.value}</h2>
            </div>
          ))}
        </section>

        <section
          style={{
            background: "#fff",
            borderRadius: "28px",
            padding: "28px",
            boxShadow: "0 30px 80px rgba(15, 23, 42, 0.08)",
          }}
        >
          <h2 style={{ margin: "0 0 10px", color: "#0f172a" }}>How to check your quiz score</h2>
          <p style={{ margin: "0 0 10px", color: "#475569", lineHeight: 1.7 }}>
            Open one of your enrolled courses, complete the quiz for that course, and then come
            back to this page. Your latest saved score will be shown here.
          </p>
          <p style={{ margin: "0 0 20px", color: "#475569", lineHeight: 1.7 }}>
            If you have not taken any quiz yet, this page will show "No quiz taken yet".
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => navigate("/my-courses")}
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
              Go to My Courses
            </button>
            <button
              type="button"
              onClick={() => navigate("/courses")}
              style={{
                border: "1px solid #cbd5e1",
                borderRadius: "999px",
                padding: "12px 18px",
                background: "#fff",
                color: "#0f172a",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Explore More Courses
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default QuizScore;
