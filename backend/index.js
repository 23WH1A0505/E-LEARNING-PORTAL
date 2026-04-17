const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const studentRouter = require("./Routes/Student");
const enrollRoutes = require("./Routes/enroll");
const courseRoutes = require("./Routes/Course");
const submissionRoutes = require("./Routes/Submission");
const quizScoreRoutes = require("./Routes/QuizScore");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/elearning")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/students", studentRouter);
app.use("/api/enroll", enrollRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/score", quizScoreRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
