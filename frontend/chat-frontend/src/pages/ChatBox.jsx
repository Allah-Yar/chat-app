import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  Stack,
  Paper,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Tabs,
  Tab,
} from "@mui/material";
import { io } from "socket.io-client";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from "emoji-picker-react";
import LogoutDialog from "../components/LogoutDialog";
import axios from "axios";

const socket = io("http://localhost:3000");

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(null);
  const [typingUsers, setTypingUsers] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [room, setRoom] = useState("general");
  const [chatMode, setChatMode] = useState("room"); // 'room' or 'private'
  const [recipientId, setRecipientId] = useState(""); // For private chat
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    let storedUserId = sessionStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = Math.random().toString(36).substring(2, 10);
      sessionStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);

    socket.emit("register", storedUserId);

    socket.emit("joinRoom", room);

    socket.on("roomMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("privateMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("userTyping", ({ userId: typingUserId }) => {
      if (typingUserId !== storedUserId) {
        setTypingUsers((prev) => ({ ...prev, [typingUserId]: true }));
        setTimeout(() => {
          setTypingUsers((prev) => ({ ...prev, [typingUserId]: false }));
        }, 1500);
      }
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users.filter((id) => id !== storedUserId));
    });

    return () => {
      socket.off("roomMessage");
      socket.off("privateMessage");
      socket.off("userTyping");
      socket.off("onlineUsers");
    };
  }, [room]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    socket.emit("typing", { userId, room, recipientId, chatMode });
  };

   // 👇 This will fetch the chat history on chat change
   useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        let response;
        if (chatMode === "room") {
          response = await axios.get("http://localhost:3000/api/chat/history", {
            params: { room }
          });
        } else {
          response = await axios.get("http://localhost:3000/api/chat/history", {
            params: { userId, recipientId }
          });
        }

        setMessages(response.data);
      } catch (error) {
        console.error("Failed to load chat history", error);
      }
    };

    fetchChatHistory();
  }, [room, recipientId, chatMode]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const message = {
      userId,
      text: input,
      timestamp: new Date().toISOString(),
      recipientId: chatMode === "private" ? recipientId : null,
    };

    if (chatMode === "room") {
      socket.emit("sendMessage", { message, room });
    } else {
      socket.emit("sendPrivateMessage", message);
    }

    setMessages((prev) => [...prev, message]);
    setInput("");
  };

  // const sendMessage = async () => {
  //   if (!input.trim()) return;
  
  //   const message = {
  //     userId,
  //     text: input,
  //     timestamp: new Date().toISOString(),
  //     recipientId: chatMode === "private" ? recipientId : null,
  //   };
  
  //   if (chatMode === "room") {
  //     socket.emit("sendMessage", { message, room });
  
  //     // Save to DB
  //     await axios("http://localhost:3000/api/chat/send", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         sender: userId,
  //         room,
  //         text: input
  //       })
  //     });
  //   } else {
  //     socket.emit("sendPrivateMessage", message);
  
  //     // Save to DB
  //     await axios("http://localhost:3000/api/chat/send", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         sender: userId,
  //         receiver: recipientId,
  //         text: input
  //       })
  //     });
  //   }
  
  //   setMessages((prev) => [...prev, message]);
  //   setInput("");
  // };

  // const sendMessage = async () => {
  //   if (!input.trim()) return;
  
  //   const message = {
  //     userId,
  //     text: input,
  //     timestamp: new Date().toISOString(),
  //     recipientId: chatMode === "private" ? recipientId : null,
  //   };
  
  //   try {
  //     if (chatMode === "room") {
  //       socket.emit("sendMessage", { message, room });
  
  //       // Save to DB
  //       await axios.post("http://localhost:3000/api/chat/send", {
  //         sender: userId,
  //         room,
  //         text: input
  //       });
  //     } else {
  //       socket.emit("sendPrivateMessage", message);
  
  //       // Save to DB
  //       await axios.post("http://localhost:3000/api/chat/send", {
  //         sender: userId,
  //         receiver: recipientId,
  //         text: input
  //       });
  //     }
  
  //     setMessages((prev) => [...prev, message]);
  //     setInput("");
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };
  
  

  const handleEmojiClick = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleRoomChange = (e) => {
    const newRoom = e.target.value;
    socket.emit("leaveRoom", room);
    setRoom(newRoom);
    setMessages([]);
    socket.emit("joinRoom", newRoom);
  };

  const handleChatModeChange = (event, newValue) => {
    setChatMode(newValue);
    setMessages([]);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Stack spacing={2}>
        <Button variant="outlined" color="secondary" onClick={() => setShowLogout(true)}>
        Logout
      </Button>

      <LogoutDialog
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
      <Tabs value={chatMode} onChange={handleChatModeChange} centered>
        <Tab label="Room Chat" value="room" />
        <Tab label="Private Chat" value="private" />
      </Tabs>

      {chatMode === "room" ? (
        <FormControl fullWidth>
          <InputLabel>Chat Room</InputLabel>
          <Select value={room} onChange={handleRoomChange} label="Chat Room">
            <MenuItem value="general">General</MenuItem>
            <MenuItem value="dev">Developers</MenuItem>
            <MenuItem value="fun">Fun</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <FormControl fullWidth>
          <InputLabel>Select User</InputLabel>
          <Select
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            label="Select User"
          >
            {onlineUsers.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Paper
        elevation={3}
        sx={{ height: "400px", padding: 2, overflowY: "auto", borderRadius: 2 }}
      >
        {messages.map((msg, index) => (
          <Box key={index} mb={2}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent={msg.userId === userId ? "flex-start" : "flex-end"}
              alignItems="center"
            >
              {msg.userId === userId && <Avatar>Me</Avatar>}
              <Box
                sx={{
                  backgroundColor:
                    msg.userId === userId ? "primary.light" : "success.light",
                  padding: 1.5,
                  borderRadius: 2,
                  maxWidth: "70%",
                }}
              >
                <Typography>{msg.text}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
              {msg.userId !== userId && <Avatar>O</Avatar>}
            </Stack>
          </Box>
        ))}

        {Object.keys(typingUsers).map(
          (typingUserId) =>
            typingUsers[typingUserId] && (
              <Stack
                key={typingUserId}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  display: "flex",
                  marginTop: "8px",
                  justifyContent:
                    typingUserId === userId ? "flex-start" : "flex-end",
                }}
              >
                <Avatar sx={{ width: 24, height: 24 }}>...</Avatar>
                <Typography variant="body2">Typing...</Typography>
              </Stack>
            )
        )}
      </Paper>

      <Stack direction="row" spacing={1} alignContent="center" position="relative">
        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <EmojiEmotionsIcon />
        </IconButton>
        {showEmojiPicker && (
          <div style={{ position: "absolute", zIndex: 1000 }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <TextField
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
