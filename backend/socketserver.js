const express = require("express");
const http = require("http");
const cors = require("cors");
const { PeerServer } = require('peer');
const bodyParser = require('body-parser');
const socketIO = require("socket.io");
const { chatModel } = require("./models");
const fs = require('fs');
const path = require('path');

const multer = require("./middlewares/Mediaproject");

const saveFile = require("./middlewares/Chatmedia");
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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
// app.use('/uploads', express.static('uploads'));
// 
// Serve static files from the 'uploads' directory
app.use('/backend', express.static('backend'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Socket.IO setup with CORS options
const io = socketIO(server, {
    cors: corsOptions,
});

const runMulter = (formData, callback) => {
    const req = {
      body: formData.body,
      file: formData.file,
      files: formData.files,
      headers: {
        'content-type': formData.contentType,
        'content-length': formData.contentLength,
        'transfer-encoding': formData.transferEncoding,
      },
    };
  
    const res = {
      send: (message) => {
        console.log(message);
      },
    };
  
    multer(req, res, (err) => {
      if (err) {
        console.error('File upload error:', err);
        return callback({ status: 'error', msg: 'File upload failed' });
      }
      console.log('Files received:', req.files);
      callback({ status: 'ok', msg: 'File(s) received' });
    });
  };

const saveMessageToDatabase = async (msg) => {
  try {
      const data = await chatModel.create({
          fromId: msg.fromId,
          toId: msg.toId,
          text: msg.text || null,
          file: msg.file,
          time: new Date()
      });
      console.log('Message saved to database:', data);
      return data;
  } catch (error) {
      console.error('Error saving message to database:', error);
      throw error;
  }
};



  
const users = new Map(); // Using a Map to store user data with socket IDs as keys
let messageId
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    const broadcastAllUsers = () => {
        io.emit('allusers', Array.from(users.values()));
    };

    // const emitActiveUserParams = (id, paramsId) => {
    //     const paramsActiveUser = Array.from(users.values()).filter(id === paramsId);
    //     if (paramsActiveUser.length > 0) {
    //         socket.emit('activeUserParams', { status: 1, user: paramsActiveUser[0] });
    //         console.log("Active user updated:", paramsActiveUser[0]);
    //     } else {
    //         socket.emit('activeUserParams', { status: 0 });
    //         console.log("No active user found for user.paramsId:");
    //     }
    // };

    // Handle when the active user ID is received
    socket.on('receiveActiveId', (id) => {
        try {
            // console.log('Id of logged-in user:', id);

            // Remove existing entry for the user, if any
            for (const [key, user] of users.entries()) {
                if (user.id === id) {
                    users.delete(key);
                    break; // Exit loop early since we've found the user
                }
            }

            // Add the new entry for the user
            users.set(socket.id, { id, socketId: socket.id });

            broadcastAllUsers();

            // console.log('Current users:', Array.from(users.values()));
            
        } catch (error) {
            console.error('Error handling receiveActiveId:', error);
        }
    });
    

    // Handle when paramsId is received
    socket.on('paramsId', (paramsId) => {
        try {
            // console.log('Received paramsId:', paramsId);
            // Store paramsId with the user's socket ID
            if (users.has(socket.id)) {
                users.get(socket.id).paramsId = paramsId;
                
                // emitActiveUserParams(id, null);
            }
        } catch (error) {
            console.error('Error handling paramsId:', error);
        }
    });

    // Handle sending messages
    socket.on('sendMsg', async (msg, callback) => {
        // console.log('Message received:', msg);

        try {
            // Retrieve paramsId for the sender
            console.log(msg);
            
            const sender = users.get(socket.id);
            if (!sender) {
                // console.log('Sender not found in users map.');
                if (callback) {
                    return callback({ status: 'error', msg: 'Sender not found' });
                }
            }

             // Save the message to the database
            const data = await saveMessageToDatabase(msg);
            messageId = data.id;
            const paramsId = sender ? sender.paramsId : null;

            // Find the recipient's socket
            const recipient = Array.from(users.values()).find(user => user.id === msg.toId && user.paramsId !== paramsId);

            console.log("MEssafe Id" , messageId);
            
            if (recipient) {
                io.to(recipient.socketId).emit('receiveMsg', msg ,messageId);
                // console.log('Message sent to recipient:', recipient.socketId);
            } else {
                console.log('Recipient not found');
            }

            // Send the message to the sender as well
            if (sender) {
                io.to(sender.socketId).emit('receiveMsg', msg ,messageId);
                // console.log('Message sent to sender:', sender.socketId);
            } else {
                console.log('Sender not found when trying to send the message back.');
            }

           
            // console.log('Message saved to database:', data);

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

    socket.on('typing', (typing, callback) => {
        const sender = users.get(socket.id);
        if (!sender) {
            // console.log('Typing sender not found in users map.');
            if (callback) {
                return callback({ status: 'error', typing: 'Sender not found' });
            }
        }

        const paramsId = sender ? sender.paramsId : null;

        // Find the recipient's socket
        const recipient = Array.from(users.values()).find(user => user.id === typing.toId && user.paramsId !== paramsId);

        if (recipient) {
            io.to(recipient.socketId).emit('receiveTyping', typing);
            console.log('Typing sent to recipient:', recipient.socketId);
        } else {
            console.log('Typing recipient not found');
        }

        // Send an acknowledgment back to the client
        if (typeof callback === 'function') {
            callback({ status: 'ok', msg: 'Typing event received' });
        }
    });

    socket.on('seenMessages', (data, callback) => {
        console.log("Seen messages: ", data);
        const sender = users.get(socket.id);
        if (!sender) {
            // console.log('Typing sender not found in users map.');
            if (callback) {
                return callback({ status: 'error', typing: 'Sender not found' });
            }
        }

        // const messageId = data.messageId;
        
        const paramsId = sender ? sender.paramsId : null;

        // Find the recipient's socket
        const recipient = Array.from(users.values()).find(user => user.id === data.toId && user.paramsId !== paramsId);

        if (recipient) {
            io.to(recipient.socketId).emit('recieveSeenMessage', data , messageId);
            console.log('Messege sent to recipient:', recipient.socketId);
        } else {
            console.log('Message recipient not found');
        }

        // Send an acknowledgment back to the client
        if (typeof callback === 'function') {
            callback({ status: 'ok', msg: 'Message event received' });
        }  
    })

    socket.on('newNotification', (notification) => {
        console.log('New notification received:', notification);
    
        const { usersID } = notification;
        usersID.map(userId => {
            // Find the user's entry in the users Map by userId
            const recipient = Array.from(users.values()).find(user => user.id == userId || user.id == userId[0] );
            if (recipient) {
                io.to(recipient.socketId).emit('notification', notification);
                console.log('Notification sent to recipient:', recipient.socketId);
            } else {
                console.log('Recipient not found for userId:', userId);
            }
        });
    });
    
    
    // Handle user disconnection
    socket.on('disconnect', () => {
        try {
            console.log('User disconnected:', socket.id);
            
            if (users.has(socket.id)) {
                users.delete(socket.id);
                console.log(`User with socket ID ${socket.id} disconnected.`);
                console.log('Current users:', Array.from(users.values()));
                
                // Emit the updated list of active users
                socket.emit('activeUsers', Array.from(users.values()));
                broadcastAllUsers();
            }

        } catch (error) {
            console.error('Error handling user disconnect:', error);
        }
    });
});


// const users = new Map(); // Using a Map to store user data with socket IDs as keys
//     socket.on('sendFile', (fileData, callback) => {
//     // const { file } = fileData;
//     console.log('Received file name:', fileData);


//     const sender = users.get(socket.id);
//     if (!sender) {
//         // console.log('Sender not found in users map.');
//         if (callback) {
//             return callback({ status: 'error', msg: 'Sender not found' });
//         }
//     }

//     const paramsId = sender ? sender.paramsId : null;

//     // Find the recipient's socket
//     const recipient = Array.from(users.values()).find(user => user.id === fileData.toId && user.paramsId !== paramsId);

//     if (recipient) {
//         io.to(recipient.socketId).emit('fileSaved', fileData);
//         // console.log('Message sent to recipient:', recipient.socketId);
//     } else {
//         console.log('Recipient not found');
//     }

//     // Send the message to the sender as well
//     if (sender) {
//         io.to(sender.socketId).emit('fileSaved', fileData);
//         // console.log('Message sent to sender:', sender.socketId);
//     } else {
//         console.log('Sender not found when trying to send the message back.');
//     }

//     // Acknowledge receipt of the message
//     if (callback) {
//         callback({ status: 'ok', msg: 'File sent' });
//     }
 

//   });            


// socket.broadcast.emit('allusers', Array.from(users.values()));

// io.on('connection', (socket) => {
// console.log('A user connected:', socket.id);


    
// // Handle when the active user ID is received
// socket.on('receiveActiveId', (id) => {
// try {
// console.log('Id of logged-in user:', id);

// // Remove existing entry for the user, if any
// for (const [key, user] of users.entries()) {
// if (user.id === id) {
// users.delete(key);
// break; // Exit loop early since we've found the user
// }


// // Handle when paramsId is received
// socket.on('paramsId', (paramsId) => {
//     try {
//     console.log('Received paramsId:', paramsId);
//     // Store paramsId with the user's socket ID
//     if (users.has(socket.id)) {
//     users.get(socket.id).paramsId = paramsId;
//     }

// socket.emit('activeUsers' , Array.from(users.values()));
// console.log("Data: ",id , paramsId);
// const paramsActiveUser = Array.from(users.values()).filter(user => user?.id === paramsId);
// // console.log('Params active user:', paramsActiveUser);

// if (paramsActiveUser.length > 0) {
//     socket.emit('activeUserParams', { status: 1, user: paramsActiveUser[0] });
//     console.log("Active updated;");
// } else {
//     socket.emit('activeUserParams', { status: 0 });
// }

    
// } catch (error) {
//     console.error('Error handling paramsId:', error);
//     }


// });

// console.log('Current users:', Array.from(users.values()));

// }

// // Add the new entry for the user
// users.set(socket.id, { id, socketId: socket.id });

// console.log('Current users:', Array.from(users.values()));
// } catch (error) {
// console.error('Error handling receiveActiveId:', error);
// }
// });



// // Handle when paramsId is received
// socket.on('paramsId', (paramsId) => {
//     try {
//     console.log('Received paramsId:', paramsId);
//     // Store paramsId with the user's socket ID
//     if (users.has(socket.id)) {
//     users.get(socket.id).paramsId = paramsId;
//     }
//     } catch (error) {
//     console.error('Error handling paramsId:', error);
//     }
// });

// // Handle sending messages
// socket.on('sendMsg', async (msg, callback) => {
//     console.log('Message received:', msg);

//     try {
//         // Retrieve paramsId for the sender
//         const sender = users.get(socket.id);
//         if (!sender) {
//             console.log('Sender not found in users map.');
//             if (callback) {
//                 return callback({ status: 'error', msg: 'Sender not found' });
//             }
//         }

//         const paramsId = sender ? sender.paramsId : null;

//         // Find the recipient's socket
//         const recipient = Array.from(users.values()).find(user => user.id === msg.toId && user.paramsId !== paramsId);

//         if (recipient) {
//             io.to(recipient.socketId).emit('receiveMsg', msg);
//             console.log('Message sent to recipient:', recipient.socketId);
//         } else {
//             console.log('Recipient not found');
//         }

//         // Send the message to the sender as well
//         if (sender) {
//             io.to(sender.socketId).emit('receiveMsg', msg);
//             console.log('Message sent to sender:', sender.socketId);
//         } else {
//             console.log('Sender not found when trying to send the message back.');
//         }

//         // Save the message to the database
//         const data = await saveMessageToDatabase(msg);
//         console.log('Message saved to database:', data);

//         // Acknowledge receipt of the message
//         if (callback) {
//             callback({ status: 'ok', msg: 'Message sent' });
//         }
//     } catch (error) {
//         console.error('Error handling sendMsg:', error);
//         if (callback) {
//             callback({ status: 'error', msg: 'Failed to send message' });
//         }
//     }
// });



// socket.on('typing', (typing, callback) => {
// // console.log('Received typing event:', messageData);
// // Process the typing event (e.g., broadcast to other users)

// const sender = users.get(socket.id);
// if (!sender) {
// console.log('Typing Sender not found in users map.');
// if (callback) {
// return callback({ status: 'error', typing: 'Sender not found' });
// }
// }

// const paramsId = sender ? sender.paramsId : null;

// // Find the recipient's socket
// const recipient = Array.from(users.values()).find(user => user.id === typing.toId && user.paramsId !== paramsId);

// if (recipient) {
// io.to(recipient.socketId).emit('receiveTyping', typing);
// console.log('Typing sent to recipient:', recipient.socketId);
// } else {
// console.log('Typing Recipient not found');
// }
// // socket.broadcast.emit('typing', messageData);

// // Send an acknowledgment back to the client
// if (typeof callback === 'function') {
// callback({ status: 'ok', msg: 'Typing event received' });
// }
// });

// // Handle user disconnection
// socket.on('disconnect', () => {
// try {
// console.log('User disconnected:', socket.id);

// try {
//     if (users.has(socket.id)) {
//         users.delete(socket.id);
//         console.log(`User with socket ID ${socket.id} disconnected.`);
//         console.log('Current users:', Array.from(users.values()));

//         // Emit the updated list of active users
//         socket.emit('activeUsers', Array.from(users.values()));
//     }
// } catch (error) {
//     console.error('Error handling user disconnect:', error);
// }

// // // Remove the user from the users map
// // users.delete(socket.id);
// // console.log('Current users after disconnection:', Array.from(users.values()));
// } catch (error) {
// console.error('Error handling disconnect:', error);
// }
// });
// });


app.get("/", (req, res) => {
res.json({ message: "Hello" });
});

module.exports = { server };