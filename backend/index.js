require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const http = require('http'); // Import http
const socketIo = require('socket.io'); // Import socket.io

// Routes Import
const adminRoute = require("./routes/Adminroute");
const ProjectRoute = require("./routes/Projectroute");
const TaskRoute = require("./routes/Tasksroute");
const ProjectStatusRoute = require("./routes/Projectstatusroute");
const db = require("./models"); // Adjust the path as necessary

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // React app URL
    methods: ["GET", "POST"]
  }
});

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

// Pass io instance to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/admin", adminRoute);
app.use("/project", ProjectRoute);
app.use("/tasks", TaskRoute);
app.use("/projectStatus", ProjectStatusRoute);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("Server running on port: " + port);
});




// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const app = express();
// // Routes Import
// const adminRoute = require("./routes/Adminroute");
// const ProjectRoute = require("./routes/Projectroute");
// const TaskRoute = require("./routes/Tasksroute");
// const db = require("./models"); // Adjust the path as necessary
// const bodyParser = require('body-parser');

// // Middlewares
// app.use(cors());
// app.use(express.json()); // Add this line to parse JSON bodies
// app.use("/public", express.static("public")); // Serve static files

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// // Sync the models with the database
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("All tables created successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to create tables:", err);
//   });

//   // Routes
// app.use("/admin", adminRoute);
// app.use("/project", ProjectRoute);
// app.use("/tasks", TaskRoute);






// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('disconnect', () => {
//       console.log('Client disconnected');
//   });
// });





















// const port = process.env.PORT;
// app.listen(port, () => {
//   console.log("Server running on port: " + port);
// });
