//.......new design
// File: ChatBox.jsx
import React, { useState, useEffect, useRef } from "react";
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
  LinearProgress,
  InputAdornment,
  Chip,
  Drawer,
  Divider,
  Badge,
  ThemeProvider,
  createTheme,
  alpha,
  Tooltip,
  Slide,
  Fade,
  useTheme,

} from "@mui/material";
import { io } from "socket.io-client";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import EmojiPicker from "emoji-picker-react";
import LogoutDialog from "../components/LogoutDialog";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const socket = io("http://localhost:5000");

// Custom purple theme
const purpleTheme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0",
      light: "#d05ce3",
      dark: "#6a0080",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7b1fa2",
      light: "#ae52d4",
      dark: "#4a0072",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f0fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#3c0d53",
      secondary: "#7c4dff",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    "none",
    "0px 2px 8px rgba(156, 39, 176, 0.1)",
    "0px 4px 12px rgba(156, 39, 176, 0.15)",
    "0px 6px 16px rgba(156, 39, 176, 0.2)",
    // ...rest of shadows
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 25,
          },
        },
      },
    },
  },
});

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
  const [files, setFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const messagesEndRef = useRef(null);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

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

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    socket.emit("typing", { userId, room, recipientId, chatMode });
  };

  const sendMessage = async () => {
    if (!input.trim() && files.length === 0) return;

    const message = {
      userId,
      text: input,
      timestamp: new Date().toISOString(),
      recipientId: chatMode === "private" ? recipientId : null,
    };

    // Send files along with the message
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      try {
        setUploadingFiles(files.map(file => ({ file, progress: 0 })));
        
        const response = await axios.post("http://localhost:5000/api/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            setUploadingFiles((prev) => {
              return prev.map((uploadFile) =>
                uploadFile.file.name === formData.get("files")[0].name
                  ? { ...uploadFile, progress: percent }
                  : uploadFile
              );
            });
          },
        });

        const uploadedFiles = response.data.files;
        message.files = uploadedFiles;

        // Reset uploading progress
        setUploadingFiles([]);
      } catch (error) {
        console.error("File upload error:", error);
      }
    }

    if (chatMode === "room") {
      socket.emit("sendMessage", { message, room });
    } else {
      socket.emit("sendPrivateMessage", message);
    }

    setMessages((prev) => [...prev, message]);
    setInput("");
    setFiles([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleRoomChange = (e) => {
    const newRoom = e.target.value;
    socket.emit("leaveRoom", room);
    setRoom(newRoom);
    setMessages([]); // Clear previous messages when changing rooms
    socket.emit("joinRoom", newRoom);
  };

  const handleChatModeChange = (event, newValue) => {
    setChatMode(newValue);
    setMessages([]); // Clear messages on chat mode change
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  // Drag and Drop file handling
  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*, .pdf, .docx, .xlsx", // Allowing common file types
  });

  // Helper function to get message style based on sender
  const getMessageStyle = (msgUserId) => {
    const isOwnMessage = msgUserId === userId;
    
    return {
      alignSelf: isOwnMessage ? "flex-end" : "flex-start",
      backgroundColor: isOwnMessage 
        ? alpha(purpleTheme.palette.primary.main, 0.15)
        : alpha(purpleTheme.palette.secondary.main, 0.1),
      color: isOwnMessage 
        ? purpleTheme.palette.primary.dark
        : purpleTheme.palette.secondary.dark,
      borderRadius: isOwnMessage 
        ? "18px 18px 4px 18px"
        : "18px 18px 18px 4px",
      maxWidth: "75%",
      padding: "12px 16px",
      margin: "4px 0",
      boxShadow: isOwnMessage 
        ? "0 2px 5px rgba(156, 39, 176, 0.2)"
        : "0 2px 5px rgba(123, 31, 162, 0.1)",
    };
  };

  // Get avatar color based on user ID
  const getAvatarColor = (id) => {
    const colors = [
      "#9c27b0", // Main purple
      "#7b1fa2", // Dark purple
      "#ba68c8", // Light purple
      "#6a1b9a", // Deep purple
      "#8e24aa", // Mid purple
    ];
    
    // Simple hash function to pick a color
    const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <ThemeProvider theme={purpleTheme}>
       <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 64px)', // Adjust based on your navbar height
      backgroundColor: theme.palette.background.default,
      
      padding: 2,
    }}>
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
          
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
      <Box sx={{ 
        height: "100vh", 
        display: "flex", 
        flexDirection: "column",
        bgcolor: "background.default",
        backgroundColor: theme.palette.background.default,
        position: "relative",
        overflow: "hidden"
      }}>
       
        {/* App Bar */}
        <Box sx={{ 
          bgcolor: "primary.main",
          color: "white",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          boxShadow: 3,
        }}>
          <Typography variant="h5" fontWeight="bold">
            {chatMode === "room" ? 
              `${room.charAt(0).toUpperCase() + room.slice(1)} Room` : 
              `Chat with ${recipientId}`
            }
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <Tooltip title="Settings">
              <IconButton 
                color="inherit" 
                onClick={() => setShowDrawer(true)}
                sx={{ bgcolor: alpha("#ffffff", 0.2) }}
              >
                {chatMode === "room" ? <GroupIcon /> : <PersonIcon />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Logout">
              <IconButton 
                color="inherit" 
                onClick={() => setShowLogout(true)}
                sx={{ bgcolor: alpha("#ffffff", 0.2) }}
              >
                <LogoutIcon />  
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Main Chat Area */}
        <Box sx={{ 
          flexGrow: 1, 
          p: 2, 
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          
          gap: 1,
        }}>
          {messages.map((msg, index) => (
            <Fade 
              key={index} 
              in={true} 
              timeout={300} 
              style={{ 
                transitionDelay: `${index % 5 * 50}ms`,
                alignSelf: msg.userId === userId ? "flex-end" : "flex-start",
                maxWidth: "80%",
              }}
            >
              <Box>
                <Box 
                  sx={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    alignItems: "flex-end",
                    gap: 1,
                    mb: 0.5, 
                    ...(msg.userId === userId ? { flexDirection: "row-reverse" } : {})
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 36, 
                      height: 36,
                      bgcolor: getAvatarColor(msg.userId),
                      boxShadow: 1,
                    }}
                  >
                    {msg.userId === userId ? "Me" : msg.userId.charAt(0).toUpperCase()}
                  </Avatar>
                  
                  <Box sx={getMessageStyle(msg.userId)}>
                    <Typography variant="body1" sx={{color: '#fff'}}>{msg.text}</Typography>
                    
                    {msg.files && msg.files.length > 0 && (
                      <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
                        {msg.files.map((file, idx) => (
                          <Box 
                            key={idx} 
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              p: 1,
                              borderRadius: 2,
                              bgcolor: alpha("#ffffff", 0.5),
                            }}
                          >
                            <InsertDriveFileIcon color="primary" />
                            <a 
                              href={file.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ 
                                color: purpleTheme.palette.primary.dark,
                                textDecoration: "none",
                                fontWeight: 500,
                              }}
                            >
                              {file.name}
                            </a>
                          </Box>
                        ))}
                      </Box>
                    )}
                    
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: "block", 
                        mt: 0.5,
                        opacity: 0.7,
                        fontSize: "0.7rem",
                        color: '#fff'
                      }}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], { 
                        hour: "2-digit", 
                        minute: "2-digit" 
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          ))}

          {/* Typing indicators */}
          {Object.keys(typingUsers).map(
            (typingUserId) =>
              typingUsers[typingUserId] && (
                <Box 
                  key={typingUserId}
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1,
                    alignSelf: "flex-start",
                    mt: 1,
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32,
                      bgcolor: getAvatarColor(typingUserId),
                    }}
                  >
                    {typingUserId.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 5,
                    bgcolor: alpha(purpleTheme.palette.primary.light, 0.1),
                  }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      typing
                      <span className="typing-animation">...</span>
                    </Typography>
                  </Box>
                </Box>
              )
          )}
          
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </Box>

        {/* File upload preview */}
        {files.length > 0 && (
          <Slide direction="up" in={files.length > 0}>
            <Paper 
              elevation={3} 
              sx={{ 
                m: 2,
                p: 2,
                borderRadius: 3,
                bgcolor: alpha(purpleTheme.palette.primary.light, 0.08),
                border: `1px solid ${alpha(purpleTheme.palette.primary.main, 0.2)}`,
              }}
            >
              <Typography variant="subtitle2" color="primary.main" fontWeight="bold" mb={1}>
                Files to upload ({files.length})
              </Typography>
              
              <Stack spacing={1}>
                {files.map((file, idx) => (
                  <Box 
                    key={idx} 
                    sx={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      p: 1,
                      borderRadius: 2,
                      bgcolor: "background.paper",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
                      <InsertDriveFileIcon color="primary" />
                      <Typography variant="body2" noWrap sx={{ maxWidth: "200px" }}>
                        {file.name}
                      </Typography>
                    </Box>
                    
                    {uploadingFiles.some((upload) => upload.file.name === file.name) ? (
                      <Box sx={{ width: "40%", ml: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={uploadingFiles.find((upload) => upload.file.name === file.name)?.progress || 0}
                          color="secondary"
                          sx={{ borderRadius: 5, height: 6 }}
                        />
                      </Box>
                    ) : (
                      <IconButton 
                        size="small" 
                        onClick={() => removeFile(idx)}
                        sx={{ color: "text.secondary" }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Slide>
        )}

        {/* Message Input Area */}
        <Paper 
          elevation={4}
          sx={{ 
            p: 2, 
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            bgcolor: "background.paper",
            position: "relative",
          }}
        >
          {/* Hidden dropzone area */}
          <Box 
            {...getRootProps()} 
            sx={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              opacity: 0,
              cursor: "pointer"
            }}
          >
            <input {...getInputProps()} />
          </Box>
          
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              sx={{ 
                bgcolor: alpha(purpleTheme.palette.primary.main, 0.1),
                "&:hover": {
                  bgcolor: alpha(purpleTheme.palette.primary.main, 0.2),
                }
              }}
            >
              <EmojiEmotionsIcon color="primary" />
            </IconButton>
            
            <IconButton 
              onClick={() => document.querySelector('input[type="file"]').click()}
              sx={{ 
                bgcolor: alpha(purpleTheme.palette.primary.main, 0.1),
                "&:hover": {
                  bgcolor: alpha(purpleTheme.palette.primary.main, 0.2),
                }
              }}
            >
              <Badge 
                badgeContent={files.length} 
                color="secondary"
                invisible={files.length === 0}
              >
                <AttachFileIcon color="primary" />
              </Badge>
            </IconButton>
            
            <TextField
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${chatMode === 'room' ? room : recipientId}...`}
              fullWidth
              multiline
              maxRows={3}
              variant="outlined"
              InputProps={{
                sx: { 
                  bgcolor: alpha(purpleTheme.palette.primary.main, 0.05),
                  "&:hover": {
                    bgcolor: alpha(purpleTheme.palette.primary.main, 0.08),
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: alpha(purpleTheme.palette.primary.main, 0.2),
                  },
                }
              }}
            />
            
            <Button 
              variant="contained" 
              color="primary"
              endIcon={<SendIcon />}
              onClick={sendMessage}
              sx={{ 
                height: "52px",
                width: "100px",
                boxShadow: 2,
              }}
            >
              Send
            </Button>
          </Stack>
          
          {/* Emoji Picker Popover */}
          {showEmojiPicker && (
            <Box 
              sx={{ 
                position: "absolute", 
                bottom: "80px", 
                left: "20px", 
                zIndex: 1200,
                boxShadow: 4,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </Box>
          )}
        </Paper>
      </Box>

      {/* Settings Drawer */}
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        PaperProps={{
          sx: { 
            width: 320,
            // bgcolor: "background.default",
            backgroundColor: isDarkMode ? '#2d2d2d' : 'background.default',
            color: isDarkMode ? 'inherit' : '#fff',
            p: 2,
          }
        }}
      >
        <Typography variant="h6" color="primary" fontWeight="bold" mb={2} sx={{ color: isDarkMode ? 'inherit' : 'primary' }}>
          Chat Settings
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        <Tabs 
          value={chatMode} 
          onChange={handleChatModeChange} 
          variant="fullWidth"
          sx={{
            mb: 3,
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.main",
              height: 3,
              borderRadius: 5,
            },
            "& .MuiTab-root": {
              borderRadius: 2,
              "&.Mui-selected": {
                color: "primary.main",
                fontWeight: "bold",
              },
            },
          }}
        >
          <Tab 
            label="Room Chat" 
            value="room"
            icon={<GroupIcon />}
            iconPosition="start"
          />
          <Tab 
            label="Private Chat" 
            value="private" 
            icon={<PersonIcon />}
            iconPosition="start"
          />
        </Tabs>

        {chatMode === "room" ? (
          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel id="room-select-label">Chat Room</InputLabel>
            <Select
              labelId="room-select-label"
              value={room}
              onChange={handleRoomChange}
              label="Chat Room"
              sx={{
                borderRadius: 3,
                color: 'primary.main',
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: alpha(purpleTheme.palette.primary.main, 0.3),
                },
              }}
            >
              <MenuItem value="general">General Discussion</MenuItem>
              <MenuItem value="dev">Developers Hub</MenuItem>
              <MenuItem value="fun">Fun & Off-topic</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel id="user-select-label">Select User</InputLabel>
            <Select
              labelId="user-select-label"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              label="Select User"
              sx={{
                borderRadius: 3,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: alpha(purpleTheme.palette.primary.main, 0.3),
                },
              }}
            >
              {onlineUsers.length > 0 ? (
                onlineUsers.map((id) => (
                  <MenuItem key={id} value={id}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar 
                        sx={{ 
                          width: 28, 
                          height: 28,
                          bgcolor: getAvatarColor(id),
                        }}
                      >
                        {id.charAt(0).toUpperCase()}
                      </Avatar>
                      {id}
                    </Box>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No users online</MenuItem>
              )}
            </Select>
          </FormControl>
        )}
        
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Online Users
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          {onlineUsers.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {onlineUsers.map((id) => (
                <Chip
                  key={id}
                  label={id}
                  color="primary"
                  variant="outlined"
                  size="small"
                  avatar={
                    <Avatar sx={{ bgcolor: getAvatarColor(id) }}>
                      {id.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
              No other users online
            </Typography>
          )}
        </Box>
        
        <Box sx={{ mt: "auto" }}>
          <Button 
            variant="outlined" 
            color="primary" 
            fullWidth 
            onClick={() => setShowLogout(true)}
            startIcon={<LogoutIcon />}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Logout Dialog */}
      <LogoutDialog open={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} />

      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        .typing-animation {
          display: inline-block;
          overflow: hidden;
          animation: ellipsis 1.3s infinite;
        }
        
        @keyframes ellipsis {
          0% { width: 0; }
          25% { width: 0.5em; }
          50% { width: 1em; }
          75% { width: 1.5em; }
          100% { width: 0; }
        }
      `}</style>
       </Paper>
       </Box>
    </ThemeProvider>
  );
};

export default ChatBox;
