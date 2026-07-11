import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AddProblem from "./components/AddProblem";
import ProblemList from "./components/ProblemList";
import MockInterview from "./components/MockInterview";
function App() {
  return (
    <div className="container">
      <h1>PeerPrep</h1>
      <Dashboard />
      <AddProblem />
      <ProblemList />
      <MockInterview />
    </div>
  );
}
export default App;