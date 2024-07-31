const db = require("../models/index");
const chatModel = db.chatModel;

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

    console.log(chats);
    res.send(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).send('Internal server error');
  }
};
