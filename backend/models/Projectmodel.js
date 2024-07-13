const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const projectModel = sequelize.define(
  "project",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectDescription: {
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
  projectModel,
};
