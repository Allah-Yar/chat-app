// import React, { useState } from "react";
// import { Stack, Button, Tabs, Tab, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import LogoutDialog from "../LogoutDialog";
// import ChatHeader from "./ChatHeader";
// import MessageList from "./MessageList";
// import TypingIndicator from "./TypingIndicator";
// import ChatInput from "./ChatInput";
// import FileUploader from "./FileUploader";
// import FileList from "./FileList";
// import useChatSocket from "./useChatSocket";

// const ChatBox = () => {
//   const [chatMode, setChatMode] = useState("room");
//   const [room, setRoom] = useState("general");
//   const [recipientId, setRecipientId] = useState("");
//   const [showLogout, setShowLogout] = useState(false);

//   const {
//     messages,
//     input,
    
//     sendMessage,
//     handleInputChange,
//     handleEmojiClick,
//     files,
    
//     uploadingFiles,
//     showEmojiPicker,
//     setShowEmojiPicker,
//     onlineUsers,
//     userId,
//     typingUsers,
//     getRootProps,
//     getInputProps
//   } = useChatSocket({ chatMode, room, recipientId });

//   return (
//     <Stack spacing={2}>
//       <Button variant="outlined" color="secondary" onClick={() => setShowLogout(true)}>
//         Logout
//       </Button>
//       <LogoutDialog open={showLogout} onClose={() => setShowLogout(false)} onConfirm={() => {
//         sessionStorage.removeItem("userId");
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       }} />

//       <Tabs value={chatMode} onChange={(e, v) => { setChatMode(v); }} centered>
//         <Tab label="Room Chat" value="room" />
//         <Tab label="Private Chat" value="private" />
//       </Tabs>

//       <ChatHeader
//         chatMode={chatMode}
//         room={room}
//         setRoom={setRoom}
//         recipientId={recipientId}
//         setRecipientId={setRecipientId}
//         onlineUsers={onlineUsers}
//       />

//       <MessageList messages={messages} userId={userId} />
//       <TypingIndicator typingUsers={typingUsers} userId={userId} />

//       <FileUploader getRootProps={getRootProps} getInputProps={getInputProps} />
//       <FileList files={files} uploadingFiles={uploadingFiles} />

//       <ChatInput
//         input={input}
//         handleInputChange={handleInputChange}
//         sendMessage={sendMessage}
//         showEmojiPicker={showEmojiPicker}
//         setShowEmojiPicker={setShowEmojiPicker}
//         handleEmojiClick={handleEmojiClick}
//       />
//     </Stack>
//   );
// };

// export default ChatBox;

import React, { useState } from "react";
import { Stack, Button, Tabs, Tab } from "@mui/material";
import LogoutDialog from "../LogoutDialog";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import FileUploader from "./FileUploader";
// import FileList from "./FileList";
import useChatSocket from "./useChatSocket";

const ChatBox = () => {
  const [chatMode, setChatMode] = useState("room");
  const [room, setRoom] = useState("general");
  const [recipientId, setRecipientId] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const {
    messages,
    input,
    sendMessage,
    handleInputChange,
    handleEmojiClick,
    // files,
    // uploadingFiles,
    showEmojiPicker,
    setShowEmojiPicker,
    onlineUsers,
    userId,
    typingUsers,
    getRootProps,
    getInputProps
  } = useChatSocket({ chatMode, room, recipientId });

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("userId");
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

      <Tabs value={chatMode} onChange={(e, v) => setChatMode(v)} centered>
        <Tab label="Room Chat" value="room" />
        <Tab label="Private Chat" value="private" />
      </Tabs>

      <ChatHeader
        chatMode={chatMode}
        room={room}
        setRoom={setRoom}
        recipientId={recipientId}
        setRecipientId={setRecipientId}
        onlineUsers={onlineUsers}
      />

      <MessageList messages={messages} userId={userId} />
      <TypingIndicator typingUsers={typingUsers} userId={userId} />

      {/* File upload */}
      <FileUploader getRootProps={getRootProps} getInputProps={getInputProps} />
      {/* <FileList files={files} uploadingFiles={uploadingFiles} /> */}

      {/* Chat input and emoji picker */}
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        sendMessage={sendMessage}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        handleEmojiClick={handleEmojiClick}
      />
    </Stack>
  );
};

export default ChatBox;
