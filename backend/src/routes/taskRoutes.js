const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Search FIRST
router.get("/search", taskController.searchTasks);

// CRUD
router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

// Status
router.patch("/:id/status", taskController.updateStatus);

module.exports = router;