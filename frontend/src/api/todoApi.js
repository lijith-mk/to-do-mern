import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

export const fetchTodos = (search = '') =>
  axios.get(`${API_BASE}${search ? `?search=${search}` : ''}`);

export const createTodo = (data) => axios.post(API_BASE, data);

export const updateTodo = (id, data) => axios.put(`${API_BASE}/${id}`, data);

export const deleteTodo = (id) => axios.delete(`${API_BASE}/${id}`);
