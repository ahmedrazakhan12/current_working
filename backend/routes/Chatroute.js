const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatcontroller");
const multer = require("../middlewares/Multer");

router.get("/getChat", chatController.GetChats);

// router.post("/verifyToken", );

module.exports = router;
