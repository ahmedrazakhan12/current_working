const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const notificationModel = sequelize.define(
  "notifications",
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      time: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      route: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    
  },
  {
    // Additional model options can be defined here
  }
);

module.exports = {
  notificationModel,
};
