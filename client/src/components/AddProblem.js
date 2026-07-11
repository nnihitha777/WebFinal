import React, { useState } from "react";
import axios from "axios";
function AddProblem() {
  const [form, setForm] = useState({
    title: "",
    topic: "",
    difficulty: "",
    status: ""
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submit = async () => {
    if (!form.title || !form.topic) {
      alert("Enter title");
      return;
    }
    await axios.post("http://127.0.0.1:5002/problems/add", form);
    alert("Problem Added!");
    setForm({
      title: "",
      topic: "",
      difficulty: "",
      status: ""
    });
    window.location.reload(); 
  };
  return (
    <div className="form">
      <h2>Add Problem</h2>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="topic"
        placeholder="Topic"
        value={form.topic}
        onChange={handleChange}
      />
      <input
        name="difficulty"
        placeholder="Difficulty (Easy/Medium/Hard)"
        value={form.difficulty}
        onChange={handleChange}
      />
      <input
        name="status"
        placeholder="Status (Solved/Unsolved)"
        value={form.status}
        onChange={handleChange}
      />
      <br />
      <button onClick={submit}>Add</button>
    </div>
  );
}
export default AddProblem;