const express = require("express");
const router = express.Router();
const Enrollment = require("../Models/Enrollment");

// POST: Enroll a student in a course
router.post("/", async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const enrollment = new Enrollment({ studentId, courseId });
    await enrollment.save();
    res.json({ msg: "Enrollment successful ✅", enrollment });
  } catch (err) {
    res.status(500).json({ msg: "Error enrolling ❌", error: err.message });
  }
});

// GET: Fetch all enrollments for a student
router.get("/:studentId", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.params.studentId })
      .populate("courseId"); // optional: get course details
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching enrollments ❌", error: err.message });
  }
});

module.exports = router;
