const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskcontroller');


router.get("/getAllTasks", taskController.getAllTask);
router.post("/addTask", taskController.addTask);
router.put("/editProject/:id", taskController.updateTask);
router.delete("/deleteProject/:id", taskController.deleteTask);
router.get("/getTask/:id", taskController.getTaskById);

module.exports = router;
