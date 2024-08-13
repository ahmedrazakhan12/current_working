const db = require("../models/index");
const taskModel = db.taskModel;
const taskUsersModel = db.taskUsersModel;
const adminModel = db.adminModel;
const statusModel = db.projectStatusModel
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


    console.log("projectId" , projectId);

    const error =
    validateTitle(taskName) ||
    validateDescription(taskDescription) ||
    validateStatus(status) ||
    validatePriority(priority) ||
    validateDate(startAt) ||
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

    // Iterate over each userID and create a new entry in taskUsersModel
    const taskUserEntries = usersID.map(userId => ({
      taskId: latestId,
      userId: userId,
      projectId: projectId
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
    const {id} = req.params;
    const { 
      taskName,
      taskDescription,
      status,
      priority,
      startAt,
      endAt,
      usersID,
      note,
      deleteUsers,
      projectId
    } = req.body;

    console.log(
      "projectId",projectId
    );

    // Validate input
    const error =
      validateTitle(taskName) ||
      validateDescription(taskDescription) ||
      validateStatus(status) ||
      validatePriority(priority) ||
      validateDate(startAt) ||
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

       
if (Array.isArray(deleteUsers) && deleteUsers.length > 0) {
  await taskUsersModel.destroy({
    where: {
      userId: deleteUsers, // This matches any userId in the deleteUsers array
      taskId: id // This matches the given projectId
    }
  });
}
    // Update the task
    await taskModel.update(
      {
        taskName: taskName,
        taskDescription: taskDescription,
        status: status,
        priority: priority,
        startAt: startAt,
        endAt: endAt,
        note: note,
      },
      {
        where: {
          id: id,  // ID of the task to update
        },
      }
    );

    

    // Create new task-user entries
    const taskUserEntries = usersID.map(userId => ({
      taskId: id,
      userId: userId,
      projectId: projectId
    }));

    await taskUsersModel.bulkCreate(taskUserEntries);


 




    res.status(200).send("Task successfully updated.");
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
    await taskUsersModel.destroy({ where: { taskId: id } });
    await db.taskFilesModel.destroy({ where: { taskId: id } });

    console.log("Project successfully deleted.");
    res.status(200).json({ message: "Project deleted successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


exports.getAllTask = async (req, res) => {
  try {
    const { id } = req.params;
  
    const tasks = await taskModel.findAll({
      where: { projectId: id },
    });
    const users = await taskUsersModel.findAll();
    const status = await statusModel.findAll();

       const data = await Promise.all(tasks.map(async (task) => {
      const filteredUsersIds = users.filter(user => user.taskId === task.id);
      const filteredStasus = status.filter(user => user.id === task.status);
      const filteredPriorities = status.filter(user => user.id === task.priority);
      const filteredUsers = await adminModel.findAll({ where: { id: filteredUsersIds.map(user => user.userId) } });

      return {
        task: task,
        users: filteredUsers,
        status: filteredStasus,
        priority: filteredPriorities
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
    // const { authorization: headerId } = req.headers; // Use 'authorization' for Authorization header
    // console.log("Headers: ", headerId);
    
    const tasks = await taskModel.findAll({ where: { id: id } });
    const users = await taskUsersModel.findAll({ where: { taskId: id } });
    const status = await statusModel.findAll();
    const project = await db.projectModel.findAll();

       const data = await Promise.all(tasks.map(async (task) => {
      const filteredUsersIds = users.filter(user => user.taskId === task.id);
      const filteredUsers = await adminModel.findAll({ where: { id: filteredUsersIds.map(user => user.userId)

       } 
    

      });

      const filteredProjectUsers = await db.projectUsersModel.findAll({ where: { projectId: task.projectId } });


      const filteredStasus = status.filter(user => user.id === task.status);
      const filteredPriorities = status.filter(user => user.id === task.priority);

      const filteredProjectCreator = project.find(project => project.id === task.projectId);

      return {
        task: task,
        users: filteredUsers,
        status: filteredStasus,
        priority: filteredPriorities,
        filteredProjectUsers:filteredProjectUsers,
        projectCreator: filteredProjectCreator
      };
    }));

    res.status(200).json(data)
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id ,status);
    
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
    await taskModel.update({ status: status }, { where: { id: id } });
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
    await taskModel.update({ priority: priority }, { where: { id: id } });
    res.status(200).send("priority successfully updated.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}




exports.addMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const {taskId} = req.body;
    if (req.files && req.files.length > 0) {
      const mediaFiles = req.files.map(file => ({
        filename: file.filename,
        file: `http://localhost:5000/${file.path}`,
        mimetype: file.mimetype,
        projectId: id ,
        taskId: taskId // Assuming you have a projectId field to relate to the project
      }));

      console.log("Files received: ", mediaFiles);

      // Save files information to the database
      await db.taskFilesModel.bulkCreate(mediaFiles);
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
    const { authorization: taskId } = req.headers;
    
    console.log("Headers: ", taskId , id);

    const media = await db.taskFilesModel.findAll({ 
      where: { 
        projectId: id, 
        taskId: taskId 
      } 
    });
    
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







exports.tasks = async (req, res) => {
  try {
  
    const tasks = await taskModel.findAll();
    const users = await taskUsersModel.findAll();
    const status = await statusModel.findAll();
    // const projectUsers = await db.projectUsersModel.findAll();

       const data = await Promise.all(tasks.map(async (task) => {
      const filteredUsersIds = users.filter(user => user.taskId === task.id);
      const filteredStasus = status.filter(user => user.id === task.status);
      const filteredPriorities = status.filter(user => user.id === task.priority);
      const filteredUsers = await adminModel.findAll({ where: { id: filteredUsersIds.map(user => user.userId) } });
      const filteredProjectUsers = await db.projectUsersModel.findAll({ where: { projectId: task.projectId } });


      return {
        task: task,
        users: filteredUsers,
        status: filteredStasus,
        priority: filteredPriorities,
        projectUsers: filteredProjectUsers
      };
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


exports.Mtasks = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch all task IDs associated with the user
    const userTasks = await taskUsersModel.findAll({
      where: { userId: id },
      attributes: ['taskId']
    });

    const taskIds = userTasks.map(userTask => userTask.taskId);

    // Fetch tasks that match the filtered task IDs
    const tasks = await taskModel.findAll({
      where: { id: taskIds }
    });

    const status = await statusModel.findAll();
    const users = await taskUsersModel.findAll();
    const allProjectUsers = await db.projectUsersModel.findAll();
    const projectmodel = await db.projectModel.findAll();

    const data = await Promise.all(tasks.map(async (task) => {
      const filteredUserIds = users.filter(user => user.taskId === task.id).map(user => user.userId);
      const filteredUsers = await adminModel.findAll({ where: { id: filteredUserIds } });
      const filteredStatus = status.filter(s => s.id === task.status);
      const filteredPriority = status.filter(s => s.id === task.priority);
      const filteredProjectUsers = allProjectUsers.filter(projectUser => projectUser.projectId === task.projectId);
      const filteredProjectCreator = projectmodel.find(project => project.id === task.projectId);
      return {
        task,
        users: filteredUsers,
        status: filteredStatus,
        priority: filteredPriority,
        projectUsers: filteredProjectUsers,
        projectCreator: filteredProjectCreator
      };
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


exports.getFilterCountProject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id: ", id);

    const tasks = await taskModel.findAll({ where: { projectId: id } });
    const status = await statusModel.findAll({where : {id : tasks.map(task => task.status)}});
    const result = {
      tasks: tasks.length,
      status: status
    }
    res.status(200).json({ count: result });

  }catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}



const { Op } = require("sequelize");

exports.getFilterProject = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    console.log(status, priority, search);

  
    let tasks;
  
    const users = await taskUsersModel.findAll();
    const statusDb = await statusModel.findAll();

    if (status) {
      tasks = await taskModel.findAll({ where: {status: status} });
    } else if (priority) {
      tasks = await taskModel.findAll({ where: {priority: priority} });
    } else if (search) {
      const users = await adminModel.findAll({   where: {
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
      },});
      const userId = await taskUsersModel.findAll({ where: {userId: users.map(user => user.id)} });
      tasks = await taskModel.findAll({ where: {id: userId.map(user => user.taskId)} });
      console.log(users);
    } else {
      tasks = await taskModel.findAll();
    } 


       const data = await Promise.all(tasks.map(async (task) => {
      const filteredUsersIds = users.filter(user => user.taskId === task.id);
      const filteredStasus = statusDb.filter(user => user.id === task.status);
      const filteredPriorities = statusDb.filter(user => user.id === task.priority);
      const filteredUsers = await adminModel.findAll({ where: { id: filteredUsersIds.map(user => user.userId) } });

      return {
        task: task,
        users: filteredUsers,
        status: filteredStasus,
        priority: filteredPriorities
      };
    }));

    let filteredData = data;

   

    res.status(200).json(filteredData);

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getFilterProjectMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority, search } = req.query;

    // Step 1: Fetch task IDs associated with the given user ID
    const taskUsers = await taskUsersModel.findAll({ where: { userId: id } });
    const taskIds = taskUsers.map(entry => entry.taskId);

    if (taskIds.length === 0) {
      // No tasks associated with this user ID
      return res.status(200).json([]);
    }

    // Step 2: Build the filter object for tasks
    let taskFilter = { id: taskIds };

    if (status) {
      taskFilter.status = status;
    }

    if (priority) {
      taskFilter.priority = priority;
    }

    // Step 3: Fetch tasks based on the constructed filter
    let tasks = await taskModel.findAll({ where: taskFilter });

    // Step 4: Apply additional search filter if provided
    if (search) {
      const users = await adminModel.findAll({
        where: {
          [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
        },
      });
      const userIds = users.map(user => user.id);
      const userTaskEntries = await taskUsersModel.findAll({
        where: { userId: userIds },
      });
      const filteredTaskIds = userTaskEntries.map(entry => entry.taskId);
      tasks = tasks.filter(task => filteredTaskIds.includes(task.id));
    }

    // Step 5: Fetch related data for the filtered tasks
    const statusDb = await statusModel.findAll();
    const users = await taskUsersModel.findAll();
    const projectmodel = await db.projectModel.findAll();

    // Step 6: Enrich tasks with related data
    const enrichedTasks = await Promise.all(tasks.map(async (task) => {
      const taskUsers = users.filter(user => user.taskId === task.id);
      const taskUsersData = await adminModel.findAll({ where: { id: taskUsers.map(user => user.userId) } });
      const taskStatus = statusDb.filter(status => status.id === task.status);
      const taskPriority = statusDb.filter(priority => priority.id === task.priority);
      const filteredProjectCreator = projectmodel.find(project => project.id === task.projectId);

      return {
        task: task,
        users: taskUsersData,
        status: taskStatus,
        priority: taskPriority, 
        projectCreator: filteredProjectCreator
      };
    }));

    res.status(200).json(enrichedTasks);

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const cron = require('node-cron');

exports.taskTime = async (req, res) => {
  try{
    const {userId , taskId, hour, min} = req.body;

    const taskTime = await db.Taskworktime.create({
      userId,
      taskId,
      hour,
      min
    })

    

    res.status(200).json(taskTime);

  }catch(error){
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}