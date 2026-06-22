const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");

router.get("/search", controller.searchTasks);

router.post("/", controller.createTask);
router.get("/", controller.getTasks);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

router.patch("/:id/status", controller.updateStatus);

module.exports = router;