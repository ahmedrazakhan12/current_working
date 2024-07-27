const db = require("../models/index");
const projectModel = db.projectModel;
const projectUsersModel = db.projectUsersModel;
const adminModel = db.adminModel;
const projectTagsModel = db.projectTagsModel;
const projectStatusModel = db.projectStatusModel;
const projectFilesModel = db.projectFilesModel
const taskModel = db.taskModel;
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
const { taskUsersModel } = require("../models/taskUsersModel");
const { taskFilesModel } = require("../models/Taskfilemodel");



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
    // validateDescription(note) ||
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
      creator: activeId,
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

    const existingEntries = await projectUsersModel.findAll({
      where: {
        projectId: latestId,
      },
      attributes: ['userId']
    });
    
    // Extract existing user IDs
    const existingUserIds = existingEntries.map(entry => entry.userId);
    
    // Filter out user IDs that are already associated with the project
    const newUsersId = usersID.filter(userId => !existingUserIds.includes(userId));
    
    // Create new entries for users that are not yet associated with the project
    const projectUserEntries = newUsersId.map(userId => ({
      projectId: latestId,
      userId: userId,
    }));
    
    // Bulk create new entries
    await projectUsersModel.bulkCreate(projectUserEntries);
    // const existingEntries = await projectUsersModel.findAll({
    //   where: {
    //     projectId: latestId,
    //   },
    // });
    
    
    // // Iterate over each userID and create a new entry in projectUsersModel
    // const projectUserEntries = usersID.map(userId => ({
    //   projectId: latestId,
    //   userId: userId,
    // }));

    // await projectUsersModel.bulkCreate(projectUserEntries);


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

    // console.log("tags: " ,tagsArray );
    console.log("deleteUsers: ", deleteUsers);

    const error =
    validateTitle(projectName) ||
    validateDescription(projectDescription) ||
    validateStatus(status) ||
    validatePriority(priority) ||
    validateBudget(budget) ||
    validateDate(startAt) ||
    validateDate(endAt) ||
    validateTags(tagsArray);
    // validateDescription(note);
    // validateUserId(usersID)

    if (error) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: error,
      });
    }


    if (Array.isArray(deleteUsers) && deleteUsers.length > 0) {
      await projectUsersModel.destroy({
        where: {
          userId: deleteUsers, // This matches any userId in the deleteUsers array
          projectId: id // This matches the given projectId
        }
      });

      await taskUsersModel.destroy({
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
    console.log("ID: ", id);

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
    await projectUsersModel.destroy({ where: { projectId: id } });
    await projectFilesModel.destroy({ where: { projectId: id } });
    await db.favoriteProjectModel.destroy({ where: { projectId: id } });
    await projectTagsModel.destroy({ where: { projectId: id } });
    await taskFilesModel.destroy({ where: { projectId: id } });
    await taskModel.destroy({ where: { projectId: id } });
    await taskUsersModel.destroy({ where: { projectId: id } });

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
    const creator = await adminModel.findAll();
    const tasks = await taskModel.findAll();

    const data = await Promise.all(projects.map(async (project) => {
      const filteredUsersIds = users.filter(user => user.projectId === project.id);
      const filteredCreatorIds = creator.filter(creator => creator.id === project.creator );
      const filteredUsers = await adminModel.findAll({ where: { id: filteredUsersIds.map(user => user.userId) } });
      const filteredStasus = status.filter(user => user.id === project.status);
      const filteredPriorities = status.filter(user => user.id === project.priority);
      const filteredTags = tags.filter(tag => tag.projectId === project.id);
      const filterTasks = tasks.filter(task => task.projectId === project.id);

      return {
        project: project,
        creator: filteredCreatorIds,
        users: filteredUsers,
        tags: filteredTags,
        status:filteredStasus,
        priority:filteredPriorities,
        tasks:filterTasks
        
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
    const creator = await adminModel.findAll();
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
    const createrData = creator.filter(user => user.id === project.creator );
    const userData = await adminModel.findAll({
      where: {
        id: userIds,
      },
    });

    const Tags = await projectTagsModel.findAll({ where: { projectId: id } });

    const userTag = Tags.map(user => user); // Assuming userId is a property of each user
        
 
    const data = [{
      project: project,
      creator: createrData,
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
        filename: file.filename,
        file: `http://localhost:5000/${file.path}`,
        mimetype: file.mimetype,
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





exports.getMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await projectFilesModel.findAll({ where: { projectId: id } });
    if (!media) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Media not found",
      });
    }
    res.status(200).json(media);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}



exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await db.taskFilesModel.destroy({ where: { id: id } });
    if (!media) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Media not found",
      });
    }
    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}





exports.favProject = async (req, res) => {
  try {
    const { userId , projectId } = req.body;
    console.log(userId , projectId);

    await db.favoriteProjectModel.create({  userId: userId , projectId: projectId });
    res.status(200).send("Fav successfully updated.");
    console.log("fav successfully updated.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}



exports.deleteFavProject = async (req, res) => {
  try {
    const { userId , projectId } = req.body;
    console.log(userId , projectId);
    await db.favoriteProjectModel.destroy({ where: { userId: userId , projectId: projectId } });
    res.status(200).send("Fav successfully updated.");
    console.log("fav successfully updated.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
} 

exports.getFavProject = async (req, res) => {
  try {
    const { id } = req.query; // Get id from query parameters
    console.log(id);
    if (!id) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Please log in first!",
      });
    }
    const projectId = await db.favoriteProjectModel.findAll({ where: { userId: id } });
    const projects = await projectModel.findAll({where : { id: projectId.map(project => project.projectId) } });

    if (!projects) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Projects not found",
      });
    }
    const users = await projectUsersModel.findAll();
    const tags = await projectTagsModel.findAll();
    const status = await projectStatusModel.findAll();
    const creator = await adminModel.findAll();
    const tasks = await taskModel.findAll();

    const data = await Promise.all(projects.map(async (project) => {
      const filteredUsersIds = users.filter(user => user.projectId === project.id);
      const filteredCreatorIds = creator.filter(creator => creator.id === project.creator );
      const filteredUsers = await adminModel.findAll({ where: { id: filteredUsersIds.map(user => user.userId) } });
      const filteredStasus = status.filter(user => user.id === project.status);
      const filteredPriorities = status.filter(user => user.id === project.priority);
      const filteredTags = tags.filter(tag => tag.projectId === project.id);
      const filterTasks = tasks.filter(task => task.projectId === project.id);

      return {
        projectId : projectId,
        project: project,
        creator: filteredCreatorIds,
        users: filteredUsers,
        tags: filteredTags,
        status:filteredStasus,
        priority:filteredPriorities,
        tasks:filterTasks
        
      };
    }));

    res.status(200).json(data);
  

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};






exports.getFavProjectByID = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    if (!id) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Please log in first!",
      });
    }
    const result = await db.favoriteProjectModel.findAll({ where: { userId: id } });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getFilterProject = async (req, res) => {
  try {
    const { status, priority, tags } = req.query;

    let whereClause = {};

    if (status && status !== 'all' && status !== 'none') {
      whereClause.status = status;
    }

    if (priority && priority !== 'all' && priority !== 'none') {
      whereClause.priority = priority;
    }

    let projects;
    if (Object.keys(whereClause).length > 0) {
      projects = await projectModel.findAll({ where: whereClause });
    } else {
      projects = await projectModel.findAll();
    }

    const users = await projectUsersModel.findAll();
    const tagsModel = await projectTagsModel.findAll();
    const statusModel = await projectStatusModel.findAll();
    const creator = await adminModel.findAll();
    const tasks = await taskModel.findAll();

    const data = await Promise.all(projects.map(async (project) => {
      const filteredUsersIds = users.filter(user => user.projectId === project.id);
      const filteredCreatorIds = creator.filter(creator => creator.id === project.creator);
      const filteredUsers = await adminModel.findAll({ where: { id: filteredUsersIds.map(user => user.userId) } });
      const filteredStatus = statusModel.filter(user => user.id === project.status);
      const filteredPriorities = statusModel.filter(user => user.id === project.priority);
      const filteredTags = tagsModel.filter(tag => tag.projectId === project.id);
      const filterTasks = tasks.filter(task => task.projectId === project.id);

      return {
        project: project,
        creator: filteredCreatorIds,
        users: filteredUsers,
        tags: filteredTags,
        status: filteredStatus,
        priority: filteredPriorities,
        tasks: filterTasks
      };
    }));

    if (tags && tags !== 'all') {
      const tagsArray = tags.split(',');
      const filteredData = data.filter(item =>
        item.tags.some(tag => tagsArray.includes(tag.tagName))
      );
      return res.status(200).json(filteredData);
    }

    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
