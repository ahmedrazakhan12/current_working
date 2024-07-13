const { DataTypes } = require("sequelize");

const validateTitle = (status) => {
  if (!status) {
    return "Title is required.";
  }
};

const validateDescription = (description) => {
  const minLength = 100;
  const maxLength = 1650;

  if (!description || description.trim() === "") {
    return "Description cannot be empty.";
  }
  console.log("Description:", description.length);
  if (description.length < minLength || description.length > maxLength) {
    return `Description must be between ${minLength} and 120 characters.`;
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
