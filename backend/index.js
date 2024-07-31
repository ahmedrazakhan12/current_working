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
const ProjectPriorityRoute = require("./routes/Projectpriorityroute");
const chatRoute = require("./routes/Chatroute");
const db = require("./models"); // Adjust the path as necessary
const chatModel = db.chatModel;

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
app.use("/task", TaskRoute);
app.use("/projectStatus", ProjectStatusRoute);
app.use("/projectPriority", ProjectPriorityRoute);
app.use("/chat", chatRoute);



// Function

const saveMessageToDatabase = async (msg) => {
  try {
      const data = await chatModel.create({
          fromId: msg.fromId,
          toId: msg.toId,
          text: msg.text,
          time: new Date()
      });
      return data;
  } catch (error) {
      console.error('Error saving message to database:', error);
      throw error;
  }
};



const users = new Map(); // Use a Map to store user data with socket IDs as keys

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle when the active user ID is received
    socket.on('receiveActiveId', (id) => {
        console.log('Id of login user:', id);

        // Remove existing entry for the user, if any
        users.forEach((user, key) => {
            if (user.id === id) {
                users.delete(key);
            }
        });

        // Add the new entry for the user
        users.set(socket.id, { id, socketId: socket.id });

        console.log('Current users:', Array.from(users.values()));
    });

    // Handle when paramsId is received
    socket.on('paramsId', (paramsId) => {
        console.log('Received paramsId:', paramsId);
        // Store paramsId with the user's socket ID
        if (users.has(socket.id)) {
            users.get(socket.id).paramsId = paramsId;
        }
    });

    // Handle sending messages
    socket.on('sendMsg', async (msg, callback) => {
      console.log('Message received:', msg);

      try {
          // Save the message to the database
          const data = await saveMessageToDatabase(msg);
          console.log('Message saved to database:', data);

          // Retrieve paramsId for the sender
          const sender = users.get(socket.id);
          const paramsId = sender ? sender.paramsId : null;

          console.log('Sender paramsId:', paramsId);

          // Find the recipient's socket
          const recipient = Array.from(users.values()).find(user => user.id === msg.toId && user.paramsId === msg.fromId);

          if (recipient) {
              io.to(recipient.socketId).emit('receiveMsg', msg);
          } else {
              console.log('Recipient not found');
          }

          // Send the message to the sender as well
          if (sender) {
              io.to(sender.socketId).emit('receiveMsg', msg);
          }

          // Acknowledge receipt of the message
          if (callback) {
              callback({ status: 'ok', msg: 'Message sent' });
          }
      } catch (error) {
          console.error('Error handling message:', error);
          if (callback) {
              callback({ status: 'error', msg: 'Failed to send message' });
          }
      }
  });
    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        // Remove the user from the users map
        users.delete(socket.id);
        console.log('Current users after disconnection:', Array.from(users.values()));
    });
});




const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("Server running on port: " + port);
});





 // console.log('Recipient found:', recipient);
        // if (recipient) {
        //     io.to(recipient.socketId).emit('receiveMsg', msg);
        // } else {
        //     console.log('Recipient not found');
        // }

        // // Send the message to the sender as well
        // const sender = users.find(user => user.id === msg.fromId);
        // if (sender) {
        //     io.to(sender.socketId).emit('receiveMsg', msg);
        // }

        // // Acknowledge receipt of the message
        // if (callback) {
        //     callback({ status: 'ok', msg: 'Message received' });
        // }



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
