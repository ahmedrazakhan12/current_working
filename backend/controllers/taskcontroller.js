const db = require("../models/index");
const taskModel = db.taskModel;

const {
  validateTitle,
  validateDescription,
  validateStatus,
} = require("../middlewares/Projectvalidation");

exports.addTask = async (req, res) => {
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

    await taskModel.create({
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
exports.updateTask = async (req, res) => {
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

    await taskModel.update(
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

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await taskModel.findOne({ where: { id: id } });
    if (!project) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Project not found",
      });
    }

    // Delete the admin
    await taskModel.destroy({ where: { id: id } });
    console.log("Project successfully deleted.");
    res.status(200).json({ message: "Project deleted successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


exports.getAllTask = async (req, res) => {
  try {
    const projects = await taskModel.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await taskModel.findOne({ where: { id: id } });
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