const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");

// search route
router.get("/search", controller.searchTasks);

// CRUD routes
router.post("/", controller.createTask);
router.get("/", controller.getTasks);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

// status update
router.patch("/:id/status", controller.updateStatus);

module.exports = router;