const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
router.get("/", async (req, res) => {
  const data = await Problem.find();
  res.json(data);
});
router.post("/add", async (req, res) => {
  const newProblem = new Problem(req.body);
  await newProblem.save();
  res.json({ msg: "Added" });
});
router.delete("/:id", async (req, res) => {
  await Problem.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});
router.put("/:id", async (req, res) => {
  await Problem.findByIdAndUpdate(req.params.id, req.body);
  res.json({ msg: "Updated" });
});
module.exports = router;