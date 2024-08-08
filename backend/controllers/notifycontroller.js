const db = require("../models/index");
require("dotenv").config();

const notificationModel = db.notificationModel;

exports.getNotification = async (req, res) => {
try {
    const { id } = req.params;
    const notification = await notificationModel.findAll({
        where: { userId: id },
        order: [['createdAt', 'DESC']] // or order by 'id' if that's your primary key
      });
      
    res.status(200).json({
    status: "success",
    data: notification,
    });
} catch (error) {
    res.status(400).json({
    status: "fail",
    message: error.message,
    });
}
}