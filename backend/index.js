require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// Routes Import
const adminRoute = require("./routes/Adminroute");
const db = require("./models"); // Adjust the path as necessary
const bodyParser = require('body-parser');

// Middlewares
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies
app.use("/public", express.static("public")); // Serve static files

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Sync the models with the database
db.sequelize
  .sync()
  .then(() => {
    console.log("All tables created successfully.");
  })
  .catch((err) => {
    console.error("Unable to create tables:", err);
  });

  // Routes
app.use("/admin", adminRoute);



























const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running on port: " + port);
});
