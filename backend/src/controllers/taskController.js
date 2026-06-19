const taskService = require("../services/taskService");

// controller layer handles request/response
// business logic is handled in service layer

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

const updateTask = async (req, res) => {
  try {
    const updated = await taskService.updateTask(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const updated = await taskService.updateTaskStatus(
      req.params.id,
      req.body.status
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const searchTasks = async (req, res) => {
  try {
    const tasks = await taskService.searchTasks(req.query.q);
    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Search failed" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateStatus,
  searchTasks,
};