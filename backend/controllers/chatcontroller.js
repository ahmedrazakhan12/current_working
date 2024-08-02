const db = require("../models/index");
const chatModel = db.chatModel;
const adminModel = db.adminModel;

const {
  validateName,
  validateEmail,
  validateContact,
  validatePassword,
  validateCountry,
  validatePostalCode,
  validateCity,
  validateAddress,
  validateDescription,
  validateStatus,
} = require("../middlewares/Validate");

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
