// socket/socketManager.js
import { Server } from 'socket.io';

const socketManager = (server) => {
  const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // or specify your frontend URL
    methods: ["GET", "POST"],
  },
});

// Store mapping of socket.id => userId
const users = {};

// Store mapping of userId => socket.id (for private messages)
const userIdToSocketId = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user registration
  socket.on("register", (userId) => {
    users[socket.id] = userId;
    userIdToSocketId[userId] = socket.id;

    console.log(`Registered userId: ${userId} on socket: ${socket.id}`);
    io.emit("onlineUsers", Object.values(users));
  });

  // Join a room
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`${users[socket.id]} joined room: ${room}`);
  });

  // Leave a room
  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`${users[socket.id]} left room: ${room}`);
  });

  // Room chat messages
  socket.on("sendMessage", ({ message, room }) => {
    console.log(`[Room: ${room}] ${message.userId}: ${message.text}`);
    socket.to(room).emit("roomMessage", message);
  });

  // Private messages
  socket.on("sendPrivateMessage", (message) => {
    const targetSocketId = userIdToSocketId[message.recipientId];
    if (targetSocketId) {
      io.to(targetSocketId).emit("privateMessage", message);
      console.log(`[Private] ${message.userId} -> ${message.recipientId}: ${message.text}`);
    }
  });

  // Typing indicator
  // socket.on("typing", ({ userId, room, recipientId, chatMode }) => {
  //   if (chatMode === "room") {
  //     socket.to(room).emit("userTyping", { userId });
  //   } else if (recipientId) {
  //     const targetSocketId = userIdToSocketId[recipientId];
  //     if (targetSocketId) {
  //       io.to(targetSocketId).emit("userTyping", { userId });
  //     }
  //   }
  // });

  socket.on("typing", ({ userId, room, recipientId, chatMode }) => {
  if (chatMode === "room") {
    socket.to(room).emit("userTyping", {
      userId,
      room,
      chatMode,
    });
  } else if (recipientId) {
    const targetSocketId = userIdToSocketId[recipientId];
    if (targetSocketId) {
      io.to(targetSocketId).emit("userTyping", {
        userId,
        recipientId,
        chatMode,
      });
    }
  }
});


  // Disconnect
  socket.on("disconnect", () => {
    const userId = users[socket.id];
    console.log(`User disconnected: ${userId}`);

    delete userIdToSocketId[userId];
    delete users[socket.id];

    io.emit("onlineUsers", Object.values(users));
  });
});
};

export default socketManager;

// import { Server } from 'socket.io';

// const socketManager = (server) => {
//   // const io = new Server(server, {
//   //   cors: {
//   //     origin: "http://localhost:5173", // Change this to your frontend URL
//   //     methods: ["GET", "POST"],
//   //   },
//   // });

//   // const users = {};
//   // const userIdToSocketId = {};

//   // io.on("connection", (socket) => {
//   //   console.log(`User connected: ${socket.id}`);

//   //   socket.on("register", (userId) => {
//   //     users[socket.id] = userId;
//   //     userIdToSocketId[userId] = socket.id;
//   //     io.emit("onlineUsers", Object.values(users));
//   //   });

//   //   socket.on("joinRoom", (room) => {
//   //     socket.join(room);
//   //     console.log(`${users[socket.id]} joined room: ${room}`);
//   //   });

//   //   socket.on("leaveRoom", (room) => {
//   //     socket.leave(room);
//   //     console.log(`${users[socket.id]} left room: ${room}`);
//   //   });

//   //   socket.on("sendMessage", ({ message, room }) => {
//   //     socket.to(room).emit("roomMessage", message);
//   //   });

//   //   // socket.on("sendPrivateMessage", (message) => {
//   //   //   const targetSocketId = userIdToSocketId[message.recipientId];
//   //   //   if (targetSocketId) {
//   //   //     io.to(targetSocketId).emit("privateMessage", message);
//   //   //   }
//   //   // });

//   //   // socket.on("typing", ({ userId, room, recipientId, chatMode }) => {
//   //   //   if (chatMode === "room") {
//   //   //     socket.to(room).emit("userTyping", { userId });
//   //   //   } else if (recipientId) {
//   //   //     const targetSocketId = userIdToSocketId[recipientId];
//   //   //     if (targetSocketId) {
//   //   //       io.to(targetSocketId).emit("userTyping", { userId });
//   //   //     }
//   //   //   }
//   //   // });
//   //   socket.on("sendPrivateMessage", (message) => {
//   //     const targetSocketId = userIdToSocketId[message.recipientId];
//   //     if (targetSocketId) {
//   //       io.to(targetSocketId).emit("privateMessage", message);
//   //     }
//   //   });
    
//   //   socket.on("typing", ({ senderId, receiverId, username }) => {
//   //     const targetSocketId = userIdToSocketId[receiverId];
//   //     if (targetSocketId) {
//   //       io.to(targetSocketId).emit("typing", { senderId, receiverId, username });
//   //     }
//   //   });
    

//   //   socket.on("disconnect", () => {
//   //     const userId = users[socket.id];
//   //     delete userIdToSocketId[userId];
//   //     delete users[socket.id];
//   //     io.emit("onlineUsers", Object.values(users));
//   //   });
//   // });
//   const io = require('socket.io')(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"]
//     }
//   });
  
//   const onlineUsers = new Map(); // userId -> socket.id
  
//   io.on('connection', (socket) => {
//     console.log('a user connected', socket.id);
    
//     socket.on('register', (userId) => {
//       console.log('User registered:', userId);
//       onlineUsers.set(userId, socket.id);
      
//       // Broadcast updated online users list
//       const userIds = Array.from(onlineUsers.keys());
//       io.emit('onlineUsers', userIds);
//     });
    
//     socket.on('sendPrivateMessage', (message) => {
//       const recipientSocketId = onlineUsers.get(message.recipientId);
      
//       if (recipientSocketId) {
//         // Send to recipient
//         io.to(recipientSocketId).emit('privateMessage', message);
//       }
      
//       // Also send back to sender for confirmation
//       socket.emit('privateMessage', message);
//     });
    
//     socket.on('typing', (data) => {
//       const recipientSocketId = onlineUsers.get(data.receiverId);
      
//       if (recipientSocketId) {
//         io.to(recipientSocketId).emit('typing', data);
//       }
//     });
    
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
      
//       // Find and remove the disconnected user
//       for (const [userId, socketId] of onlineUsers.entries()) {
//         if (socketId === socket.id) {
//           onlineUsers.delete(userId);
//           break;
//         }
//       }
      
//       // Broadcast updated online users list
//       const userIds = Array.from(onlineUsers.keys());
//       io.emit('onlineUsers', userIds);
//     });
//   });
// };

// export default socketManager;

// import { Server } from 'socket.io';

// const socketManager = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "*", // Allow all origins in development, restrict in production
//       methods: ["GET", "POST"],
//     },
//   });

//   // Keep track of connected users
//   const users = {};            // socketId -> userId
//   const userIdToSocketId = {}; // userId -> socketId
//   const userDetails = {};      // userId -> {username, status, etc}

//   io.on("connection", (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     // User registration
//     // socket.on("register", (userId) => {
//     //   console.log(`User registered: ${userId} with socket: ${socket.id}`);
      
//     //   // Store user mappings
//     //   users[socket.id] = userId;
//     //   userIdToSocketId[userId] = socket.id;
      
//     //   // Update user status
//     //   userDetails[userId] = {
//     //     id: userId,
//     //     username: `User_${userId}`,
//     //     status: "online"
//     //   };
      
//     //   // Send updated online users list to all clients
//     //   io.emit("onlineUsers", Object.values(userDetails));
//     //   console.log("Online users:", Object.values(userDetails));
//     // });
//     socket.on("register", ({ userId, username }) => {
//       console.log(`User registered: ${userId} (${username}) with socket: ${socket.id}`);
    
//       users[socket.id] = userId;
//       userIdToSocketId[userId] = socket.id;
    
//       userDetails[userId] = {
//         id: userId,
//         username: username, // ✅ now real username
//         status: "online"
//       };
    
//       io.emit("onlineUsers", Object.values(userDetails));
//       console.log("Online users:", Object.values(userDetails));
//     });
    

//     // Handle private messages
//     socket.on("sendPrivateMessage", (message) => {
//       console.log(`Private message from ${message.senderId} to ${message.recipientId}:`, message.text);
      
//       // Generate a unique ID for the message if it doesn't have one
//       if (!message.id) {
//         message.id = Date.now().toString();
//       }
      
//       // Find the recipient's socket
//       const targetSocketId = userIdToSocketId[message.recipientId];
      
//       if (targetSocketId) {
//         // Send to recipient
//         io.to(targetSocketId).emit("privateMessage", message);
//         console.log(`Message delivered to ${message.recipientId}`);
//       } else {
//         console.log(`User ${message.recipientId} is not online`);
//         // Optionally notify sender that user is offline
//         socket.emit("messageStatus", { 
//           messageId: message.id, 
//           status: "undelivered", 
//           reason: "User is offline" 
//         });
//       }
//     });
    
//     // Handle typing indicators
//     socket.on("typing", ({ senderId, receiverId, username }) => {
//       console.log(`${username} (${senderId}) is typing to ${receiverId}`);
      
//       const targetSocketId = userIdToSocketId[receiverId];
      
//       if (targetSocketId) {
//         io.to(targetSocketId).emit("typing", { senderId, receiverId, username });
//       }
//     });

//     // Handle disconnections
//     socket.on("disconnect", () => {
//       const userId = users[socket.id];
//       console.log(`User disconnected: ${userId}`);
      
//       if (userId) {
//         // Remove from mappings
//         delete userIdToSocketId[userId];
//         delete users[socket.id];
        
//         // Update user status or remove them
//         if (userDetails[userId]) {
//           userDetails[userId].status = "offline";
//           // Alternatively, you could delete them entirely
//           // delete userDetails[userId];
//         }
        
//         // Broadcast updated user list
//         io.emit("onlineUsers", Object.values(userDetails));
//         console.log("Updated online users:", Object.values(userDetails));
//       }
//     });
//   });

//   return io;
// };

// export default socketManager;


// import { Server } from 'socket.io';

// const socketManager = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "*", // Allow all origins in development
//       methods: ["GET", "POST"],
//     },
//   });

//   // User tracking
//   const users = {};            // socketId -> userId
//   const userIdToSocketId = {}; // userId -> socketId
//   const userDetails = {};      // userId -> {username, status, etc}

//   io.on("connection", (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     // User registration handler
//     socket.on("register", ({ userId, username }) => {
//       console.log(`Registering ${userId} (${username})`);
      
//       // Update user details
//       userDetails[userId] = {
//         id: userId,
//         username: username || `User_${userId}`,
//         status: "online",
//         socketId: socket.id
//       };
      
//       // Update mappings
//       users[socket.id] = userId;
//       userIdToSocketId[userId] = socket.id;
      
//       // Broadcast updated user list
//       io.emit("onlineUsers", Object.values(userDetails));
//       console.log("Current online users:", Object.values(userDetails));
//     });

//     // Private message handler
//     socket.on("sendPrivateMessage", (message) => {
//       console.log(`Message from ${message.senderId} to ${message.recipientId}`);
      
//       // Ensure message has ID
//       if (!message.id) {
//         message.id = Date.now().toString();
//       }
      
//       // Find recipient socket
//       const recipientSocketId = userIdToSocketId[message.recipientId];
      
//       if (recipientSocketId) {
//         io.to(recipientSocketId).emit("privateMessage", message);
//         console.log("Message delivered to", message.recipientId);
//       } else {
//         console.log("Recipient offline");
//         socket.emit("messageStatus", {
//           messageId: message.id,
//           status: "failed",
//           reason: "User offline"
//         });
//       }
//     });

//     // Typing indicator handler
//     socket.on("typing", ({ senderId, receiverId, username }) => {
//       const targetSocketId = userIdToSocketId[receiverId];
//       if (targetSocketId) {
//         io.to(targetSocketId).emit("typing", { 
//           senderId, 
//           username: username || `User_${senderId}` 
//         });
//       }
//     });

//     // Disconnection handler
//     socket.on("disconnect", () => {
//       const userId = users[socket.id];
//       if (userId) {
//         console.log(`User disconnected: ${userId}`);
        
//         // Update status
//         if (userDetails[userId]) {
//           userDetails[userId].status = "offline";
//           delete userDetails[userId].socketId;
//         }
        
//         // Clean up mappings
//         delete userIdToSocketId[userId];
//         delete users[socket.id];
        
//         // Broadcast updated list
//         io.emit("onlineUsers", Object.values(userDetails));
//       }
//     });
//   });

//   return io;
// };

// export default socketManager;

// import { Server } from 'socket.io';
// import { v4 as uuidv4 } from 'uuid'; // Ensure this is installed

// const socketManager = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: '*', // Allow all origins in development
//       methods: ['GET', 'POST'],
//     },
//   });

//   const users = {};            // socketId -> userId
//   const userIdToSocketId = {}; // userId -> socketId
//   const userDetails = {};      // userId -> { id, username, status, socketId }

//   io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     socket.on('register', ({ userId, username }) => {
//       const finalUserId = userId || uuidv4();
//       const finalUsername = username || `User_${finalUserId}`;

//       console.log(`Registering ${finalUserId} (${finalUsername})`);

//       userDetails[finalUserId] = {
//         id: finalUserId, // unique ID for React key prop
//         username: finalUsername,
//         status: 'online',
//         socketId: socket.id,
//       };

//       users[socket.id] = finalUserId;
//       userIdToSocketId[finalUserId] = socket.id;

//       io.emit('onlineUsers', Object.values(userDetails));
//       console.log('Current online users:', Object.values(userDetails));
//     });

//     socket.on('sendPrivateMessage', (message) => {
//       console.log(`Message from ${message.senderId} to ${message.recipientId}`);

//       if (!message.id) {
//         message.id = Date.now().toString();
//       }

//       const recipientSocketId = userIdToSocketId[message.recipientId];

//       if (recipientSocketId) {
//         io.to(recipientSocketId).emit('privateMessage', message);
//         console.log('Message delivered to', message.recipientId);
//       } else {
//         console.log('Recipient offline');
//         socket.emit('messageStatus', {
//           messageId: message.id,
//           status: 'failed',
//           reason: 'User offline',
//         });
//       }
//     });

//     socket.on('typing', ({ senderId, receiverId, username }) => {
//       const targetSocketId = userIdToSocketId[receiverId];
//       if (targetSocketId) {
//         io.to(targetSocketId).emit('typing', {
//           senderId,
//           username: username || `User_${senderId}`,
//         });
//       }
//     });

//     socket.on('disconnect', () => {
//       const userId = users[socket.id];
//       if (userId) {
//         console.log(`User disconnected: ${userId}`);

//         if (userDetails[userId]) {
//           userDetails[userId].status = 'offline';
//           delete userDetails[userId].socketId;
//         }

//         delete userIdToSocketId[userId];
//         delete users[socket.id];

//         io.emit('onlineUsers', Object.values(userDetails));
//       }
//     });
//   });

//   return io;
// };

// export default socketManager;
