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

    let imagePath = null;
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
};


exports.getGroups = async (req, res) => {
  try {
    const { id } = req.params;
    const groups = await db.groupChatModel.findAll({
      where: {
        creator: id
      }
    });
    
    console.log('Groups:', groups);

    const groupIds = groups.map(group => group.id);
    const groupUsers = await db.groupUser.findAll({
      where: {
        groupId: {
          [Op.in]: groupIds
        }
      }
    });

    console.log('GroupUsers:', groupUsers);

    const data = {
      groups,
      groupUsers
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}
