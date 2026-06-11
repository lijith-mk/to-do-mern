const Todo = require('../models/Todo');

const getAllTodos = async (search = '') => {
  const query = search
    ? { title: { $regex: search, $options: 'i' } }
    : {};
  return await Todo.find(query).sort({ createdAt: -1 });
};

const getTodoById = async (id) => {
  return await Todo.findById(id);
};

const createTodo = async (data) => {
  const todo = new Todo(data);
  return await todo.save();
};

const updateTodo = async (id, data) => {
  return await Todo.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
