const express = require("express");
const router = express.Router();
const notifyController = require('../controllers/notifycontroller');

router.get("/getNotification/:id", notifyController.getNotification);

// router.get("/getAllProject", projectController.getAllProjects);


module.exports = router;

