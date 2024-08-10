const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatcontroller");
const multer = require("../middlewares/Multer");

router.get("/getChat", chatController.GetChats);
router.get("/getChatbarUser/:id", chatController.GetChatBarUsers);
router.post("/createGroup", multer ,chatController.groupChat);
router.get("/getGroups/:id", chatController.getGroups);

// router.post("/verifyToken", );

module.exports = router;
