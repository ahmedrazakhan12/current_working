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
const validateUserId = (userIds) => {
  if (!Array.isArray(userIds) || userIds.length === 0) {
    return "User ID array is required.";
  }

  for (const userId of userIds) {
    // Convert userId to a number
    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      return `User ID "${userId}" must be a valid number.`;
    }

    // Check if it's an integer
    if (!Number.isInteger(userIdNumber)) {
      return `User ID "${userId}" must be an integer.`;
    }
  }

  // Optional: Return the valid user IDs
};




const validatePriority = (priority) => {
  if (!priority) {
    return "Priority is required.";
  }
 
};

const validateBudget = (budget) => {
  if (budget === undefined || budget === null || budget === "" || !budget) {
    return "Budget is required.";
  }
  if (isNaN(budget) || budget < 0) {
    return "Budget must be a non-negative number.";
  }
};

const validateDate = (date) => {
  if (!date) {
    return "Date is required.";
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return "Invalid date format.";
  }
  return null; // If valid
};


module.exports = {
  validateStatus,
  validateTitle,
  validateDescription,
  validatePriority,
  validateBudget,
  validateDate,
  validateUserId,
};
