const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskcontroller');


router.get("/getAllTasks/:id", taskController.getAllTask);
router.post("/addTask", taskController.addTask);
router.put("/editTask/:id", taskController.updateTask);
router.put("/editStatus/:id", taskController.updateStatus);
router.put("/editPriority/:id", taskController.updatePriority);
router.delete("/deleteTask/:id", taskController.deleteTask);
router.get("/getTask/:id", taskController.getTaskById);

module.exports = router;
