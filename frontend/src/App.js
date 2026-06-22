import React, { useEffect, useState } from "react";
import API from "./api";

// frontend communicates with backend APIs using axios
// UI updates dynamically after each API call

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/");
      setTasks(res.data);
      setError("");
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task → POST
  const addTask = async () => {
    try {
      await API.post("/", { title });
      setTitle("");
      fetchTasks();
    } catch {
      setError("Failed to add task");
    }
  };

  // Delete → DELETE
  const deleteTask = async (id) => {
    try {
      await API.delete(`/${id}`);
      fetchTasks();
    } catch {
      setError("Delete failed");
    }
  };

  // Update → PUT
  const updateTask = async () => {
    try {
      await API.put(`/${editId}`, { title: editText });
      setEditId(null);
      setEditText("");
      fetchTasks();
    } catch {
      setError("Update failed");
    }
  };

  // Toggle → PATCH
  const toggleStatus = async (id, status) => {
    try {
      await API.patch(`/${id}/status`, {
        status: status === "pending" ? "completed" : "pending",
      });
      fetchTasks();
    } catch {
      setError("Status update failed");
    }
  };

  // Search → GET
  const handleSearch = async () => {
    try {
      const res = await API.get(`/search?q=${search}`);
      setTasks(res.data);
    } catch {
      setError("Search failed");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>To-Do App</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>

      <br /><br />

      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <button onClick={fetchTasks}>Reset</button>

      {loading && <p>Loading...</p>}

      {error && (
        <div>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={fetchTasks}>Retry</button>
        </div>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editId === task._id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={updateTask}>Save</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleStatus(task._id, task.status)}
                  style={{
                    textDecoration:
                      task.status === "completed" ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {task.title}
                </span>

                <button
                  onClick={() => {
                    setEditId(task._id);
                    setEditText(task.title);
                  }}
                >
                  Edit
                </button>

                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;