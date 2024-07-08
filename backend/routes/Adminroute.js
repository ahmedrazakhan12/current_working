const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller");
const verifyToken = require("../middlewares/Verifytoken");
const multer = require("../middlewares/Multer");

router.post("/login", adminController.adminLogin);
router.get("/decodedToken", verifyToken, adminController.adminData);
router.get("/adminInfo", adminController.adminInfo);
router.put("/editProfile", multer, adminController.adminEditPfpImage);
router.post("/register", multer, adminController.adminRegister);
router.put("/changePassword", adminController.superAdminChangePassword);
router.get("/team", adminController.getAllAdmins);
router.get("/team/:id", adminController.getAdminById);
router.delete("/team/delete/:id", adminController.adminDelete);
router.put("/changeAdminPassword/:id", adminController.adminChangePassword);
router.get("/search/:key", adminController.adminSearch);
// router.put("/imageDel/:id"  , adminController.imageDel);

// router.post("/verifyToken", );

module.exports = router;
