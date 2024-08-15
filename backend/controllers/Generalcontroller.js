const { where } = require("sequelize");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const adminModel = db.adminModel;
exports.favicon = async (req, res) => {
  try {
    let imagePath = "http://localhost:5000/public/uploads/pfp/avatar.jpg";
    let faviconPath = imagePath;

    if (req.files && req.files.favicon && req.files.favicon.length > 0) {
      const faviconFileName = req.files.favicon[0].filename;
      faviconPath = `http://localhost:5000/public/uploads/pfp/${faviconFileName}`;
    }

    // Save paths to database
    await db.generalModel.update(
      { favicon: faviconPath },
      { where: { id: 1 } }
    );

    res.status(200).json({ message: "Favicon updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error updating favicon" });
  }
};

exports.logo = async (req, res) => {
  try {
    let imagePath = "http://localhost:5000/public/uploads/pfp/avatar.jpg";
    let logoPath = imagePath;

    if (req.files && req.files.logo && req.files.logo.length > 0) {
      const logoFileName = req.files.logo[0].filename;
      logoPath = `http://localhost:5000/public/uploads/pfp/${logoFileName}`;
    } else {
      console.log('No logo file found in request');
      return res.status(400).json({ message: "No logo file uploaded" });
    }

    // Save paths to database
    await db.generalModel.update(
      { logo: logoPath },
      { where: { id: 1 } }
    );

    res.status(200).json({ message: "Logo updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error updating logo" });
  }
};


exports.getLogos = async (req, res) => {
  try {
    const logos = await db.generalModel.findAll();
    res.status(200).json(logos);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error retrieving data" });
  }
}