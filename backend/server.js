// import express from 'express';
// import http from 'http';
// import cors from 'cors';
// import dbConnect from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import chatRoutes from './routes/chatRoutes.js';
// import socketManager from './socket/socketManager.js';



// const app = express();
// const server = http.createServer(app);
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/chat', chatRoutes);

// dbConnect();
// socketManager(server);




// // const io = new Server(server, {
// //   cors: {
// //     origin: "http://localhost:5173", // or specify your frontend URL
// //     methods: ["GET", "POST"],
// //   },
// // });





// // // Store mapping of socket.id => userId
// // const users = {};

// // // Store mapping of userId => socket.id (for private messages)
// // const userIdToSocketId = {};

// // io.on("connection", (socket) => {
// //   console.log(`User connected: ${socket.id}`);

// //   // Handle user registration
// //   socket.on("register", (userId) => {
// //     users[socket.id] = userId;
// //     userIdToSocketId[userId] = socket.id;

// //     console.log(`Registered userId: ${userId} on socket: ${socket.id}`);
// //     io.emit("onlineUsers", Object.values(users));
// //   });

// //   // Join a room
// //   socket.on("joinRoom", (room) => {
// //     socket.join(room);
// //     console.log(`${users[socket.id]} joined room: ${room}`);
// //   });

// //   // Leave a room
// //   socket.on("leaveRoom", (room) => {
// //     socket.leave(room);
// //     console.log(`${users[socket.id]} left room: ${room}`);
// //   });

// //   // Room chat messages
// //   socket.on("sendMessage", ({ message, room }) => {
// //     console.log(`[Room: ${room}] ${message.userId}: ${message.text}`);
// //     socket.to(room).emit("roomMessage", message);
// //   });

// //   // Private messages
// //   socket.on("sendPrivateMessage", (message) => {
// //     const targetSocketId = userIdToSocketId[message.recipientId];
// //     if (targetSocketId) {
// //       io.to(targetSocketId).emit("privateMessage", message);
// //       console.log(`[Private] ${message.userId} -> ${message.recipientId}: ${message.text}`);
// //     }
// //   });

// //   // Typing indicator
// //   socket.on("typing", ({ userId, room, recipientId, chatMode }) => {
// //     if (chatMode === "room") {
// //       socket.to(room).emit("userTyping", { userId });
// //     } else if (recipientId) {
// //       const targetSocketId = userIdToSocketId[recipientId];
// //       if (targetSocketId) {
// //         io.to(targetSocketId).emit("userTyping", { userId });
// //       }
// //     }
// //   });

// //   // Disconnect
// //   socket.on("disconnect", () => {
// //     const userId = users[socket.id];
// //     console.log(`User disconnected: ${userId}`);

// //     delete userIdToSocketId[userId];
// //     delete users[socket.id];

// //     io.emit("onlineUsers", Object.values(users));
// //   });
// // });

// server.listen(3000, () => {
//   console.log("✅ Socket.IO server running on http://localhost:3000");
// });

import express from 'express';
import http from 'http';
import cors from 'cors';
import dbConnect from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import socketManager from './socket/socketManager.js';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

dbConnect();
socketManager(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
