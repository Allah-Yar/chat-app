import React, { useState, useEffect } from "react"; // Importing necessary hooks from React
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  Stack,
  Paper,
} from "@mui/material"; // Importing components from MUI (Material UI)
import { io } from "socket.io-client"; // Importing the socket.io-client library for real-time communication

// Connect to the Socket.IO server
const socket = io("http://localhost:3000"); // Establishing the connection to the server

const ChatBox = () => {
  const [messages, setMessages] = useState([]); // State to store messages
  const [input, setInput] = useState(""); // State to manage the current input text
  const [userId, setUserId] = useState(null); // State to store the current user ID
  const [typingUsers, setTypingUsers] = useState({}); // State to track users who are typing

  useEffect(() => {
    // Assign unique user ID when the component is first mounted
    let storedUserId = sessionStorage.getItem("userId"); // Check if the user ID exists in sessionStorage
    if (!storedUserId) {
      storedUserId = Math.random().toString(36).substring(7); // If no ID, generate a random one
      sessionStorage.setItem("userId", storedUserId); // Save it in sessionStorage
    }
    setUserId(storedUserId); // Set the user ID to state

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]); // Add the new message to the message state
    });

    // Listen for typing status updates from other users
    socket.on("userTyping", ({ userId: typingUserId }) => {
      // Only update if the typing user is not the current user
      if (typingUserId !== storedUserId) {
        setTypingUsers((prev) => ({
          ...prev,
          [typingUserId]: true, // Set the typing status for the user
        }));

        // Remove typing status after 1.5 seconds
        setTimeout(() => {
          setTypingUsers((prev) => ({
            ...prev,
            [typingUserId]: false,
          }));
        }, 1500);
      }
    });

    // Cleanup the event listeners when the component unmounts
    return () => {
      socket.off("receiveMessage");
      socket.off("userTyping");
    };
  }, []); // Empty dependency array, ensures this effect runs only once on mount

  const handleInputChange = (e) => {
    setInput(e.target.value); // Update the input state as the user types
    socket.emit("typing", { userId }); // Emit a "typing" event with the current user ID
  };

  const sendMessage = () => {
    if (input.trim()) { // If the input is not just spaces
      const message = { userId, text: input }; // Create a message object
      socket.emit("sendMessage", message); // Emit the message to the server
      setInput(""); // Clear the input field after sending the message
    }
  };

  return (
    <Stack spacing={2}>
      {/* Chat display */}
      <Paper
        elevation={3}
        sx={{
          height: "400px",
          padding: 2,
          overflowY: "auto",
          borderRadius: 2,
        }}
      >
        {/* Loop through the messages and display them */}
        {messages.map((msg, index) => (
          <Box key={index} mb={2}>
            {/* Message bubble */}
            <Stack
              direction="row"
              spacing={1}
              justifyContent={msg.userId === userId ? "flex-start" : "flex-end"} // Align message to the left if it's from current user, otherwise right
              alignItems="center"
            >
              {msg.userId === userId && <Avatar>Me</Avatar>} {/* Show "Me" avatar for the current user */}
              <Box
                sx={{
                  backgroundColor:
                    msg.userId === userId ? "primary.light" : "success.light", // Different background color for the user and others
                  padding: 1.5,
                  borderRadius: 2,
                  maxWidth: "70%",
                }}
              >
                <Typography>{msg.text}</Typography> {/* Display the message text */}
              </Box>
              {msg.userId !== userId && <Avatar>O</Avatar>} {/* Show "O" avatar for other users */}
            </Stack>
          </Box>
        ))}

        {/* Typing indicator - Show with Me's avatar or O's avatar */}
        {Object.keys(typingUsers).map(
          (typingUserId) =>
            typingUsers[typingUserId] && typingUserId !== userId && (
              <Stack
                key={typingUserId}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  display: "flex",
                  marginTop: "8px",
                  justifyContent:
                    typingUserId === userId ? "flex-start" : "flex-end", // Adjust to show with the respective avatar
                }}
              >
                {/* Typing indicator next to the correct avatar */}
                {typingUserId === userId ? (
                  <Avatar sx={{ width: 24, height: 24 }}>Me</Avatar> // Show "Me" avatar if the current user is typing
                ) : (
                  <Avatar sx={{ width: 24, height: 24 }}>O</Avatar> // Show "O" avatar if another user is typing
                )}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {/* Typing dots animation */}
                  <Box
                    sx={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: "gray",
                      borderRadius: "50%",
                      animation: "bounce 1s infinite",
                      animationDelay: "0s",
                    }}
                  />
                  <Box
                    sx={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: "gray",
                      borderRadius: "50%",
                      animation: "bounce 1s infinite",
                      animationDelay: "0.2s",
                    }}
                  />
                  <Box
                    sx={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: "gray",
                      borderRadius: "50%",
                      animation: "bounce 1s infinite",
                      animationDelay: "0.4s",
                    }}
                  />
                </Box>
              </Stack>
            )
        )}
      </Paper>

      {/* Input + Send */}
      <Stack direction="row" spacing={1}>
        <TextField
          value={input}
          onChange={handleInputChange} // Call handleInputChange when the input changes
          placeholder="Type a message" // Placeholder for the input field
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage} // Send message when the button is clicked
          sx={{ minWidth: "100px" }}
        >
          Send
        </Button>
      </Stack>
    </Stack>
  );
};

export default ChatBox; // Export the component
