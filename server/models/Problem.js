const mongoose = require("mongoose");
const problemSchema = new mongoose.Schema({
  title: String,
  topic: String,
  difficulty: String,
  status: String
});
module.exports = mongoose.model("Problem", problemSchema);