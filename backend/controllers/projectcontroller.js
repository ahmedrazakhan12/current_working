const db = require("../models/index");
const projectModel = db.projectModel;

const {
  validateTitle,
  validateDescription,
  validateStatus,
} = require("../middlewares/Projectvalidation");

exports.addProject = async (req, res) => {
  try {
    const { projectName, projectDescription, status } = req.body;
    console.log(projectName, projectDescription, status);

    const error =
      validateTitle(projectName) ||
      validateDescription(projectDescription) ||
      validateStatus(status);
    if (error) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: error,
      });
    }

    await projectModel.create({
      projectName: projectName,
      projectDescription: projectDescription,
      status: status,
    });
    res.status(200).send("Project successfully added.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectName, projectDescription, status } = req.body;

    const error =
      validateTitle(projectName) ||
      validateDescription(projectDescription) ||
      validateStatus(status);
    if (error) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: error,
      });
    }

    await projectModel.update(
      {
        projectName: projectName,
        projectDescription: projectDescription,
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send("Project successfully updated.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await projectModel.findOne({ where: { id: id } });
    if (!project) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Project not found",
      });
    }

    // Delete the admin
    await projectModel.destroy({ where: { id: id } });
    console.log("Project successfully deleted.");
    res.status(200).json({ message: "Project deleted successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findOne({ where: { id: id } });
    if (!project) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Project not found",
      });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}