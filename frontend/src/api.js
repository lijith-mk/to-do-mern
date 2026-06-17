import axios from "axios";

const API = axios.create({
  baseURL: "https://to-do-mernbackend.onrender.com/api/tasks",
});

export default API;