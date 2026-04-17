const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  title: String,
  description: String,
});

module.exports = mongoose.model("Assignment", assignmentSchema);