const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatcontroller");
const multer = require("../middlewares/Multer");

router.get("/getChat", chatController.GetChats);
router.get("/getChatbarUser/:id", chatController.GetChatBarUsers);

// router.post("/verifyToken", );

module.exports = router;
