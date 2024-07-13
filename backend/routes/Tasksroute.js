const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskcontroller');


router.get("/getAllProject", taskController.getAllTask);
router.post("/addProject", taskController.addTask);
router.put("/editProject/:id", taskController.updateTask);
router.delete("/deleteProject/:id", taskController.deleteTask);
router.get("/getProject/:id", taskController.getTaskById);

module.exports = router;
