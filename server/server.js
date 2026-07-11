const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const Problem = require("./models/Problem");
const Interview = require("./models/Interview");
app.get("/problems", async (req, res) => {
  const data = await Problem.find();
  res.json(data);
});
app.post("/problems/add", async (req, res) => {
  try {
    const newProblem = new Problem(req.body);
    await newProblem.save();
    res.json({ message: "Added" });
  } catch (err) {
    res.status(500).json(err);
  }
});
app.put("/problems/update/:id", async (req, res) => {
  await Problem.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});
app.delete("/problems/delete/:id", async (req, res) => {
  await Problem.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
app.get("/interviews", async (req, res) => {
  const data = await Interview.find();
  res.json(data);
});
app.post("/interviews/add", async (req, res) => {
  const newInterview = new Interview(req.body);
  await newInterview.save();
  res.json({ message: "Added" });
});
mongoose.connect("mongodb://127.0.0.1:27017/peerprep")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
app.listen(5002, () => {
  console.log("Server running on 5002");
});