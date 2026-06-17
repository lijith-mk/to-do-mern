import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/tasks"
    : "https://to-do-mernbackend.onrender.com/api/tasks";

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;