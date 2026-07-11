const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/peerprep")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
app.get("/", (req, res) => {
  res.send("Server is working");
});
const problemRoutes = require("./routes/problemRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
app.use("/problems", problemRoutes);
app.use("/interviews", interviewRoutes);
app.listen(5002, () => {
  console.log("Server running on port 5002");
});