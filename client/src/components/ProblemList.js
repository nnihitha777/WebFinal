import React, { useEffect, useState } from "react";
import axios from "axios";
function ProblemList() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const load = async () => {
    const res = await axios.get("http://127.0.0.1:5002/problems");
    setData(res.data);
  };
  useEffect(() => {
    load();
  }, []);
  const deleteProblem = async (id) => {
    await axios.delete(`http://127.0.0.1:5002/problems/${id}`);
    load();
  };
  const startEdit = (p) => {
    setEditId(p._id);
    setEditData(p);
  };
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const updateProblem = async () => {
    await axios.put(`http://127.0.0.1:5002/problems/${editId}`, editData);
    setEditId(null);
    load();
  };
  return (
    <div className="list">
      <h2>Problems</h2>
      {data.map((p) => (
        <div className="problem" key={p._id}>
          {editId === p._id ? (
            <>
              <input name="title" value={editData.title} onChange={handleChange} />
              <input name="topic" value={editData.topic} onChange={handleChange} />
              <input name="difficulty" value={editData.difficulty} onChange={handleChange} />
              <input name="status" value={editData.status} onChange={handleChange} />
              <button onClick={updateProblem}>Save</button>
            </>
          ) : (
            <>
              <b>{p.title}</b> | {p.topic} | {p.difficulty} | {p.status}
              <button onClick={() => startEdit(p)}>Edit</button>
              <button onClick={() => deleteProblem(p._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
export default ProblemList;