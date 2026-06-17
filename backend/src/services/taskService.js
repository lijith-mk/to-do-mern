const Task = require("../models/taskModel");

// Create
const createTask = async (data) => {
  return await Task.create(data);
};

// Get All
const getAllTasks = async () => {
  return await Task.find().sort({ createdAt: -1 });
};

// Get One
const getTaskById = async (id) => {
  return await Task.findById(id);
};

// Update
const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, { new: true });
};

// Delete
const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

// Update Status
const updateTaskStatus = async (id, status) => {
  return await Task.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

// Search
const searchTasks = async (query) => {
  return await Task.find({
    title: { $regex: query, $options: "i" },
  });
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
  searchTasks,
};