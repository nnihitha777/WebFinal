import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);
function Dashboard() {
  const [stats, setStats] = useState({
    easy: 0,
    medium: 0,
    hard: 0
  });
  const [suggestions, setSuggestions] = useState([]);
  const generateSuggestion = (data) => {
    let suggestions = [];
    let total = data.length;
    let solved = data.filter(p => p.status === "Solved").length;
    let unsolved = total - solved;
    let easy = data.filter(p => p.difficulty === "Easy").length;
    let medium = data.filter(p => p.difficulty === "Medium").length;
    let hard = data.filter(p => p.difficulty === "Hard").length;
    let topicStats = {};
    data.forEach(p => {
      if (!topicStats[p.topic]) {
        topicStats[p.topic] = { total: 0, solved: 0 };
      }
      topicStats[p.topic].total++;
      if (p.status === "Solved") topicStats[p.topic].solved++;
    });
    let weakestTopic = null;
    let lowestRatio = 1;
    Object.keys(topicStats).forEach(topic => {
      let ratio = topicStats[topic].solved / topicStats[topic].total;
      if (ratio < lowestRatio) {
        lowestRatio = ratio;
        weakestTopic = topic;
      }
    });
    if (unsolved > 0) {
      suggestions.push(`You have ${unsolved} unsolved problems. Try clearing them.`);
    }
    if (total > 0 && solved / total < 0.5) {
      suggestions.push("Your solving rate is below 50%. Focus on completing problems.");
    }
    if (easy > medium + 3) {
      suggestions.push("Too many Easy problems. Move to Medium level.");
    }
    if (medium > easy && hard < medium / 2) {
      suggestions.push("Good Medium progress. Start practicing Hard problems.");
    }
    if (hard === 0 && total > 5) {
      suggestions.push("Try attempting some Hard problems.");
    }
    if (weakestTopic && lowestRatio < 0.5) {
      suggestions.push(`Weakest topic: ${weakestTopic}. Improve it.`);
    }
    if (solved === total && total > 0) {
      suggestions.push("All problems solved. Add new challenges.");
    }
    if (suggestions.length === 0) {
      suggestions.push("You're on track. Keep going!");
    }
    return suggestions;
  };

  const loadStats = useCallback(async () => {
    const res = await axios.get("http://127.0.0.1:5002/problems");
    const easy = res.data.filter(p => p.difficulty === "Easy").length;
    const medium = res.data.filter(p => p.difficulty === "Medium").length;
    const hard = res.data.filter(p => p.difficulty === "Hard").length;
    setStats({ easy, medium, hard });
    const adviceList = generateSuggestion(res.data);
    setSuggestions(adviceList);
  }, []);
  useEffect(() => {
    loadStats();
  }, [loadStats]);
  const chartData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [stats.easy || 1, stats.medium || 1, stats.hard || 1],
        backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
        borderColor: "#1e293b",
        borderWidth: 2,
        hoverOffset: 20
      }
    ]
  };
  const options = {
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#f1f5f9" }
      },
      tooltip: { enabled: true }
    }
  };
  return (
    <div className="dashboard">
      <h2>Progress Overview</h2>

      <div className="chart-container">
        <Pie data={chartData} options={options} />
      </div>

      <div className="suggestion-box">
        <h3>Smart Suggestions</h3>
        <ul>
          {suggestions.map((s, index) => (
            <li key={index}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
