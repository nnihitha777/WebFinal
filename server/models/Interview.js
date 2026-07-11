const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  interviewer: String,
  topic: String,
  feedback: String
});

module.exports = mongoose.model("Interview", interviewSchema);