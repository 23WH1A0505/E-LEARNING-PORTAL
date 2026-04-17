const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: String,
  link: String,
});

module.exports = mongoose.model("Course", courseSchema);
