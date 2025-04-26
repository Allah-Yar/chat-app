// src/components/ChatBox/useChatSocket.js

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const useChatSocket = (userId, room, chatMode, recipientId) => {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.emit('register', userId);
    socket.emit('joinRoom', room);

    socket.on('roomMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('privateMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('userTyping', ({ userId: typingUserId }) => {
      if (typingUserId !== userId) {
        setTypingUsers((prev) => ({ ...prev, [typingUserId]: true }));
        setTimeout(() => {
          setTypingUsers((prev) => ({ ...prev, [typingUserId]: false }));
        }, 1500);
      }
    });

    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users.filter((id) => id !== userId));
    });

    return () => {
      socket.off('roomMessage');
      socket.off('privateMessage');
      socket.off('userTyping');
      socket.off('onlineUsers');
    };
  }, [userId, room, chatMode, recipientId]);

  return { messages, typingUsers, onlineUsers };
};

export default useChatSocket;
