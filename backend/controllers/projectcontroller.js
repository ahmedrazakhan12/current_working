const db = require("../models/index");
const projectModel = db.projectModel;
const projectUsersModel = db.projectUsersModel;
const adminModel = db.adminModel;

const {
  validateTitle,
  validateDescription,
  validateStatus,
  validatePriority,
  validateBudget,
  validateDate,
  validateUserId,

} = require("../middlewares/Projectvalidation");



exports.projectData = async (req, res) => {
  try {
    const { 
      projectName, 
      projectDescription, 
      status, 
      priority, 
      budget, 
      startAt, 
      endAt, 
      usersID, 
      tag, 
      note, 
      username, 
      activeId 
    } = req.body;

    console.log("usersID: ", usersID);

    const error =
    validateTitle(projectName) ||
    validateDescription(projectDescription) ||
    validateStatus(status) ||
    validatePriority(priority) ||
    validateBudget(budget) ||
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
    const user = await projectModel.create({
      projectName,
      projectDescription,
      status,
      priority,
      budget,
      startAt,
      endAt,
      note,
    });

    const latestId = user.id;

    // Iterate over each userID and create a new entry in projectUsersModel
    const projectUserEntries = usersID.map(userId => ({
      projectId: latestId,
      userId: userId,
    }));

    await projectUsersModel.bulkCreate(projectUserEntries);

    // Emit the project addition event to all connected clients
    const notification = { username, projectName, activeId };
    req.io.emit('projectAdded', notification);

    console.log("Done");

    res.status(200).send("Project successfully added.");

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}



exports.editProjectData = async (req, res) => {
  const { id } = req.params;
  try {
    const { 
      projectName, 
      projectDescription, 
      status, 
      priority, 
      budget, 
      startAt, 
      endAt, 
      usersID, 
      tag, 
      note, 
      username, 
      activeId ,
      deleteUsers
    } = req.body;

    console.log("deleteUsers: ", deleteUsers);

    const error =
    validateTitle(projectName) ||
    validateDescription(projectDescription) ||
    validateStatus(status) ||
    validatePriority(priority) ||
    validateBudget(budget) ||
    validateDate(startAt) ||
    validateDate(endAt) ||
    validateDescription(note);
    // validateUserId(usersID)

    if (error) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: error,
      });
    }

    // Create the project
    await projectModel.update(
      {
      projectName,
      projectDescription,
      status,
      priority,
      budget,
      startAt,
      endAt,
      note,
    },
    {
      where: {
        id: id
      }
    });

    const latestId = id;

    const projectUserEntries = usersID.map(userId => ({
      projectId: latestId,
      userId: userId,
  }));
  await Promise.all(
    projectUserEntries.map(async (entry) => {
        try {
            const [updatedCount] = await projectUsersModel.update(
                { projectId: entry.projectId },
                { where: { userId: entry.userId } }
            );

            if (updatedCount === 0) {
                // Entry doesn't exist, create it
                await projectUsersModel.create(entry);
                console.log(`Created entry for userId: ${entry.userId}`);
            } else {
                console.log(`Updated entry for userId: ${entry.userId}`);
            }
        } catch (error) {
            console.error(`Error processing userId ${entry.userId}:`, error);
        }
    })
);
  

if (Array.isArray(deleteUsers) && deleteUsers.length > 0) {
  await projectUsersModel.destroy({
    where: { userId: deleteUsers }
  });
}


    // Emit the project addition event to all connected clients
    const notification = { username, projectName, activeId };
    req.io.emit('projectAdded', notification);

    console.log("Done");

    res.status(200).send("Project successfully added.");

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


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

    const users = await projectUsersModel.findAll({ where: { projectId: id } });

    // if (users.length === 0) {
    //   return res.status(404).json({
    //     status: 404,
    //     data: null,
    //     message: "No users found for this project",
    //   });
    // }
    
    const userIds = users.map(user => user.userId); // Assuming userId is a property of each user
    
    const userData = await adminModel.findAll({
      where: {
        id: userIds,
      },
    });
    
    // if (userData.length === 0) {
    //   return res.status(404).json({
    //     status: 404,
    //     data: null,
    //     message: "Users not found",
    //   });
    // }
    
    const data = [{
      project: project,
      users: userData,
    }];
    
    

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}



















// exports.addProject = async (req, res) => {
//   try {
//     const { projectName, projectDescription, status, priority, budget, startAt, endAt,  tag, note, username, activeId } = req.body; // Make sure username is included
//     console.log(projectName, projectDescription, status, priority, budget, startAt, endAt,  tag, note, username, activeId );

    

//     await projectModel.create({
//       projectName: projectName,
//       projectDescription: projectDescription,
//       status: status,
//       priority: priority,
//       budget: budget,
//       startAt: startAt,
//       endAt: endAt,
//       note: note,
//     });

//     // Emit the project addition event to all connected clients
//     const notification = { username, projectName  ,activeId};
//     req.io.emit('projectAdded', notification);

//     // Log the notification
//     console.log('Notification sent:', notification);

//     res.status(200).send("Project successfully added.");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };


// exports.addProject = async (req, res) => {
//   try {
//     const { projectName, projectDescription, status } = req.body;
//     console.log(projectName, projectDescription, status);

//     const error =
//       validateTitle(projectName) ||
//       validateDescription(projectDescription) ||
//       validateStatus(status);
//     if (error) {
//       return res.status(400).json({
//         status: 400,
//         data: null,
//         message: error,
//       });
//     }

//     await projectModel.create({
//       projectName: projectName,
//       projectDescription: projectDescription,
//       status: status,
//     });
//     res.status(200).send("Project successfully added.");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// Update Project
// exports.updateProject = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { projectName, projectDescription, status } = req.body;

//     const error =
//       validateTitle(projectName) ||
//       validateDescription(projectDescription) ||
//       validateStatus(status);
//     if (error) {
//       return res.status(400).json({
//         status: 400,
//         data: null,
//         message: error,
//       });
//     }

//     await projectModel.update(
//       {
//         projectName: projectName,
//         projectDescription: projectDescription,
//         status: status,
//       },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );
//     res.status(200).send("Project successfully updated.");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };
