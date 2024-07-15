const express = require("express");
const router = express.Router();
const projectController = require('../controllers/projectcontroller');

router.get("/getAllProject", projectController.getAllProjects);
router.post("/addProject", (req, res) => {
  projectController.addProject(req, res);
});
router.put("/editProject/:id", projectController.updateProject);
router.delete("/deleteProject/:id", projectController.deleteProject);
router.get("/getProject/:id", projectController.getProjectById);

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const projectController = require('../controllers/projectcontroller');


// router.get("/getAllProject", projectController.getAllProjects);
// router.post("/addProject", projectController.addProject);
// router.put("/editProject/:id", projectController.updateProject);
// router.delete("/deleteProject/:id", projectController.deleteProject);
// router.get("/getProject/:id", projectController.getProjectById);

// module.exports = router;
