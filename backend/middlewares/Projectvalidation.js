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

const validateTags = (tags) => {
  const maxTagLength = 20;

  console.log(tags);
  // if (!Array.isArray(tags)) {
  //   return "Tags must be provided as an array.";
  // }

  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];

    // Convert to string if not already a string
    if (typeof tag !== 'string') {
      tag = String(tag); // Convert to string
      tags[i] = tag; // Update the tags array
    }
    console.log("tag.length: " , tags.length);
    // Check tag length
    if (tag.length > maxTagLength) {
      return `Each tag must be ${maxTagLength} characters or less.`;
    }
  }

  // Return null or undefined if validation passes
};





module.exports = {
  validateStatus,
  validateTitle,
  validateDescription,
  validatePriority,
  validateBudget,
  validateDate,
  validateUserId,
  validateTags,
};
