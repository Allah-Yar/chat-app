import  express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('sendMessage', (message) => {
        console.log('message: ' + message);
        io.emit('receiveMessage', message);
    });

    socket.on('typing', ({ userId }) => {
        console.log('user typing: ' + userId);
        socket.broadcast.emit('userTyping', {userId}); // Notify other users that someone is typing
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

server.listen(3000, () => {
    console.log('listening on port:3000');
});