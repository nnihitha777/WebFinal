import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function MockInterview() {
  const [data, setData] = useState({
    interviewer: "",
    topic: "",
    feedback: ""
  });

  const [list, setList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const generateSuggestion = (data) => {
    let suggestions = [];
    if (data.length === 0) {
      return ["No interviews yet. Start practicing."];
    }
    let weakCount = 0;
    let commCount = 0;
    let slowCount = 0;
    let positiveCount = 0;
    let topicStats = {};
    data.forEach(d => {
      let text = d.feedback.toLowerCase();
      if (text.includes("weak") || text.includes("poor") || text.includes("confused")) {
        weakCount++;
      }
      if (text.includes("communication") || text.includes("explain")) {
        commCount++;
      }
      if (text.includes("slow") || text.includes("time")) {
        slowCount++;
      }
      if (text.includes("good") || text.includes("great") || text.includes("clear")) {
        positiveCount++;
      }
      if (!topicStats[d.topic]) {
        topicStats[d.topic] = { total: 0, negative: 0 };
      }
      topicStats[d.topic].total++;
      if (text.includes("weak") || text.includes("poor")) {
        topicStats[d.topic].negative++;
      }
    });
    let weakestTopic = null;
    let maxWeakRatio = 0;
    Object.keys(topicStats).forEach(topic => {
      let ratio = topicStats[topic].negative / topicStats[topic].total;
      if (ratio > maxWeakRatio) {
        maxWeakRatio = ratio;
        weakestTopic = topic;
      }
    });
    if (weakCount > 0) {
      suggestions.push(`Negative feedback count: ${weakCount}. Improve fundamentals.`);
    }
    if (commCount > 0) {
      suggestions.push("Improve communication and explanation clarity.");
    }
    if (slowCount > 0) {
      suggestions.push("Work on speed and time management.");
    }
    if (weakestTopic && maxWeakRatio > 0.5) {
      suggestions.push(`Weakest topic: ${weakestTopic}. Revise it.`);
    }
    if (positiveCount > weakCount && data.length > 2) {
      suggestions.push("Performance improving. Try harder questions.");
    }
    if (data.length < 3) {
      suggestions.push("Take more mock interviews for better insights.");
    }
    if (suggestions.length === 0) {
      suggestions.push("You're doing well. Keep practicing.");
    }
    return suggestions;
  };
  const load = useCallback(async () => {
    const res = await axios.get("http://127.0.0.1:5002/interviews");
    setList(res.data);
    const adviceList = generateSuggestion(res.data);
    setSuggestions(adviceList);
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const addInterview = async () => {
    await axios.post("http://127.0.0.1:5002/interviews/add", data);
    setData({ interviewer: "", topic: "", feedback: "" });
    load();
  };
  return (
    <div className="form">
      <h2>Mock Interviews</h2>
      <input
        name="interviewer"
        placeholder="Interviewer"
        value={data.interviewer}
        onChange={handleChange}
      />
      <input
        name="topic"
        placeholder="Topic"
        value={data.topic}
        onChange={handleChange}
      />
      <input
        name="feedback"
        placeholder="Feedback"
        value={data.feedback}
        onChange={handleChange}
      />
      <br />
      <button onClick={addInterview}>Add</button>
      {list.map((item, i) => (
        <div className="problem" key={i}>
          <b>{item.interviewer}</b> | {item.topic} | {item.feedback}
        </div>
      ))}
      <div className="interview-suggestion">
        <h3>Interview Insights</h3>
        <ul>
          {suggestions.map((s, index) => (
            <li key={index}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default MockInterview;