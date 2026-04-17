const express = require("express");
const router = express.Router();
const QuizScore = require("../Models/QuizeScore");

router.get("/student/:studentId", async (req, res) => {
  try {
    const scores = await QuizScore.find({ studentId: req.params.studentId })
      .sort({ date: -1 })
      .populate("courseId", "title");

    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const scores = await QuizScore.find();
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const score = new QuizScore(req.body);
    await score.save();
    res.status(201).json(score);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
