const express = require("express");
const http = require("http");
const cors = require("cors");
const { PeerServer } = require('peer');
const socketIO = require("socket.io");
const { chatModel } = require("./models");
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// CORS options
const corsOptions = {
    origin: '*',  // Specify your origin or use an array of allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
};

// Middleware to handle CORS
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  // Specify your origin or use an array of allowed origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Socket.IO setup with CORS options
const io = socketIO(server, {
    cors: corsOptions,
});

// Custom function to generate client ID for PeerServer
const customGenerationFunction = () =>
    (Math.random().toString(36) + "0000000000000000000").substr(2, 16);

// PeerSe
const peerServer = PeerServer({
    // port: 8000,
    path: "/fnties-backend",
    generateClientId: customGenerationFunction,
});



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



const users = new Map(); // Using a Map to store user data with socket IDs as keys

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle when the active user ID is received
    socket.on('receiveActiveId', (id) => {
        try {
            console.log('Id of logged-in user:', id);

            // Remove existing entry for the user, if any
            for (const [key, user] of users.entries()) {
                if (user.id === id) {
                    users.delete(key);
                    break; // Exit loop early since we've found the user
                }
            }

            // Add the new entry for the user
            users.set(socket.id, { id, socketId: socket.id });

            console.log('Current users:', Array.from(users.values()));
        } catch (error) {
            console.error('Error handling receiveActiveId:', error);
        }
    });

    // Handle when paramsId is received
    socket.on('paramsId', (paramsId) => {
        try {
            console.log('Received paramsId:', paramsId);
            // Store paramsId with the user's socket ID
            if (users.has(socket.id)) {
                users.get(socket.id).paramsId = paramsId;
            }
        } catch (error) {
            console.error('Error handling paramsId:', error);
        }
    });

    // Handle sending messages
 socket.on('sendMsg', async (msg, callback) => {
    console.log('Message received:', msg);

    try {
        // Retrieve paramsId for the sender
        const sender = users.get(socket.id);
        if (!sender) {
            console.log('Sender not found in users map.');
            if (callback) {
                return callback({ status: 'error', msg: 'Sender not found' });
            }
        }

        const paramsId = sender ? sender.paramsId : null;

        // Find the recipient's socket
        const recipient = Array.from(users.values()).find(user => user.id === msg.toId && user.paramsId !== paramsId);

        if (recipient) {
            io.to(recipient.socketId).emit('receiveMsg', msg);
            console.log('Message sent to recipient:', recipient.socketId);
        } else {
            console.log('Recipient not found');
        }

        // Send the message to the sender as well
        if (sender) {
            io.to(sender.socketId).emit('receiveMsg', msg);
            console.log('Message sent to sender:', sender.socketId);
        } else {
            console.log('Sender not found when trying to send the message back.');
        }

        // Save the message to the database
        const data = await saveMessageToDatabase(msg);
        console.log('Message saved to database:', data);

        // Acknowledge receipt of the message
        if (callback) {
            callback({ status: 'ok', msg: 'Message sent' });
        }
    } catch (error) {
        console.error('Error handling sendMsg:', error);
        if (callback) {
            callback({ status: 'error', msg: 'Failed to send message' });
        }
    }
});


    // Handle user disconnection
    socket.on('disconnect', () => {
        try {
            console.log('User disconnected:', socket.id);
            // Remove the user from the users map
            users.delete(socket.id);
            console.log('Current users after disconnection:', Array.from(users.values()));
        } catch (error) {
            console.error('Error handling disconnect:', error);
        }
    });
});


app.get("/", (req, res) => {
    res.json({ message: "Hello" });
});

module.exports = { server };