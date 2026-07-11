const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");
router.get("/", async (req, res) => {
  const data = await Interview.find();
  res.json(data);
});
router.post("/add", async (req, res) => {
  const newInterview = new Interview(req.body);
  await newInterview.save();
  res.json({ msg: "Added" });
});
module.exports = router; 