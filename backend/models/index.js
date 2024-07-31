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
const {projectFilesModel} = require("./projectfilesmodel");
const  {taskFilesModel} = require("./Taskfilemodel");
const {favoriteProjectModel} = require("./Favprojectmodel");
const {chatModel} = require("./Chatmodel");
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
db.projectFilesModel = projectFilesModel;
db.taskFilesModel = taskFilesModel;
db.favoriteProjectModel = favoriteProjectModel;
db.chatModel = chatModel;

// Add other models to db object
// db.userModel = userModel;

module.exports = db;
