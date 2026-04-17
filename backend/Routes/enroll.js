const express = require("express");
const router = express.Router();
const Enrollment = require("../Models/Enrollment");

router.post("/", async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({ message: "studentId and courseId are required" });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.json({ msg: "Already enrolled", enrollment: existingEnrollment });
    }

    const enrollment = new Enrollment({
      student: studentId,
      course: courseId,
    });

    await enrollment.save();

    res.json({ msg: "Enrollment successful", enrollment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const data = await Enrollment.find({
      student: req.params.studentId,
    }).populate("course");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
