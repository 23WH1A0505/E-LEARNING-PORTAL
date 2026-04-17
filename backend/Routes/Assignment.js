const express = require("express");
const router = express.Router();
const Assignment = require("../Models/Assignment");

/**
 * @swagger
 * tags:
 *   name: Assignments
 *   description: Assignment API
 */

/**
 * @swagger
 * /assignments:
 *   post:
 *     summary: Create assignment
 *     tags: [Assignments]
 */
router.post("/", async (req, res) => {
  const assignment = new Assignment(req.body);
  await assignment.save();
  res.json({ message: "Assignment created" });
});

/**
 * @swagger
 * /assignments:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assignments]
 */
router.get("/", async (req, res) => {
  const assignments = await Assignment.find().populate("courseId");
  res.json(assignments);
});

module.exports = router;