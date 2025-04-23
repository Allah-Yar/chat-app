

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Avatar,
//   Typography,
//   Stack,
//   Paper,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import { io } from "socket.io-client";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import EmojiPicker from "emoji-picker-react";
// import LogoutDialog from "../components/LogoutDialog";
// import axios from "axios";

// const socket = io("http://localhost:3000");

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [typingUsers, setTypingUsers] = useState({});
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [room, setRoom] = useState("general");
//   const [chatMode, setChatMode] = useState("room"); // 'room' or 'private'
//   const [recipientId, setRecipientId] = useState(""); // For private chat
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [showLogout, setShowLogout] = useState(false);

//   useEffect(() => {
//     let storedUserId = sessionStorage.getItem("userId");
//     if (!storedUserId) {
//       storedUserId = Math.random().toString(36).substring(2, 10);
//       sessionStorage.setItem("userId", storedUserId);
//     }
//     setUserId(storedUserId);

//     socket.emit("register", storedUserId);

//     socket.emit("joinRoom", room);

//     socket.on("roomMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     socket.on("privateMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     socket.on("userTyping", ({ userId: typingUserId }) => {
//       if (typingUserId !== storedUserId) {
//         setTypingUsers((prev) => ({ ...prev, [typingUserId]: true }));
//         setTimeout(() => {
//           setTypingUsers((prev) => ({ ...prev, [typingUserId]: false }));
//         }, 1500);
//       }
//     });

//     socket.on("onlineUsers", (users) => {
//       setOnlineUsers(users.filter((id) => id !== storedUserId));
//     });

//     return () => {
//       socket.off("roomMessage");
//       socket.off("privateMessage");
//       socket.off("userTyping");
//       socket.off("onlineUsers");
//     };
//   }, [room]);

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     socket.emit("typing", { userId, room, recipientId, chatMode });
//   };

//   // Fetch chat history on mode change (Room/Private)
//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         let response;
//         if (chatMode === "room") {
//           response = await axios.get("http://localhost:3000/api/chat/history", {
//             params: { room },
//           });
//         } else {
//           response = await axios.get("http://localhost:3000/api/chat/history", {
//             params: { userId, recipientId },
//           });
//         }
//         setMessages(response.data);
//       } catch (error) {
//         console.error("Failed to load chat history", error);
//       }
//     };
//     fetchChatHistory();
//   }, [room, recipientId, chatMode]);

//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const message = {
//       userId,
//       text: input,
//       timestamp: new Date().toISOString(),
//       recipientId: chatMode === "private" ? recipientId : null,
//     };

//     if (chatMode === "room") {
//       socket.emit("sendMessage", { message, room });
//     } else {
//       socket.emit("sendPrivateMessage", message);
//     }

//     setMessages((prev) => [...prev, message]);
//     setInput("");
//   };

//   const handleEmojiClick = (emojiObject) => {
//     setInput((prev) => prev + emojiObject.emoji);
//     setShowEmojiPicker(false);
//   };

//   const handleRoomChange = (e) => {
//     const newRoom = e.target.value;
//     socket.emit("leaveRoom", room);
//     setRoom(newRoom);
//     setMessages([]); // Clear previous messages when changing rooms
//     socket.emit("joinRoom", newRoom);
//   };

//   const handleChatModeChange = (event, newValue) => {
//     setChatMode(newValue);
//     setMessages([]); // Clear messages on chat mode change
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("userId");
//     localStorage.removeItem("token");
//     window.location.href = "/login"; // Redirect to login page
//   };

//   return (
//     <Stack spacing={2}>
//       <Button variant="outlined" color="secondary" onClick={() => setShowLogout(true)}>
//         Logout
//       </Button>

//       <LogoutDialog open={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} />

//       <Tabs value={chatMode} onChange={handleChatModeChange} centered>
//         <Tab label="Room Chat" value="room" />
//         <Tab label="Private Chat" value="private" />
//       </Tabs>

//       {chatMode === "room" ? (
//         <FormControl fullWidth>
//           <InputLabel>Chat Room</InputLabel>
//           <Select value={room} onChange={handleRoomChange} label="Chat Room">
//             <MenuItem value="general">General</MenuItem>
//             <MenuItem value="dev">Developers</MenuItem>
//             <MenuItem value="fun">Fun</MenuItem>
//           </Select>
//         </FormControl>
//       ) : (
//         <FormControl fullWidth>
//           <InputLabel>Select User</InputLabel>
//           <Select
//             value={recipientId}
//             onChange={(e) => setRecipientId(e.target.value)}
//             label="Select User"
//           >
//             {onlineUsers.map((id) => (
//               <MenuItem key={id} value={id}>
//                 {id}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}

//       <Paper elevation={3} sx={{ height: "400px", padding: 2, overflowY: "auto", borderRadius: 2 }}>
//         {messages.map((msg, index) => (
//           <Box key={index} mb={2}>
//             <Stack
//               direction="row"
//               spacing={1}
//               justifyContent={msg.userId === userId ? "flex-start" : "flex-end"}
//               alignItems="center"
//             >
//               {msg.userId === userId && <Avatar>Me</Avatar>}
//               <Box
//                 sx={{
//                   backgroundColor: msg.userId === userId ? "primary.light" : "success.light",
//                   padding: 1.5,
//                   borderRadius: 2,
//                   maxWidth: "70%",
//                 }}
//               >
//                 <Typography>{msg.text}</Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   {new Date(msg.timestamp).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </Typography>
//               </Box>
//               {msg.userId !== userId && <Avatar>O</Avatar>}
//             </Stack>
//           </Box>
//         ))}

//         {Object.keys(typingUsers).map(
//           (typingUserId) =>
//             typingUsers[typingUserId] && (
//               <Stack
//                 key={typingUserId}
//                 direction="row"
//                 alignItems="center"
//                 spacing={1}
//                 sx={{
//                   display: "flex",
//                   marginTop: "8px",
//                   justifyContent:
//                     typingUserId === userId ? "flex-start" : "flex-end",
//                 }}
//               >
//                 <Avatar sx={{ width: 24, height: 24 }}>...</Avatar>
//                 <Typography variant="body2">Typing...</Typography>
//               </Stack>
//             )
//         )}
//       </Paper>

//       <Stack direction="row" spacing={1} alignContent="center" position="relative">
//         <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
//           <EmojiEmotionsIcon />
//         </IconButton>
//         {showEmojiPicker && (
//           <div style={{ position: "absolute", zIndex: 1000 }}>
//             <EmojiPicker onEmojiClick={handleEmojiClick} />
//           </div>
//         )}
//         <TextField value={input} onChange={handleInputChange} placeholder="Type a message" fullWidth />
//         <Button variant="contained" color="primary" onClick={sendMessage}>
//           Send
//         </Button>
//       </Stack>
//     </Stack>
//   );
// };

// export default ChatBox;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Avatar,
//   Typography,
//   Stack,
//   Paper,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Tabs,
//   Tab,
//   LinearProgress,
// } from "@mui/material";
// import { io } from "socket.io-client";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import EmojiPicker from "emoji-picker-react";
// import LogoutDialog from "../components/LogoutDialog";
// import axios from "axios";
// import { useDropzone } from "react-dropzone";

// const socket = io("http://localhost:3000");

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [typingUsers, setTypingUsers] = useState({});
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [room, setRoom] = useState("general");
//   const [chatMode, setChatMode] = useState("room"); // 'room' or 'private'
//   const [recipientId, setRecipientId] = useState(""); // For private chat
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [showLogout, setShowLogout] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [uploadingFiles, setUploadingFiles] = useState([]);

//   useEffect(() => {
//     let storedUserId = sessionStorage.getItem("userId");
//     if (!storedUserId) {
//       storedUserId = Math.random().toString(36).substring(2, 10);
//       sessionStorage.setItem("userId", storedUserId);
//     }
//     setUserId(storedUserId);

//     socket.emit("register", storedUserId);

//     socket.emit("joinRoom", room);

//     socket.on("roomMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     socket.on("privateMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     socket.on("userTyping", ({ userId: typingUserId }) => {
//       if (typingUserId !== storedUserId) {
//         setTypingUsers((prev) => ({ ...prev, [typingUserId]: true }));
//         setTimeout(() => {
//           setTypingUsers((prev) => ({ ...prev, [typingUserId]: false }));
//         }, 1500);
//       }
//     });

//     socket.on("onlineUsers", (users) => {
//       setOnlineUsers(users.filter((id) => id !== storedUserId));
//     });

//     return () => {
//       socket.off("roomMessage");
//       socket.off("privateMessage");
//       socket.off("userTyping");
//       socket.off("onlineUsers");
//     };
//   }, [room]);

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     socket.emit("typing", { userId, room, recipientId, chatMode });
//   };

//   const sendMessage = async () => {
//     if (!input.trim() && files.length === 0) return;

//     const message = {
//       userId,
//       text: input,
//       timestamp: new Date().toISOString(),
//       recipientId: chatMode === "private" ? recipientId : null,
//     };

//     // Send files along with the message
//     if (files.length > 0) {
//       const formData = new FormData();
//       files.forEach((file) => formData.append("files", file));

//       try {
//         const response = await axios.post("http://localhost:3000/api/upload", formData, {
//           onUploadProgress: (progressEvent) => {
//             const { loaded, total } = progressEvent;
//             const percent = Math.floor((loaded * 100) / total);
//             setUploadingFiles((prev) => {
//               return prev.map((uploadFile) =>
//                 uploadFile.file.name === formData.get("files")[0].name
//                   ? { ...uploadFile, progress: percent }
//                   : uploadFile
//               );
//             });
//           },
//         });

//         const uploadedFiles = response.data.files;
//         message.files = uploadedFiles;

//         // Reset uploading progress
//         setUploadingFiles([]);
//       } catch (error) {
//         console.error("File upload error:", error);
//       }
//     }

//     if (chatMode === "room") {
//       socket.emit("sendMessage", { message, room });
//     } else {
//       socket.emit("sendPrivateMessage", message);
//     }

//     setMessages((prev) => [...prev, message]);
//     setInput("");
//     setFiles([]);
//   };

//   const handleEmojiClick = (emojiObject) => {
//     setInput((prev) => prev + emojiObject.emoji);
//     setShowEmojiPicker(false);
//   };

//   const handleRoomChange = (e) => {
//     const newRoom = e.target.value;
//     socket.emit("leaveRoom", room);
//     setRoom(newRoom);
//     setMessages([]); // Clear previous messages when changing rooms
//     socket.emit("joinRoom", newRoom);
//   };

//   const handleChatModeChange = (event, newValue) => {
//     setChatMode(newValue);
//     setMessages([]); // Clear messages on chat mode change
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("userId");
//     localStorage.removeItem("token");
//     window.location.href = "/login"; // Redirect to login page
//   };

//   // Drag and Drop file handling
//   const onDrop = (acceptedFiles) => {
//     setFiles((prev) => [...prev, ...acceptedFiles]);
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     multiple: true,
//     accept: "image/*, .pdf, .docx, .xlsx", // Allowing common file types
//   });

//   return (
//     <Stack spacing={2}>
//       <Button variant="outlined" color="secondary" onClick={() => setShowLogout(true)}>
//         Logout
//       </Button>

//       <LogoutDialog open={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} />

//       <Tabs value={chatMode} onChange={handleChatModeChange} centered>
//         <Tab label="Room Chat" value="room" />
//         <Tab label="Private Chat" value="private" />
//       </Tabs>

//       {chatMode === "room" ? (
//         <FormControl fullWidth>
//           <InputLabel>Chat Room</InputLabel>
//           <Select value={room} onChange={handleRoomChange} label="Chat Room">
//             <MenuItem value="general">General</MenuItem>
//             <MenuItem value="dev">Developers</MenuItem>
//             <MenuItem value="fun">Fun</MenuItem>
//           </Select>
//         </FormControl>
//       ) : (
//         <FormControl fullWidth>
//           <InputLabel>Select User</InputLabel>
//           <Select value={recipientId} onChange={(e) => setRecipientId(e.target.value)} label="Select User">
//             {onlineUsers.map((id) => (
//               <MenuItem key={id} value={id}>
//                 {id}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}

//       <Paper elevation={3} sx={{ height: "400px", padding: 2, overflowY: "auto", borderRadius: 2 }}>
//         {messages.map((msg, index) => (
//           <Box key={index} mb={2}>
//             <Stack direction="row" spacing={1} justifyContent={msg.userId === userId ? "flex-start" : "flex-end"} alignItems="center">
//               {msg.userId === userId && <Avatar>Me</Avatar>}
//               <Box sx={{ backgroundColor: msg.userId === userId ? "primary.light" : "success.light", padding: 1.5, borderRadius: 2, maxWidth: "70%" }}>
//                 <Typography>{msg.text}</Typography>
//                 {msg.files && msg.files.map((file, idx) => (
//                   <Box key={idx} sx={{ mt: 1 }}>
//                     <a href={file.url} target="_blank" rel="noopener noreferrer">
//                       {file.name}
//                     </a>
//                   </Box>
//                 ))}
//                 <Typography variant="caption" color="text.secondary">
//                   {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                 </Typography>
//               </Box>
//               {msg.userId !== userId && <Avatar>O</Avatar>}
//             </Stack>
//           </Box>
//         ))}

//         {Object.keys(typingUsers).map(
//           (typingUserId) =>
//             typingUsers[typingUserId] && (
//               <Stack key={typingUserId} direction="row" alignItems="center" spacing={1} sx={{ display: "flex", marginTop: "8px", justifyContent: typingUserId === userId ? "flex-start" : "flex-end" }}>
//                 <Avatar sx={{ width: 24, height: 24 }}>...</Avatar>
//                 <Typography variant="body2">Typing...</Typography>
//               </Stack>
//             )
//         )}
//       </Paper>

//       <Box {...getRootProps()} sx={{ border: "2px dashed", padding: 2, borderRadius: 2 }}>
//         <input {...getInputProps()} />
//         <Typography variant="body2">Drag and drop files here, or click to select files</Typography>
//       </Box>

//       {files.length > 0 && (
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6">Files:</Typography>
//           <Stack spacing={1}>
//             {files.map((file, idx) => (
//               <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <Typography>{file.name}</Typography>
//                 {uploadingFiles.some((upload) => upload.file.name === file.name) ? (
//                   <LinearProgress variant="determinate" value={uploadingFiles.find((upload) => upload.file.name === file.name)?.progress || 0} />
//                 ) : null}
//               </Box>
//             ))}
//           </Stack>
//         </Box>
//       )}

//       <Stack direction="row" spacing={1} alignContent="center" position="relative">
//         <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
//           <EmojiEmotionsIcon />
//         </IconButton>
//         {showEmojiPicker && (
//           <div style={{ position: "absolute", zIndex: 1000 }}>
//             <EmojiPicker onEmojiClick={handleEmojiClick} />
//           </div>
//         )}
//         <TextField value={input} onChange={handleInputChange} placeholder="Type a message" fullWidth />
//         <Button variant="contained" color="primary" onClick={sendMessage}>
//           Send
//         </Button>
//       </Stack>
//     </Stack>
//   );
// };

// export default ChatBox;
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
  LinearProgress,
  InputAdornment,
} from "@mui/material";
import { io } from "socket.io-client";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from "emoji-picker-react";
import LogoutDialog from "../components/LogoutDialog";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // For the + sign

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
  const [files, setFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);

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
        const response = await axios.post("http://localhost:3000/api/upload", formData, {
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

  // Drag and Drop file handling
  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: "image/*, .pdf, .docx, .xlsx", // Allowing common file types
  });

  return (
    <Stack spacing={2}>
      <Button variant="outlined" color="secondary" onClick={() => setShowLogout(true)}>
        Logout
      </Button>

      <LogoutDialog open={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} />

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
          <Select value={recipientId} onChange={(e) => setRecipientId(e.target.value)} label="Select User">
            {onlineUsers.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Paper elevation={3} sx={{ height: "400px", padding: 2, overflowY: "auto", borderRadius: 2 }}>
        {messages.map((msg, index) => (
          <Box key={index} mb={2}>
            <Stack direction="row" spacing={1} justifyContent={msg.userId === userId ? "flex-start" : "flex-end"} alignItems="center">
              {msg.userId === userId && <Avatar>Me</Avatar>}
              <Box sx={{ backgroundColor: msg.userId === userId ? "primary.light" : "success.light", padding: 1.5, borderRadius: 2, maxWidth: "70%" }}>
                <Typography>{msg.text}</Typography>
                {msg.files && msg.files.map((file, idx) => (
                  <Box key={idx} sx={{ mt: 1 }}>
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                      {file.name}
                    </a>
                  </Box>
                ))}
                <Typography variant="caption" color="text.secondary">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Typography>
              </Box>
              {msg.userId !== userId && <Avatar>O</Avatar>}
            </Stack>
          </Box>
        ))}

        {Object.keys(typingUsers).map(
          (typingUserId) =>
            typingUsers[typingUserId] && (
              <Stack key={typingUserId} direction="row" alignItems="center" spacing={1} sx={{ display: "flex", marginTop: "8px", justifyContent: typingUserId === userId ? "flex-start" : "flex-end" }}>
                <Avatar sx={{ width: 24, height: 24 }}>...</Avatar>
                <Typography variant="body2">Typing...</Typography>
              </Stack>
            )
        )}
      </Paper>

      <Box {...getRootProps()} sx={{ border: "2px dashed", padding: 2, borderRadius: 2 }}>
        <input {...getInputProps()} />
        <Typography variant="body2">Drag and drop files here, or click to select files</Typography>
      </Box>

      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Files:</Typography>
          <Stack spacing={1}>
            {files.map((file, idx) => (
              <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>{file.name}</Typography>
                {uploadingFiles.some((upload) => upload.file.name === file.name) ? (
                  <LinearProgress variant="determinate" value={uploadingFiles.find((upload) => upload.file.name === file.name)?.progress || 0} />
                ) : null}
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      <Stack direction="row" spacing={1} alignContent="center" position="relative">
        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <EmojiEmotionsIcon />
        </IconButton>
        {showEmojiPicker && (
          <div style={{ position: "absolute", zIndex: 1000 }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        
        {/* Input with "+" sign */}
        <TextField
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => document.querySelector('input[type="file"]').click()}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
