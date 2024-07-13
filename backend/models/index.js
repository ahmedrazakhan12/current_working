const { Sequelize } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as necessary

// Import models
const { adminModel } = require("./Adminmodel");
const {projectModel} = require("./Projectmodel");

const db = {};

// Initialize models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.adminModel = adminModel;
db.projectModel = projectModel;

// Add other models to db object
// db.userModel = userModel;

module.exports = db;
