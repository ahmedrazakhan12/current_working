const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskcontroller');
const mediaUpload = require("../middlewares/Mediaproject");


router.get("/getAllTasks/:id", taskController.getAllTask);
router.post("/addTask", taskController.addTask);
router.put("/editTask/:id", taskController.updateTask);
router.put("/editStatus/:id", taskController.updateStatus);
router.put("/editPriority/:id", taskController.updatePriority);
router.delete("/deleteTask/:id", taskController.deleteTask);
router.get("/getTask/:id", taskController.getTaskById);
router.post("/addMedia/:id", mediaUpload, taskController.addMedia);
router.get("/getMedia/:id", taskController.getMedia);
router.delete("/deleteMedia/:id", taskController.deleteMedia);

module.exports = router;
