const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Submission = require("../Models/Submission");

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed"));
      return;
    }

    cb(null, true);
  },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const rawCourseIds = req.body.courseIds || req.body.courseId;
    const parsedCourseIds = Array.isArray(rawCourseIds)
      ? rawCourseIds
      : typeof rawCourseIds === "string"
        ? (() => {
            try {
              const parsed = JSON.parse(rawCourseIds);
              return Array.isArray(parsed) ? parsed : [rawCourseIds];
            } catch {
              return [rawCourseIds];
            }
          })()
        : [];

    const courseIds = parsedCourseIds.filter(Boolean);

    if (!req.body.studentId) {
      return res.status(400).json({ error: "Student is required" });
    }

    if (!courseIds.length) {
      return res.status(400).json({ error: "At least one course is required" });
    }

    const submissions = await Submission.insertMany(
      courseIds.map((courseId) => ({
        studentId: req.body.studentId,
        courseId,
        file: req.file.filename,
      }))
    );

    res.json({ message: "PDF uploaded successfully", submissions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
