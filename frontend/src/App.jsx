import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadTodos = async (searchTerm = '') => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchTodos(searchTerm);
      setTodos(res.data);
    } catch {
      setError('Failed to fetch todos. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    loadTodos(val);
  };

  const handleAdd = async (data) => {
    try {
      await createTodo(data);
      loadTodos(search);
    } catch {
      setError('Failed to add task.');
    }
  };

  const handleToggle = async (id, data) => {
    try {
      await updateTodo(id, data);
      loadTodos(search);
    } catch {
      setError('Failed to update task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      loadTodos(search);
    } catch {
      setError('Failed to delete task.');
    }
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>

      <TodoForm onAdd={handleAdd} />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {error && <p className="error">{error}</p>}
      {loading ? <p className="loading">Loading...</p> : (
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
