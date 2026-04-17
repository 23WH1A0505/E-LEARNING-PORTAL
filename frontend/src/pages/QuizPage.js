import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const quizLibrary = {
  "react js bootcamp": [
    {
      question: "Which hook is used to manage local component state in React?",
      options: ["useState", "useRoute", "useNode", "useClass"],
      answer: "useState",
    },
    {
      question: "What prop helps React identify list items efficiently?",
      options: ["value", "indexer", "key", "name"],
      answer: "key",
    },
    {
      question: "JSX is primarily used to describe what a React app should render as?",
      options: ["Database schema", "User interface", "Terminal output", "Server logs"],
      answer: "User interface",
    },
  ],
  "python for data science": [
    {
      question: "Which Python library is commonly used for tabular data analysis?",
      options: ["Pandas", "Flask", "Requests", "Tkinter"],
      answer: "Pandas",
    },
    {
      question: "A DataFrame is best described as what?",
      options: ["A chart format", "A two-dimensional data table", "A machine learning model", "A file extension"],
      answer: "A two-dimensional data table",
    },
    {
      question: "Which library is widely used for numerical arrays in Python?",
      options: ["NumPy", "Socket", "Django", "BeautifulSoup"],
      answer: "NumPy",
    },
  ],
  "java fundamentals": [
    {
      question: "Which keyword is used to create a subclass in Java?",
      options: ["extends", "implements", "inherits", "instanceof"],
      answer: "extends",
    },
    {
      question: "Which method is the entry point of a Java application?",
      options: ["run()", "start()", "main()", "init()"],
      answer: "main()",
    },
    {
      question: "Which of these is a primitive type in Java?",
      options: ["String", "ArrayList", "boolean", "Object"],
      answer: "boolean",
    },
  ],
  "ui/ux design": [
    {
      question: "What does UX mainly focus on?",
      options: ["Server performance", "User experience", "Database security", "Code minification"],
      answer: "User experience",
    },
    {
      question: "A wireframe is usually created to show what?",
      options: ["Final branding assets", "Basic page structure", "Production analytics", "Backend routes"],
      answer: "Basic page structure",
    },
    {
      question: "Which is most important for accessible text readability?",
      options: ["Low contrast", "Decorative fonts only", "Clear contrast", "Random spacing"],
      answer: "Clear contrast",
    },
  ],
  default: [
    {
      question: "Why are quizzes useful in e-learning?",
      options: ["They remove all study time", "They help measure understanding", "They replace every course", "They delete progress"],
      answer: "They help measure understanding",
    },
    {
      question: "What should a learner do before submitting a quiz?",
      options: ["Ignore the questions", "Review selected answers", "Close the browser", "Reset the course"],
      answer: "Review selected answers",
    },
    {
      question: "A score percentage is based on what?",
      options: ["Correct answers out of total questions", "Course title length", "Login count", "Assignment file size"],
      answer: "Correct answers out of total questions",
    },
  ],
};

function QuizPage() {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const courseTitle = location.state?.courseTitle || "Course Quiz";
  const questions = useMemo(() => {
    const normalizedTitle = courseTitle.trim().toLowerCase();
    return quizLibrary[normalizedTitle] || quizLibrary.default;
  }, [courseTitle]);

  const handleSelect = (questionIndex, option) => {
    setSelectedAnswers((current) => ({
      ...current,
      [questionIndex]: option,
    }));
  };

  const submitQuiz = async () => {
    const student = JSON.parse(localStorage.getItem("user"));
    if (!student?._id) {
      alert("Please login to submit your quiz.");
      return;
    }

    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(selectedAnswers).length;

    if (answeredQuestions !== totalQuestions) {
      alert("Please answer all questions before submitting the quiz.");
      return;
    }

    const correctAnswers = questions.reduce((total, question, index) => {
      return total + (selectedAnswers[index] === question.answer ? 1 : 0);
    }, 0);

    const percent = totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    const latestScore = {
      score: percent,
      courseTitle,
      courseId,
      correctAnswers,
      totalQuestions,
    };

    localStorage.setItem(`quizScore_${student._id}`, JSON.stringify(latestScore));
    setSubmitting(true);

    try {
      await axios.post("http://localhost:5000/api/score", {
        studentId: student._id,
        courseId,
        score: percent,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }

    setResult({ correctAnswers, totalQuestions, percent });
    navigate("/quiz", {
      state: {
        latestScore,
      },
    });
  };

  return (
    <div style={{ padding: "28px" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gap: "22px",
        }}
      >
        <section
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #0f766e 100%)",
            borderRadius: "28px",
            padding: "28px",
            color: "#fff",
          }}
        >
          <p style={{ margin: "0 0 8px", color: "rgba(255,255,255,0.72)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.82rem" }}>
            Quiz
          </p>
          <h2 style={{ margin: "0 0 10px", fontSize: "2rem" }}>{courseTitle}</h2>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.84)", lineHeight: 1.7 }}>
            Answer each question once, then submit to save your score.
          </p>
        </section>

        {questions.map((question, index) => (
          <section
            key={question.question}
            style={{
              background: "#fff",
              borderRadius: "22px",
              padding: "24px",
              boxShadow: "0 18px 50px rgba(15, 23, 42, 0.08)",
            }}
          >
            <p style={{ margin: "0 0 14px", color: "#0f172a", fontWeight: "700" }}>
              {index + 1}. {question.question}
            </p>
            <div style={{ display: "grid", gap: "12px" }}>
              {question.options.map((option) => {
                const isSelected = selectedAnswers[index] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(index, option)}
                    style={{
                      textAlign: "left",
                      borderRadius: "14px",
                      padding: "14px 16px",
                      border: isSelected ? "2px solid #0f766e" : "1px solid #cbd5e1",
                      background: isSelected ? "#ccfbf1" : "#fff",
                      color: "#0f172a",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </section>
        ))}

        <section
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={submitQuiz}
            disabled={submitting}
            style={{
              border: "none",
              borderRadius: "999px",
              padding: "13px 20px",
              background: submitting ? "#94a3b8" : "#0f172a",
              color: "#fff",
              fontWeight: "700",
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting ? "Saving Score..." : "Submit Quiz"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/quiz")}
            style={{
              border: "1px solid #cbd5e1",
              borderRadius: "999px",
              padding: "13px 20px",
              background: "#fff",
              color: "#0f172a",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            View Quiz Score
          </button>
        </section>

        {result ? (
          <section
            style={{
              background: "#ecfeff",
              border: "1px solid #99f6e4",
              borderRadius: "22px",
              padding: "24px",
            }}
          >
            <h3 style={{ margin: "0 0 10px", color: "#115e59" }}>
              Your score: {result.percent}%
            </h3>
            <p style={{ margin: 0, color: "#134e4a", lineHeight: 1.7 }}>
              You answered {result.correctAnswers} out of {result.totalQuestions} questions correctly.
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default QuizPage;
