const { Sequelize } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as necessary

// Import models
const { adminModel } = require("./Adminmodel");
const {projectModel} = require("./Projectmodel");
const {taskModel} = require("./Taskmodel");
const  {projectStatusModel} = require("./Projectstatusmodel");
const {projectUsersModel} = require("./Projectusersmodel");
const {projectTagsModel} = require("./Projecttagsmodel");
const {taskUsersModel} = require('./taskUsersModel');
const db = {};

// Initialize models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.adminModel = adminModel;
db.projectModel = projectModel;
db.taskModel = taskModel;
db.projectStatusModel = projectStatusModel;
db.projectUsersModel = projectUsersModel;
db.projectTagsModel = projectTagsModel ;
db.taskUsersModel = taskUsersModel;

// Add other models to db object
// db.userModel = userModel;

module.exports = db;
