const { DataTypes } = require("sequelize");

const validateTitle = (status) => {
  if (!status) {
    return "Title is required.";
  }
};

const validateDescription = (description) => {
  const minLength = 100;
  const maxLength = 2500;

  if (!description || description.trim() === "") {
    return "Description cannot be empty.";
  }
  if (description.length < minLength || description.length > maxLength) {
    return `Description must be between ${minLength} and ${maxLength} characters.`;
  }
};

const validateStatus = (status) => {
  if (!status) {
    return "Status is required.";
  }
};

module.exports = {
  validateStatus,
  validateTitle,
  validateDescription,
};
