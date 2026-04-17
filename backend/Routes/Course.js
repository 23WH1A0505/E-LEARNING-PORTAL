const express = require("express");
const router = express.Router();
const Course = require("../Models/Course");

const fallbackCourses = [
  {
    title: "React JS Bootcamp",
    description: "Web Development",
    link: "https://react.dev",
  },
  {
    title: "Python for Data Science",
    description: "Data Science",
    link: "https://python.org",
  },
  {
    title: "Java Fundamentals",
    description: "Backend Development",
    link: "https://java.com",
  },
  {
    title: "UI/UX Design",
    description: "Design Essentials",
    link: "https://www.adobe.com",
  },
];

router.get("/", async (req, res) => {
  try {
    let courses = await Course.find();

    if (!courses.length) {
      courses = await Course.insertMany(fallbackCourses);
    }

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, instructor, link } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Course title is required" });
    }

    const existingCourse = await Course.findOne({ title: title.trim() });
    if (existingCourse) {
      return res.json(existingCourse);
    }

    const course = new Course({
      title: title.trim(),
      description,
      instructor,
      link,
    });

    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
