import React, { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/");
      setTasks(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!title) return;

    try {
      await API.post("/", { title });
      setTitle("");
      fetchTasks();
    } catch {
      setError("Failed to add task");
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/${id}`);
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  // Toggle Status
  const toggleStatus = async (id, status) => {
    try {
      await API.patch(`/${id}/status`, {
        status: status === "pending" ? "completed" : "pending",
      });
      fetchTasks();
    } catch {
      setError("Failed to update status");
    }
  };

  // Search Tasks
  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/search?q=${search}`);
      setTasks(res.data);
    } catch {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h1>To-Do App</h1>

      {/* Add Task */}
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Search */}
      <div style={{ marginTop: "10px" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search task"
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={fetchTasks}>Reset</button>
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Task List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <span
              onClick={() => toggleStatus(task._id, task.status)}
              style={{
                cursor: "pointer",
                textDecoration:
                  task.status === "completed" ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>

            <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;