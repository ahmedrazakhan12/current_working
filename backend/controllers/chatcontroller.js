const db = require("../models/index");
const chatModel = db.chatModel;
const adminModel = db.adminModel;

const {
  validateName,
} = require("../middlewares/Validate");
const {
  validateTime,
} = require("../middlewares/Projectvalidation");

const { Op } = require('sequelize');

exports.GetChats = async (req, res) => {
  try {
    const { fromId, toId } = req.query;

    if (!fromId || !toId) {
      return res.status(400).send('Both fromId and toId are required');
    }

    // Fetch chats where either fromId or toId matches the provided IDs
    const chats = await chatModel.findAll({
      where: {
        [Op.or]: [
          { fromId: fromId, toId: toId },
          { fromId: toId, toId: fromId }
        ]
      }
    });

    // console.log(chats);
    res.send(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).send('Internal server error');
  }
};




exports.GetChatBarUsers = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch all chat records where the user is involved
    const chats = await chatModel.findAll({
      where: {
        [Op.or]: [
          { fromId: id },
          { toId: id }
        ]
      }
    });

    // Create a Set to store unique user IDs
    const uniqueUserIds = new Set();

    // Add both fromId and toId to the Set, excluding cases where fromId and toId are the same
    chats.forEach(chat => {
      if (chat.fromId !== chat.toId) {
        uniqueUserIds.add(chat.fromId);
        uniqueUserIds.add(chat.toId);
      }
    });

    // Convert the Set to an array of user IDs
    const userIdsArray = Array.from(uniqueUserIds);

    // Fetch user details based on unique user IDs
    const users = await adminModel.findAll({
      where: {
        id: {
          [Op.in]: userIdsArray
        }
      }
    });

    // Send the user details in the response
    res.send(users);
  } catch (error) {
    console.error('Error fetching chat bar users:', error);
    res.status(500).send('Internal server error');
  }
}

exports.groupChat = async (req, res) => {
  try {
    const { creator, groupName, time } = req.body;
    const usersID = JSON.parse(req.body.usersID); // Parse JSON string back to array
    const groupImage = req.file; // This will have information about the uploaded file

    const error =
    validateName(groupName) ||
    validateTime(time);
    
    if (error) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: error,
      });
    }

    let imagePath = "http://localhost:5000/public/uploads/pfp/groupImage.png";
    if (req.file) {
      console.log("File received: ");
      const photoFileName = req.file.filename;
      console.log("PhotoFileName: ", photoFileName);
      imagePath = `http://localhost:5000/public/uploads/pfp/${photoFileName}`;
    }
    const data = await db.groupChatModel.create({
      creator: creator,
      groupName: groupName,
      time: time,
      groupImage: imagePath
    });
    const groupId = data.id;

    await db.groupUser.bulkCreate(
      usersID.map((id) => ({ groupId, userId: id })),
    );

    res.status(200).json({ message: "Group created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};exports.addGroupMember = async (req, res) => {
  try {
    const { groupId } = req.body;
    let usersID = JSON.parse(req.body.userId); // Parse JSON string back to its original form

    // Ensure usersID is an array
    if (!Array.isArray(usersID)) {
      usersID = [usersID]; // Convert single value to an array
    }

    console.log(groupId, usersID);

    // Check for existing group members
    const existingMembers = await db.groupUser.findAll({
      where: {
        groupId: groupId,
        userId: usersID
      }
    });

    // Filter out already existing members
    const existingUserIds = existingMembers.map(member => member.userId);
    const newUserIds = usersID.filter(userId => !existingUserIds.includes(userId));

    // Add only new users
    if (newUserIds.length > 0) {
      const membersToAdd = newUserIds.map(userId => ({ groupId, userId }));

      await db.groupUser.bulkCreate(membersToAdd);
    }

    res.status(200).json({ message: "Group member(s) added successfully!" });
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ error: "Server error" });
  }
}

exports.getGroups = async (req, res) => {
  try {
    const { id } = req.params;
    const groups = await db.groupChatModel.findAll({
      where: {
        creator: id,
      },
      order: [['createdAt', 'DESC']] 
    });
    
    // console.log('Groups:', groups);

    const groupIds = groups.map(group => group.id);
    const groupUsers = await db.groupUser.findAll({
      where: {
        groupId: {
          [Op.in]: groupIds
        }
      }
    });
    
    const groupUsersData = await db.groupUser.findAll({
      where: {
        userId: id,
      },
      order: [['createdAt', 'DESC']] 
    });
    
    const userGroupID = groupUsersData.map(group => group.groupId);

    const getUserGroup = await db.groupChatModel.findAll({
      where: {
        id: userGroupID
        
      }
    });
   


    // console.log('GroupUsers:', groupUsers);

    const data = {
      groups,
      groupUsers,
      getUserGroup
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

exports.getGroupsChat = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("id: " , id);
    
    // Fetch the specific group based on the provided ID
    const group = await db.groupChatModel.findOne({
      where: {
        id: id
      }
    });

    // If no group is found, return a 404 error
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // console.log('Group:', group);

    // Fetch all users in the found group
    const groupUsers = await db.groupUser.findAll({
      where: {
        groupId: group.id
      }
    });
    const creatorId = group.creator;
    const creator = await db.adminModel.findOne({
      where: {
        id: creatorId
      }
    })
    const userIds = groupUsers.map(user => user.userId);
    const users = await db.adminModel.findAll({
      where: {
        id: {
          [Op.in]: userIds
        }
      }
    });

    console.log('GroupUsers:', groupUsers);

    // Prepare the data to be sent back
    const data = {
      group,
      groupUsers:users,
      creator
    }

    // Send the response
    res.send(data);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

exports.getChattingById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("id: ", id);

    // Fetch the specific group based on the provided ID
    const group = await db.groupUserChatting.findAll({
      where: {
        groupId: id
      }
    });
    if (!group || group.length === 0) {
      return res.status(404).json({ error: "Group not found" });
    }

    const fromIds = group.map(chat => chat.fromId);

    const users = await db.adminModel.findAll({ 
      where: {
        id: fromIds
      }
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "Users not found" });
    }

    // Map users to their respective IDs for easy lookup
    const userMap = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    // Attach user details to each message
    const messagesWithUserDetails = group.map(chat => ({
      ...chat.dataValues, // Copy all message properties
      user: userMap[chat.fromId] // Attach the user details based on fromId
    }));

    res.send({ data: messagesWithUserDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}


exports.updateGcName = async (req, res) => {
  const { groupName, id } = req.body;
  console.log("groupName, id: ", groupName, id);
  
  if (!groupName || !id) {
    return res.status(400).json({ error: 'Group name and ID are required' });
  }

  try {
    // Update the group name in your database
     await db.groupChatModel.update(
      { groupName: groupName },
      { where: { id } }
    )

 
    res.status(200).json({ message: 'Group name updated successfully' });
  } catch (error) {
    console.error('Error updating group name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}
exports.updateGcPfp = async (req, res) => {
  const { id } = req.body;
  const file = req.file;

  console.log("id: ", id , "file: ", file);
  

  if (!id) {
    return res.status(400).json({ error: 'Group ID is required' });
  }
  if (!file) {
    return res.status(400).json({ error: 'File is required' });
  }

  try {
    let imagePath = "http://localhost:5000/public/uploads/pfp/groupImage.png";

    if (file) {
      console.log("File received: ");
      const photoFileName = file.filename;
      console.log("PhotoFileName: ", photoFileName);
      imagePath = `http://localhost:5000/public/uploads/pfp/${photoFileName}`;
    }

    await db.groupChatModel.update(
      { groupImage: imagePath },
      { where: { id: id } }
    );

    res.status(200).json({ message: 'Profile picture updated successfully' });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


exports.deleteGroup = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Group ID is required' });
  }

  try {
    await db.groupChatModel.destroy({
      where: {
        id: id
      }
    });

    await db.groupUser.destroy({
      where: {
        groupId: id
      }
    })

    await db.groupUserChatting.destroy({
      where: {
        groupId: id
      }
    })
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}