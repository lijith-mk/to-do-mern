const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const taskRoutes = require("./src/routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});