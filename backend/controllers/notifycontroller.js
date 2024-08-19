const db = require("../models/index");
require("dotenv").config();

const notificationModel = db.notificationModel;

exports.getNotification = async (req, res) => {
try {
    const { id } = req.params;
    const notification = await notificationModel.findAll({
        where: { userId: id },
        order: [['createdAt', 'DESC']] ,
        limit: 10 
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

exports.getNotificationAll = async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;

        const notifications = await notificationModel.findAndCountAll({
            where: { userId: id },
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),  // Limit the number of results
            offset: offset,           // Skip past results for pagination
        });

        res.status(200).json({
            status: "success",
            data: notifications.rows,
            totalItems: notifications.count,
            currentPage: parseInt(page),
            totalPages: Math.ceil(notifications.count / limit),
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}
