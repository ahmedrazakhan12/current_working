const db = require("../models/index");
const taskModel = db.taskModel;
const taskUsersModel = db.taskUsersModel;
const adminModel = db.adminModel;
const {
  validateTitle,
  validateDescription,
  validateStatus,
  validatePriority,
  validateBudget,
  validateDate,
  validateUserId,
  validateTags,

} = require("../middlewares/Projectvalidation");

  exports.addTask = async (req, res) => {
  try {
    const { 
      taskName,
      taskDescription,
      status,
      priority,
      startAt,
      endAt,
      usersID,
      note,
      projectName,
      projectId
    } = req.body;




    const error =
    validateTitle(taskName) ||
    validateDescription(taskDescription) ||
    validateStatus(status) ||
    validatePriority(priority) ||
    validateDate(startAt) ||
    validateDate(endAt) ||
    validateDescription(note) ||
    validateUserId(usersID);

    if (error) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: error,
      });
    }

    // Create the project
    const user = await taskModel.create({
      taskName:taskName,
      taskDescription:taskDescription,
      projectName:projectName,
      status:status,
      priority:priority,
      startAt:startAt,
      endAt:endAt,
      note:note,
      projectId:projectId,
    });

    const latestId = user.id;

    // Iterate over each userID and create a new entry in projectUsersModel
    const taskUserEntries = usersID.map(userId => ({
      taskId: latestId,
      userId: userId,
    }));

    await taskUsersModel.bulkCreate(taskUserEntries);
    console.log("Done");
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
    const { taskName, taskDescription, status } = req.body;

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
    const { id } = req.headers;
    const tasks = await taskModel.findAll();
    const users = await taskUsersModel.findAll();

       const data = await Promise.all(tasks.map(async (task) => {
      const filteredUsersIds = users.filter(user => user.taskId === task.id);
      const filteredUsers = await adminModel.findAll({ where: { id: filteredUsersIds.map(user => user.userId) } });

      return {
        task: task,
        users: filteredUsers,
      };
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await taskModel.findAll({ where: { id: id } });
    const users = await taskUsersModel.findAll({ where: { taskId: id } });

       const data = await Promise.all(tasks.map(async (task) => {
      const filteredUsersIds = users.filter(user => user.taskId === task.id);
      const filteredUsers = await adminModel.findAll({ where: { id: filteredUsersIds.map(user => user.userId) } });

      return {
        task: task,
        users: filteredUsers,
      };
    }));

    res.status(200).json(data)
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}