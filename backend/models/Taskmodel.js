const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const taskModel = sequelize.define(
  "task",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Additional model options can be defined here
  }
);

module.exports = {
  taskModel,
};
