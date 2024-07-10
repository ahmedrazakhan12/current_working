const db = require("../models/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const adminModel = db.adminModel;

const {
  validateName,
  validateEmail,
  validateContact,
  validatePassword,
  validateCountry,
  validatePostalCode,
  validateCity,
  validateAddress,
  validateDescription,
  validateStatus,
} = require("../middlewares/Validate");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email:", email, "Password:", password);
    const emailError = validateEmail(email);
    // const passwordError = validatePassword(password);

    if (emailError) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: emailError,
      });
    }

    const user = await adminModel.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid Credentials.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      console.log("Password matched. Successfully logged in!");

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        privateKey,
        { expiresIn: "30d" }
      );

      res.status(200).json({
        status: 200,
        data: { id: user.id, name: user.name, email: user.email },
        token: token,
        message: "User logged in successfully",
      });
    } else {
      console.log("Password does not match!");
      res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid Credentials.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
    });
  }
};
exports.adminData = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        status: 400,
        message: "Error receiving data from decoded token.",
      });
    }

    res.send({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      pfpImage: req.user.pfpImage,
      description: req.user.description,
    });
  } catch (error) {
    console.error("Error receiving data from decoded token:", error);
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
    });
  }
};

// Controller function to handle edit profile

// Controller function to handle edit profile picture
// controllers/adminController.js
// controllers/adminController.js
// const upload = require("../middlewares/Multer");
// const multer = require("multer");
// controllers/adminController.js

exports.adminEditPfpImage = async (req, res) => {
  try {
    const {
      id,
      username,
      email,
      contact,
      description,
      country,
      postalCode,
      status,
      address,
    } = req.body;
    console.log(
      "Received data: ",

      status
    );
    const nameError = validateName(username);
    const emailError = validateEmail(email);
    const contactError = validateContact(contact);
    const countryError = validateCountry(country);
    const postalCodeError = validatePostalCode(postalCode);
    const addressError = validateAddress(address);
    const validateDescriptionError = validateDescription(description);
    const validateStatusError = validateStatus(status);
    if (
      nameError ||
      emailError ||
      contactError ||
      countryError ||
      postalCodeError ||
      addressError ||
      validateDescriptionError ||
      validateStatusError
    ) {
      return res.status(400).json({
        status: 400,
        data: null,
        message:
          nameError ||
          emailError ||
          contactError ||
          validateDescriptionError ||
          countryError ||
          postalCodeError ||
          addressError ||
          validateStatusError,
      });
    }
    const imageIs = req.body.pfpImage;
    let imagePath = null;

    // Check if req.file exists (new profile picture uploaded)
    if (req.file) {
      console.log("File received: ");
      const photoFileName = req.file.filename;
      console.log("PhotoFileName: ", photoFileName);
      imagePath = `http://localhost:5000/public/uploads/pfp/${photoFileName}`;
    }

    // Method to update adminModel by id
    const editProfile = async (
      id,
      name,
      email,
      contact,
      description,
      country,
      postalCode,
      address,
      status,
      pfpImage
    ) => {
      const updateFields = {
        name,
        email,
        contact,
        description,
        country,
        postalCode,
        address,
        status,
      };

      // Only add pfpImage to updateFields if imagePath is not null
      if (pfpImage !== null) {
        updateFields.pfpImage = pfpImage;
      }

      // Handle special case where imageIs === "null1"
      if (imageIs === "null1") {
        updateFields.pfpImage = null;
      }

      return await adminModel.update(updateFields, { where: { id: id } });
    };

    // Call editProfile to update user profile with the received dataid, username, email, description, imagePath , country, postalCode, address, imageIs
    await editProfile(
      id,
      username,
      email,
      contact,
      description,
      country,
      postalCode,
      address,
      status,
      imagePath
    );

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error in editing profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Import adminModel from Sequelize setup (assuming Sequelize is correctly configured)
exports.adminInfo = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const admin = await adminModel.findOne({
      where: { id: authorizationHeader },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin); // Send admin data response
  } catch (error) {
    console.error("Error in fetching admin info:", error);
    res.status(500).json({ message: "Failed to fetch admin info" });
  }
};

const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing

// Register Admin
exports.adminRegister = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      address,
      postalCode,
      password,
      role,
      country,
      confirmPassword
    } = req.body;
    console.log(
      "Data: ",
      name,
      email,
      contact,
      address,
      postalCode,
      password,
      role,
      confirmPassword,
      country
    );

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    // const contactError = validateContact(contact);
    const passwordError = validatePassword(password , confirmPassword);
    // const countryError = validateCountry(country);
    // const postalCodeError = validatePostalCode(postalCode);
    // const addressError = validateAddress(address);
    const validateStatusError = validateStatus(role);
    if (
      nameError ||
      emailError ||
      // contactError ||
      passwordError ||
      // countryError ||
      // postalCodeError ||
      // addressError ||
      validateStatusError
    ) {
      return res.status(400).json({
        status: 400,
        data: null,
        message:
          nameError ||
          emailError ||
          // contactError ||
          // countryError ||
          // postalCodeError ||
          // addressError ||
          passwordError ||
          validateStatusError,
      });
    }
    const imageIs = req.body.pfpImage;
    console.log(imageIs);
    let imagePath = "http://localhost:5000/public/uploads/pfp/avatar.png";

    // Check if req.file exists (new profile picture uploaded)
    if (req.file) {
      console.log("File received: ");
      const photoFileName = req.file.filename;
      console.log("PhotoFileName: ", photoFileName);
      imagePath = `http://localhost:5000/public/uploads/pfp/${photoFileName}`;
    }

   
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt

    // Create admin record
    await adminModel.create({
      name: name,
      email: email,
      contact: contact,
      address: address,
      postalCode: postalCode,
      country: country,
      pfpImage: imagePath,
      password: hashedPassword, // Store hashed password
      role: role,
    });
    console.log("Admin registered successfully");
    // Respond with success message
    res.status(200).json({ message: "Admin registered successfully" });
  } catch (error) {
    // Check if the error is due to duplicate email
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: `Email: ${error.fields.email} is already registered.`,
      });
    }

    console.error("Error in registering admin:", error);
    res.status(500).json({ message: "Failed to register admin" });
  }
};

// Change Password
exports.superAdminChangePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res
        .status(400)
        .json({ message: "Authorization header is missing" });
    }

    const email = authorizationHeader.split(" ")[1];
    if (!email) {
      return res
        .status(400)
        .json({ message: "Authorization header is malformed" });
    }

    const admin = await adminModel.findOne({ where: { email: email } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      admin.password
    );
    if (isPasswordMatch) {
      console.log("Password  not match");
    }
    if (!isPasswordMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await adminModel.update(
      { password: hashedPassword },
      { where: { email: email } }
    );

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in changing password:", error);
    return res.status(500).json({ message: "Failed to change password" });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.findAll({
      order: [["id", "ASC"]], // Order by id in ascending order
    });
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error in finding admins:", error);
    return res.status(500).json({ message: "Failed to find admins" });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await adminModel.findOne({ where: { id: id } });
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error in Finding admins:", error);
    return res.status(500).json({ message: "Failed to find admins" });
  }
};

exports.adminDelete = async (req, res) => {
  try {
    const id = req.params.id;
    // Delete the admin
    await adminModel.destroy({ where: { id: id } });
    console.log("Admin deleted successfully");

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error in deleting admin:", error);
    return res.status(500).json({ message: "Failed to delete admin" });
  }
};

exports.adminChangePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    console.log("ID:", id, "New Password:", newPassword);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await adminModel.update(
      { password: hashedPassword },
      { where: { id: id } }
    );

    console.log("Password changed successfully");
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in changing admin password:", error);
    return res.status(500).json({ message: "Failed to change admin password" });
  }
};
const { Op } = require("sequelize");

exports.adminSearch = async (req, res) => {
  try {
    const { key } = req.params;
    const admins = await adminModel.findAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${key}%` } }],
      },
    });
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error in finding admins:", error);
    return res.status(500).json({ message: "Failed to find admins" });
  }
};

exports.imageDel = async (req, res) => {
  try {
    const { id } = req.params;
    await adminModel.update({ pfpImage: null }, { where: { id: id } });
    console.log("image deleted");
  } catch (err) {
    console.log(err);
  }
};
