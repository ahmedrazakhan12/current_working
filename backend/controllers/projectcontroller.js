const db = require("../models/index");
const projectModel = db.projectModel;
const projectUsersModel = db.projectUsersModel;
const adminModel = db.adminModel;
const projectTagsModel = db.projectTagsModel;
const projectStatusModel = db.projectStatusModel;
const projectFilesModel = db.projectFilesModel
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
      tags, 
      note, 
      username, 
      activeId 
    } = req.body;

    console.log("status: ", status);
    console.log("priority: ", status);
    const tagsArray = tags.map(tag => tag.name);



    const error =
    validateTitle(projectName) ||
    validateDescription(projectDescription) ||
    validateStatus(status) ||
    validatePriority(priority) ||
    validateBudget(budget) ||
    validateDate(startAt) ||
    validateTags(tagsArray) ||
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


    const projectTagsEntries = tags.map(tags => ({
      projectId: latestId,
      tagName: tags.name,
      tagColor: tags.colorName,
    }));

    await projectTagsModel.bulkCreate(projectTagsEntries);

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
      tags, 
      note, 
      username, 
      activeId ,
      deleteUsers,
      deleteTags
    } = req.body;

    const tagsArray = tags.map(tag => tag.name);

    console.log("tags: " ,tagsArray );
    console.log("delete Tags: ", deleteTags);

    const error =
    validateTitle(projectName) ||
    validateDescription(projectDescription) ||
    validateStatus(status) ||
    validatePriority(priority) ||
    validateBudget(budget) ||
    validateDate(startAt) ||
    validateDate(endAt) ||
    validateTags(tagsArray) ||
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
            const [updatedCount] = await projectUsersModel.create(
                entry
            );

            // if (updatedCount === 0) {
            //     // Entry doesn't exist, create it
            //     await projectUsersModel.create(entry);
            //     console.log(`Created entry for userId: ${entry.userId}`);
            // } else {
            //     console.log(`Updated entry for userId: ${entry.userId}`);
            // }
        } catch (error) {
            console.error(`Error processing userId ${entry.userId}:`, error);
        }
    })
);
  


// console.log("tags02: ", tags);


const projectTagsEntries = tags.map(tag => ({
  projectId: latestId,
  tagName: tag.name,
  tagColor:tag.colorName,


}));
await Promise.all(
projectTagsEntries.map(async (entry) => {
    try {
        const [updatedCount] = await projectTagsModel.update(
            { projectId: entry.projectId },
            { where: { tagName: entry.tagName , tagColor: entry.tagColor } }
        );

        if (updatedCount === 0) {
            // Entry doesn't exist, create it
            await projectTagsModel.create(entry);
            console.log(`Created entry for userId: ${entry.tagName}`);
        } else {
            console.log(`Updated entry for userId: ${entry.tagName}`);
        }
    } catch (error) {
        console.error(`Error processing userId ${entry.tagName}:`, error);
    }
})
);

if (Array.isArray(deleteUsers) && deleteUsers.length > 0) {
  await projectUsersModel.destroy({
    where: {
      userId: deleteUsers, // This matches any userId in the deleteUsers array
      projectId: id // This matches the given projectId
    }
  });
}



if (Array.isArray(deleteTags) && deleteTags.length > 0) {
  await projectTagsModel.destroy({
    where: { id: deleteTags }
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
    const users = await projectUsersModel.findAll();
    const tags = await projectTagsModel.findAll();
    const status = await projectStatusModel.findAll();

    const data = await Promise.all(projects.map(async (project) => {
      const filteredUsersIds = users.filter(user => user.projectId === project.id);
      const filteredUsers = await adminModel.findAll({ where: { id: filteredUsersIds.map(user => user.userId) } });
      const filteredStasus = status.filter(user => user.id === project.status);
      const filteredPriorities = status.filter(user => user.id === project.priority);
      const filteredTags = tags.filter(tag => tag.projectId === project.id);

      return {
        project: project,
        users: filteredUsers,
        tags: filteredTags,
        status:filteredStasus,
        priority:filteredPriorities
        
      };
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}



exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const error =
    validateStatus(status) ;

  if (error) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: error,
    });
  }
    console.log(id ,status);
    await projectModel.update({ status: status }, { where: { id: id } });
    res.status(200).send("Status successfully updated.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


exports.updatePriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;
    const error =
    validateStatus(priority) ;

  if (error) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: error,
    });
  }
    console.log(id ,priority);
    await projectModel.update({ priority: priority }, { where: { id: id } });
    res.status(200).send("Status successfully updated.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findOne({ where: { id: id } });
    const status = await projectStatusModel.findAll();
    if (!project) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Project not found",
      });
    }

    const users = await projectUsersModel.findAll({ where: { projectId: id } });
    const userIds = users.map(user => user.userId); // Assuming userId is a property of each user
    const filteredStasus = status.filter(user => user.id === project.status);
    const filteredPriorities = status.filter(user => user.id === project.priority);    
    const userData = await adminModel.findAll({
      where: {
        id: userIds,
      },
    });

    const Tags = await projectTagsModel.findAll({ where: { projectId: id } });

    const userTag = Tags.map(user => user); // Assuming userId is a property of each user
      console.log(userTag);
    
    
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
      tags : userTag,
      status:filteredStasus,
      priority:filteredPriorities
    }];
    
    

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


// controllers/projectcontroller.js

exports.addMedia = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.files && req.files.length > 0) {
      const mediaFiles = req.files.map(file => ({
        // filename: file.filename,
        file: `http://localhost:5000/${file.path}`,
        // mimetype: file.mimetype,
        projectId: id  // Assuming you have a projectId field to relate to the project
      }));

      console.log("Files received: ", mediaFiles);

      // Save files information to the database
      await projectFilesModel.bulkCreate(mediaFiles);
      console.log("Files uploaded and saved successfully: ");

      res.status(200).json({ message: "Files uploaded and saved successfully", files: mediaFiles });
    } else {
      res.status(400).json({ message: "No files received" });
    }
  } catch (error) {
    console.error("Error in addMedia: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


















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
