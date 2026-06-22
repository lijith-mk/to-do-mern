const Task = require("../models/taskModel");
const mongoose = require("mongoose");

// service layer handles validation + business logic

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const createTask = async (data) => {
  let { title, description } = data;

  if (!title || title.trim() === "") {
    throw new Error("Title is required");
  }

  title = title.trim();

  if (title.length < 3) {
    throw new Error("Title must be at least 3 characters");
  }

  if (title.length > 50) {
    throw new Error("Title too long");
  }

  if (description && description.length > 200) {
    throw new Error("Description too long");
  }

  const task = new Task({
    title,
    description: description || "",
  });

  return await task.save();
};

const getAllTasks = async () => {
  return await Task.find().sort({ createdAt: -1 });
};

const updateTask = async (id, data) => {
  if (!isValidId(id)) throw new Error("Invalid task ID");

  let { title } = data;

  if (!title || title.trim() === "") {
    throw new Error("Title cannot be empty");
  }

  title = title.trim();

  const updated = await Task.findByIdAndUpdate(
    id,
    { title },
    { new: true }
  );

  if (!updated) throw new Error("Task not found");

  return updated;
};

const deleteTask = async (id) => {
  if (!isValidId(id)) throw new Error("Invalid task ID");

  const deleted = await Task.findByIdAndDelete(id);

  if (!deleted) throw new Error("Task not found");

  return deleted;
};

const updateTaskStatus = async (id, status) => {
  if (!isValidId(id)) throw new Error("Invalid task ID");

  const allowed = ["pending", "completed"];

  if (!allowed.includes(status)) {
    throw new Error("Invalid status value");
  }

  const updated = await Task.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!updated) throw new Error("Task not found");

  return updated;
};

const searchTasks = async (query) => {
  if (!query || query.trim() === "") return [];

  return await Task.find({
    title: { $regex: query, $options: "i" },
  });
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  searchTasks,
};