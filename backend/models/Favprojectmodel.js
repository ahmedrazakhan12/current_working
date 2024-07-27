const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const favoriteProjectModel = sequelize.define(
  "favorite-projects",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    // Additional model options can be defined here
  }
);

module.exports = {
  favoriteProjectModel,
};
