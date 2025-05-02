// import React, { useState } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Paper, 
//   Avatar, 
//   InputBase, 
//   Badge, 
//   IconButton,
//   Divider 
// } from '@mui/material'; 
// import { 
//   Search, 
//   Send, 
//   Paperclip, 
//   Smile 
// } from 'lucide-react';

// // Users Bar Component with Search Bar
// function UsersBar({ users, activeUser, setActiveUser }) {
//   const sortedUsers = [...users].sort((a, b) => {
//     if (a.status === b.status) return 0;
//     return a.status === "online" ? -1 : 1;
//   });

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
//       {/* Search Bar */}
//       <Box sx={{ paddingX: 2, marginY: 2 }}>
//         <Box sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           backgroundColor: '#8e24aa', 
//           borderRadius: '9999px', 
//           paddingX: 2, 
//           paddingY: 1 
//         }}>
//           <Search size={20} style={{ color: '#e1bee7' }} />
//           <InputBase
//             placeholder="SEARCH"
//             sx={{ 
//               color: '#e1bee7', 
//               fontSize: '0.875rem', 
//               flexGrow: 1, 
//               marginLeft: 2,
//               '& .MuiInputBase-input::placeholder': {
//                 color: '#e1bee7',
//                 opacity: 1
//               }
//             }}
//           />
//         </Box>
//       </Box>

//       {/* Users List */}
//       <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//         {sortedUsers.map((user) => (
//           <Box
//             key={user.id}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               paddingX: 2,
//               paddingY: 1.5,
//               cursor: 'pointer',
//               '&:hover': {
//                 backgroundColor: '#8e24aa',
//                 transition: 'background-color 0.3s ease',
//               },
//               backgroundColor: activeUser === user.name ? '#8e24aa' : 'transparent',
//             }}
//             onClick={() => setActiveUser(user.name)}
//           >
//             <Box sx={{ position: 'relative', marginRight: 2 }}>
//               <Avatar src={user.avatar} alt={user.name} sx={{ width: 48, height: 48 }} />
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   bottom: 0,
//                   right: 0,
//                   width: 16,
//                   height: 16,
//                   borderRadius: '50%',
//                   border: '2px solid #6a1b9a',
//                   backgroundColor: user.status === 'online' ? '#4caf50' : '#f44336',
//                 }}
//               />
//             </Box>
//             <Box sx={{ flexGrow: 1 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                   {user.name}
//                 </Typography>
//                 <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                   {user.time}
//                 </Typography>
//               </Box>
//               <Typography variant="body2" sx={{ color: '#e1bee7', marginTop: 0.5 }}>
//                 {user.message}
//               </Typography>
//             </Box>
//             {user.unread > 0 && (
//               <Box sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 justifyContent: 'center', 
//                 backgroundColor: '#f44336', 
//                 borderRadius: '50%', 
//                 width: 24, 
//                 height: 24 
//               }}>
//                 <Typography variant="caption" sx={{ color: 'white' }}>
//                   {user.unread}
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }

// export default function ChatApplication() {
//   const [users, setUsers] = useState([
//     { id: 1, name: "John Doe", message: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", status: "online", unread: 0 },
//     { id: 2, name: "Jessie Woo", message: "Working with you like dream!", time: "08:50", avatar: "/api/placeholder/80/80", status: "online", unread: 5 },
//     { id: 3, name: "Amelia Nelson", message: "Hi there, How are you?", time: "08:30", avatar: "/api/placeholder/80/80", status: "offline", unread: 5 },
//     { id: 4, name: "Samantha Martin", message: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
//     { id: 5, name: "Chies Lie", message: "Working with you like dream!", time: "08:50", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
//     { id: 6, name: "Nicolas Plum", message: "Hi there, How are you?", time: "08:30", avatar: "/api/placeholder/80/80", status: "online", unread: 0 },
//     { id: 7, name: "Alexa Doe", message: "Cool!! Looks good...", time: "08:30", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
//   ]);

//   const [messages, setMessages] = useState([
//     { id: 1, sender: "John Doe", text: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", isSelf: false },
//     { id: 2, sender: "You", text: "Waiting for your reply. As I have to go back soon. I have to travel long distance.", time: "", avatar: "", isSelf: true },
//     { id: 3, sender: "You", text: "Hi, I am coming there in few minutes. Please wait!! I am in taxi right now.", time: "", avatar: "", isSelf: true },
//     { id: 4, sender: "John Doe", text: "Thank you very much, I am waiting here at StarBuck cafe.", time: "09:15", avatar: "/api/placeholder/80/80", isSelf: false },
//   ]);

//   const [activeUser, setActiveUser] = useState("John Doe");
//   const [newMessage, setNewMessage] = useState("");

//   const handleSendMessage = () => {
//     if (newMessage.trim() !== "") {
//       const newMsg = {
//         id: messages.length + 1,
//         sender: "You",
//         text: newMessage,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         avatar: "",
//         isSelf: true
//       };
//       setMessages([...messages, newMsg]);
//       setNewMessage("");
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex',  flexDirection: 'column', height: '100vh', backgroundColor: '#6a1b9a' }}>
//       <Paper sx={{ margin: 'auto', width: '100%', height: '100vh', display: 'flex', flexDirection: 'row', borderRadius: '16px', boxShadow: 3 }}>
        
//         {/* Left Sidebar */}
//         <Box sx={{ width: '300px', backgroundColor: '#6a1b9a', color: 'white', display: 'flex', flexDirection: 'column' }}>
//           {/* Users Bar with Search Bar */}
//           <UsersBar users={users} activeUser={activeUser} setActiveUser={setActiveUser} />
//         </Box>

//         {/* Chat Area */}
//         <Box sx={{ width: 'calc(100% - 300px)', background: 'linear-gradient(180deg, #6a1b9a 0%, #ab47bc 100%)', display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ padding: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Avatar src={messages[0].avatar} alt={messages[0].sender} sx={{ width: 40, height: 40 }} />
//               <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>{activeUser}</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Typography sx={{ backgroundColor: 'white', color: '#8e24aa', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', padding: '4px 12px', borderRadius: '20px' }}>
//                 CLEAR CHAT
//               </Typography>
//               {/* ........ */}
//               <Typography sx={{ backgroundColor: 'white', color: '#8e24aa', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', padding: '4px 12px', borderRadius: '20px' }}>
//                 MORE
//               </Typography>
//             </Box>
//           </Box>

//           <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 3 }}>
//             {messages.map((message) => (
//               <Box
//                 key={message.id}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: message.isSelf ? 'row-reverse' : 'row',
//                   marginBottom: 3,
//                   alignItems: 'flex-start',
//                 }}
//               >
//                 <Avatar src={message.avatar} alt={message.sender} sx={{ width: 40, height: 40, margin: message.isSelf ? '0 0 0 8px' : '0 8px 0 0' }} />
//                 <Box sx={{ maxWidth: '70%' }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0.5 }}>
//                     <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                       {message.sender}
//                     </Typography>
//                     {message.time && (
//                       <Typography variant="caption" sx={{ color: '#e1bee7', marginLeft: 1 }}>
//                         {message.time}
//                       </Typography>
//                     )}
//                   </Box>
//                   <Paper sx={{ 
//                     padding: '8px 12px', 
//                     backgroundColor: message.isSelf ? '#ffccbc' : '#8e24aa', 
//                     color: 'white', 
//                     borderRadius: '16px',
//                     boxShadow: 'none',
//                   }}>
//                     <Typography variant="body2">{message.text}</Typography>
//                   </Paper>
//                 </Box>
//               </Box>
//             ))}
//           </Box>

//           <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 1, backgroundColor: 'white', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
//             <IconButton sx={{ color: '#8e24aa' }}><Smile size={20} /></IconButton>
//             <IconButton sx={{ color: '#8e24aa' }}><Paperclip size={20} /></IconButton>
//             <InputBase
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//               sx={{ flexGrow: 1, backgroundColor: 'white', borderRadius: '20px', padding: '8px 16px', border: '1px solid #d1d1d1', fontSize: '0.875rem' }}
//             />
//             <IconButton sx={{ backgroundColor: '#26c6da', color: 'white', '&:hover': { backgroundColor: '#26c6da' } }} onClick={handleSendMessage}>
//               <Send size={20} />
//             </IconButton>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Paper, 
//   Avatar, 
//   InputBase, 
//   IconButton
// } from '@mui/material'; 
// import { 
//   Search, 
//   Send, 
//   Paperclip, 
//   Smile 
// } from 'lucide-react';
// import { io } from 'socket.io-client';

// const SOCKET_URL =  "http://localhost:3000";
// const socket = io(SOCKET_URL, { transports: ['websocket'] });


// // Users Bar Component with Search Bar
// function UsersBar({ users, activeUser, setActiveUser }) {
//   const sortedUsers = [...users].sort((a, b) => {
//     if (a.status === b.status) return 0;
//     return a.status === "online" ? -1 : 1;
//   });

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
//       {/* Search Bar */}
//       <Box sx={{ paddingX: 2, marginY: 2 }}>
//         <Box sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           backgroundColor: '#8e24aa', 
//           borderRadius: '9999px', 
//           paddingX: 2, 
//           paddingY: 1 
//         }}>
//           <Search size={20} style={{ color: '#e1bee7' }} />
//           <InputBase
//             placeholder="SEARCH"
//             sx={{ 
//               color: '#e1bee7', 
//               fontSize: '0.875rem', 
//               flexGrow: 1, 
//               marginLeft: 2,
//               '& .MuiInputBase-input::placeholder': {
//                 color: '#e1bee7',
//                 opacity: 1
//               }
//             }}
//           />
//         </Box>
//       </Box>

//       {/* Users List */}
//       <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//         {sortedUsers.map((user) => (
//           <Box
//             key={user.id}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               paddingX: 2,
//               paddingY: 1.5,
//               cursor: 'pointer',
//               '&:hover': {
//                 backgroundColor: '#8e24aa',
//                 transition: 'background-color 0.3s ease',
//               },
//               backgroundColor: activeUser === user.id ? '#8e24aa' : 'transparent',
//             }}
//             onClick={() => setActiveUser(user.id)}
//           >
//             <Box sx={{ position: 'relative', marginRight: 2 }}>
//               <Avatar src={user.avatar} alt={user.name} sx={{ width: 48, height: 48 }} />
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   bottom: 0,
//                   right: 0,
//                   width: 16,
//                   height: 16,
//                   borderRadius: '50%',
//                   border: '2px solid #6a1b9a',
//                   backgroundColor: user.status === 'online' ? '#4caf50' : '#f44336',
//                 }}
//               />
//             </Box>
//             <Box sx={{ flexGrow: 1 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                   {user.name}
//                 </Typography>
//                 <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                   {user.time}
//                 </Typography>
//               </Box>
//               <Typography variant="body2" sx={{ color: '#e1bee7', marginTop: 0.5 }}>
//                 {user.message}
//               </Typography>
//             </Box>
//             {user.unread > 0 && (
//               <Box sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 justifyContent: 'center', 
//                 backgroundColor: '#f44336', 
//                 borderRadius: '50%', 
//                 width: 24, 
//                 height: 24 
//               }}>
//                 <Typography variant="caption" sx={{ color: 'white' }}>
//                   {user.unread}
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }

// export default function ChatApplication() {
//   // New state variables as requested
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [username, setUsername] = useState("Anonymous");
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [typingUsers, setTypingUsers] = useState({});
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     // Get or create user ID from session storage
//     let storedUserId = sessionStorage.getItem("userId");
//     const storedUsername = sessionStorage.getItem("username");
    
//     if (!storedUserId) {
//       storedUserId = Math.random().toString(36).substring(2, 10);
//       sessionStorage.setItem("userId", storedUserId);
//     }
    
//     setUserId(storedUserId);
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }

//     // Register with the socket server
//     socket.emit("register", { 
//       userId: storedUserId, 
//       username: storedUsername || "Anonymous" 
//     });

//     // Socket event listeners for direct messaging
//     const handlePrivateMessage = (message) => {
//       setMessages((prev) => [...prev, message]);
      
//       // Update unread count if message is from someone other than active user
//       if (message.senderId !== activeUser && message.senderId !== storedUserId) {
//         setOnlineUsers(prev => 
//           prev.map(user => {
//             if (user.userId === message.senderId) {
//               return {
//                 ...user,
//                 unread: (user.unread || 0) + 1,
//                 lastMessage: message.text,
//                 lastMessageTime: message.time
//               };
//             }
//             return user;
//           })
//         );
//       }
//     };

//     const handleUserTyping = ({ userId: typingUserId, username: typingUsername }) => {
//       if (typingUserId !== storedUserId) {
//         setTypingUsers((prev) => ({
//           ...prev,
//           [typingUserId]: { typing: true, username: typingUsername }
//         }));
        
//         setTimeout(() => {
//           setTypingUsers((prev) => ({
//             ...prev,
//             [typingUserId]: { typing: false, username: typingUsername }
//           }));
//         }, 1500);
//       }
//     };

//     const handleOnlineUsers = (users) => {
//       // Filter out the current user
//       const otherUsers = users.filter((user) => user.userId !== storedUserId);
      
//       // Preserve unread counts and last messages when updating online users
//       setOnlineUsers(prev => {
//         return otherUsers.map(newUser => {
//           const existingUser = prev.find(u => u.userId === newUser.userId);
//           return {
//             ...newUser,
//             unread: existingUser?.unread || 0,
//             lastMessage: existingUser?.lastMessage || "",
//             lastMessageTime: existingUser?.lastMessageTime || ""
//           };
//         });
//       });
      
//       // Set first online user as active if none is selected
//       if (!activeUser && otherUsers.length > 0) {
//         setActiveUser(otherUsers[0].userId);
//         loadDirectMessages(otherUsers[0].userId);
//       }
//     };

//     const handleError = (errorMsg) => {
//       setError(errorMsg);
//       setTimeout(() => setError(null), 5000);
//     };

//     socket.on("privateMessage", handlePrivateMessage);
//     socket.on("userTyping", handleUserTyping);
//     socket.on("onlineUsers", handleOnlineUsers);
//     socket.on("error", handleError);

//     // Clean up socket listeners
//     return () => {
//       socket.off("privateMessage", handlePrivateMessage);
//       socket.off("userTyping", handleUserTyping);
//       socket.off("onlineUsers", handleOnlineUsers);
//       socket.off("error", handleError);
//     };
//   }, [activeUser]);

//   // Load direct messages with a specific user
//   const loadDirectMessages = (targetUserId) => {
//     if (!userId || !targetUserId) return;
    
//     // In a real app, you might fetch message history from server
//     socket.emit("getDirectMessages", { 
//       senderId: userId, 
//       receiverId: targetUserId 
//     }, (messageHistory) => {
//       if (messageHistory) {
//         setMessages(messageHistory);
//       } else {
//         setMessages([]);
//       }
//     });
    
//     // Clear unread count for the selected user
//     setOnlineUsers(prev => 
//       prev.map(user => {
//         if (user.userId === targetUserId) {
//           return { ...user, unread: 0 };
//         }
//         return user;
//       })
//     );
//   };

//   // Users state
//   const [users, setUsers] = useState([
//     { id: 1, name: "John Doe", message: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", status: "online", unread: 0 },
//     { id: 2, name: "Jessie Woo", message: "Working with you like dream!", time: "08:50", avatar: "/api/placeholder/80/80", status: "online", unread: 5 },
//     { id: 3, name: "Amelia Nelson", message: "Hi there, How are you?", time: "08:30", avatar: "/api/placeholder/80/80", status: "offline", unread: 5 },
//     { id: 4, name: "Samantha Martin", message: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
//     { id: 5, name: "Chies Lie", message: "Working with you like dream!", time: "08:50", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
//     { id: 6, name: "Nicolas Plum", message: "Hi there, How are you?", time: "08:30", avatar: "/api/placeholder/80/80", status: "online", unread: 0 },
//     { id: 7, name: "Alexa Doe", message: "Cool!! Looks good...", time: "08:30", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
//   ]);

//   // Active user state (now using ID instead of name)
//   const [activeUser, setActiveUser] = useState(null);

//   // Set default user ID and load messages on component mount
//   useEffect(() => {
//     // Set a default user ID if not already set
//     if (userId === null) {
//       setUserId(1); // Assuming "1" is your user ID
//     }
    
//     // Set the first user as active by default
//     if (activeUser === null && users.length > 0) {
//       setActiveUser(users[0].id);
//       loadMessages(users[0].id);
//     }
//   }, [userId, activeUser, users]);

//   // Load messages for a specific user
//   const loadMessages = (userId) => {
//     // Sample message data - in a real app this might come from an API
//     const sampleMessages = [
//       { id: 1, senderId: 1, text: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", isSelf: false },
//       { id: 2, senderId: userId, text: "Waiting for your reply. As I have to go back soon.", time: "09:05", avatar: "", isSelf: true },
//       { id: 3, senderId: userId, text: "Hi, I am coming there in few minutes. Please wait!!", time: "09:10", avatar: "", isSelf: true },
//       { id: 4, senderId: 1, text: "Thank you very much, I am waiting here at StarBuck cafe.", time: "09:15", avatar: "/api/placeholder/80/80", isSelf: false },
//     ];

//     // Filter messages to show only those between active user and current user
//     const filteredMessages = sampleMessages.filter(msg => 
//       (msg.senderId === userId && msg.isSelf === true) || 
//       (msg.senderId === activeUser && msg.isSelf === false)
//     );
    
//     setMessages(filteredMessages);
//   };

//   // Handle sending a new message
//   const handleSendMessage = () => {
//     if (input.trim() !== "") {
//       const newMsg = {
//         id: Math.max(...messages.map(m => m.id), 0) + 1,
//         senderId: userId,
//         text: input,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         avatar: "",
//         isSelf: true
//       };
      
//       setMessages([...messages, newMsg]);
      
//       // Update the last message in the users list
//       setUsers(users.map(user => {
//         if (user.id === activeUser) {
//           return {
//             ...user,
//             message: input.length > 25 ? input.substring(0, 25) + '...' : input,
//             time: newMsg.time,
//             unread: 0
//           };
//         }
//         return user;
//       }));
      
//       setInput("");
//     }
//   };

//   // Handle changing the active user
//   const handleUserChange = (newActiveUserId) => {
//     setActiveUser(newActiveUserId);
//     loadMessages(newActiveUserId);
    
//     // Clear unread messages for the selected user
//     setUsers(users.map(user => {
//       if (user.id === newActiveUserId) {
//         return { ...user, unread: 0 };
//       }
//       return user;
//     }));
//   };

//   // Find the active user object
//   const activeUserObj = users.find(user => user.id === activeUser) || {};

//   return (
//     <Box sx={{ display: 'flex',  flexDirection: 'column', height: '100vh', backgroundColor: '#6a1b9a' }}>
//       <Paper sx={{ margin: 'auto', width: '100%', height: '100vh', display: 'flex', flexDirection: 'row', borderRadius: '16px', boxShadow: 3 }}>
        
//         {/* Left Sidebar */}
//         <Box sx={{ width: '300px', backgroundColor: '#6a1b9a', color: 'white', display: 'flex', flexDirection: 'column' }}>
//           {/* Users Bar with Search Bar */}
//           <UsersBar users={users} activeUser={activeUser} setActiveUser={handleUserChange} />
//         </Box>

//         {/* Chat Area */}
//         <Box sx={{ width: 'calc(100% - 300px)', background: 'linear-gradient(180deg, #6a1b9a 0%, #ab47bc 100%)', display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ padding: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Avatar src={activeUserObj.avatar} alt={activeUserObj.name} sx={{ width: 40, height: 40 }} />
//               <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>{activeUserObj.name}</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Typography 
//                 sx={{ 
//                   backgroundColor: 'white', 
//                   color: '#8e24aa', 
//                   fontSize: '0.75rem', 
//                   fontWeight: 'bold', 
//                   cursor: 'pointer', 
//                   padding: '4px 12px', 
//                   borderRadius: '20px' 
//                 }}
//                 onClick={() => setMessages([])}
//               >
//                 CLEAR CHAT
//               </Typography>
//               <Typography sx={{ backgroundColor: 'white', color: '#8e24aa', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', padding: '4px 12px', borderRadius: '20px' }}>
//                 MORE
//               </Typography>
//             </Box>
//           </Box>

//           <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 3 }}>
//             {messages.map((message) => (
//               <Box
//                 key={message.id}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: message.isSelf ? 'row-reverse' : 'row',
//                   marginBottom: 3,
//                   alignItems: 'flex-start',
//                 }}
//               >
//                 <Avatar src={message.avatar} alt={message.isSelf ? "You" : activeUserObj.name} sx={{ width: 40, height: 40, margin: message.isSelf ? '0 0 0 8px' : '0 8px 0 0' }} />
//                 <Box sx={{ maxWidth: '70%' }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0.5 }}>
//                     <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                       {message.isSelf ? "You" : activeUserObj.name}
//                     </Typography>
//                     {message.time && (
//                       <Typography variant="caption" sx={{ color: '#e1bee7', marginLeft: 1 }}>
//                         {message.time}
//                       </Typography>
//                     )}
//                   </Box>
//                   <Paper sx={{ 
//                     padding: '8px 12px', 
//                     backgroundColor: message.isSelf ? '#ffccbc' : '#8e24aa', 
//                     color: message.isSelf ? '#333' : 'white', 
//                     borderRadius: '16px',
//                     boxShadow: 'none',
//                   }}>
//                     <Typography variant="body2">{message.text}</Typography>
//                   </Paper>
//                 </Box>
//               </Box>
//             ))}
//           </Box>

//           <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 1, backgroundColor: 'white', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
//             <IconButton sx={{ color: '#8e24aa' }}><Smile size={20} /></IconButton>
//             <IconButton sx={{ color: '#8e24aa' }}><Paperclip size={20} /></IconButton>
//             <InputBase
//               placeholder="Type a message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//               sx={{ flexGrow: 1, backgroundColor: 'white', borderRadius: '20px', padding: '8px 16px', border: '1px solid #d1d1d1', fontSize: '0.875rem' }}
//             />
//             <IconButton 
//               sx={{ 
//                 backgroundColor: '#26c6da', 
//                 color: 'white', 
//                 '&:hover': { backgroundColor: '#26c6da' } 
//               }} 
//               onClick={handleSendMessage}
//             >
//               <Send size={20} />
//             </IconButton>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Paper, Avatar, InputBase, IconButton } from '@mui/material';
// import { Search, Send, Paperclip, Smile } from 'lucide-react';
// import { io } from 'socket.io-client';

// const SOCKET_URL = "http://localhost:3000";
// const socket = io(SOCKET_URL, { transports: ['websocket'] });

// // Users Bar Component with Search Bar
// function UsersBar({ users, activeUser, setActiveUser }) {
//   const [searchTerm, setSearchTerm] = useState("");
  
//   const filteredUsers = users.filter(user => 
//     user.username.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   const sortedUsers = [...filteredUsers].sort((a, b) => {
//     if (a.status === b.status) return 0;
//     return a.status === "online" ? -1 : 1;
//   });

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
//       {/* Search Bar */}
//       <Box sx={{ paddingX: 2, marginY: 2 }}>
//         <Box sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           backgroundColor: '#8e24aa', 
//           borderRadius: '9999px', 
//           paddingX: 2, 
//           paddingY: 1 
//         }}>
//           <Search size={20} style={{ color: '#e1bee7' }} />
//           <InputBase
//             placeholder="SEARCH"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{ 
//               color: '#e1bee7', 
//               fontSize: '0.875rem', 
//               flexGrow: 1, 
//               marginLeft: 2,
//               '& .MuiInputBase-input::placeholder': {
//                 color: '#e1bee7',
//                 opacity: 1
//               }
//             }}
//           />
//         </Box>
//       </Box>

//       {/* Users List */}
//       <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//         {sortedUsers.map((user) => (
//           <Box
//             key={user.userId}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               paddingX: 2,
//               paddingY: 1.5,
//               cursor: 'pointer',
//               '&:hover': {
//                 backgroundColor: '#8e24aa',
//                 transition: 'background-color 0.3s ease',
//               },
//               backgroundColor: activeUser === user.userId ? '#8e24aa' : 'transparent',
//             }}
//             onClick={() => setActiveUser(user.userId)}
//           >
//             <Box sx={{ position: 'relative', marginRight: 2 }}>
//               <Avatar 
//                 alt={user.username} 
//                 sx={{ width: 48, height: 48 }}
//                 // Display first letter of username if no avatar
//                 children={user.username.charAt(0).toUpperCase()}
//               />
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   bottom: 0,
//                   right: 0,
//                   width: 16,
//                   height: 16,
//                   borderRadius: '50%',
//                   border: '2px solid #6a1b9a',
//                   backgroundColor: user.status === 'online' ? '#4caf50' : '#f44336',
//                 }}
//               />
//             </Box>
//             <Box sx={{ flexGrow: 1 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                   {user.username}
//                 </Typography>
//                 {user.lastMessageTime && (
//                   <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                     {user.lastMessageTime}
//                   </Typography>
//                 )}
//               </Box>
//               {user.lastMessage && (
//                 <Typography variant="body2" sx={{ color: '#e1bee7', marginTop: 0.5 }}>
//                   {user.lastMessage.length > 25 
//                   ? user.lastMessage.substring(0, 25) + '...' 
//                   : user.lastMessage}
//                 </Typography>
//               )}
//             </Box>
//             {user.unread > 0 && (
//               <Box sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 justifyContent: 'center', 
//                 backgroundColor: '#f44336', 
//                 borderRadius: '50%', 
//                 width: 24, 
//                 height: 24 
//               }}>
//                 <Typography variant="caption" sx={{ color: 'white' }}>
//                   {user.unread}
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }

// export default function ChatApplication() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [username, setUsername] = useState("Anonymous");
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [activeUser, setActiveUser] = useState(null);
//   const [typingUsers, setTypingUsers] = useState({});
//   const [error, setError] = useState(null);
  
//   // Handle user input for typing notifications
//   const handleInputChange = (e) => {
//     setInput(e.target.value);
    
//     // Emit typing event
//     if (activeUser) {
//       socket.emit("typing", {
//         senderId: userId,
//         receiverId: activeUser,
//         username
//       });
//     }
//   };
  
//   useEffect(() => {
//     // Get or create user ID from session storage
//     let storedUserId = sessionStorage.getItem("userId");
//     const storedUsername = sessionStorage.getItem("username");
    
//     if (!storedUserId) {
//       storedUserId = Math.random().toString(36).substring(2, 10);
//       sessionStorage.setItem("userId", storedUserId);
//     }
    
//     setUserId(storedUserId);
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }

//     // Register with the socket server
//     socket.emit("register", { 
//       userId: storedUserId, 
//       username: storedUsername || "Anonymous" 
//     });

//     // Socket event listeners for direct messaging
//     const handlePrivateMessage = (message) => {
//       // Only add message if it's from or to active user
//       if (activeUser && (message.senderId === activeUser || message.receiverId === activeUser)) {
//         setMessages((prev) => [...prev, message]);
//       }
      
//       // Update unread count if message is from someone other than active user
//       if (message.senderId !== activeUser && message.senderId !== storedUserId) {
//         setOnlineUsers(prev => 
//           prev.map(user => {
//             if (user.userId === message.senderId) {
//               return {
//                 ...user,
//                 unread: (user.unread || 0) + 1,
//                 lastMessage: message.text,
//                 lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//               };
//             }
//             return user;
//           })
//         );
//       }
//     };

//     const handleUserTyping = ({ userId: typingUserId, username: typingUsername }) => {
//       if (typingUserId !== storedUserId) {
//         setTypingUsers((prev) => ({
//           ...prev,
//           [typingUserId]: { typing: true, username: typingUsername }
//         }));
        
//         // Clear typing indicator after delay
//         setTimeout(() => {
//           setTypingUsers((prev) => ({
//             ...prev,
//             [typingUserId]: { typing: false, username: typingUsername }
//           }));
//         }, 1500);
//       }
//     };

//     const handleOnlineUsers = (users) => {
//       // Filter out the current user
//       const otherUsers = users.filter((user) => user.userId !== storedUserId);
      
//       // Preserve unread counts and last messages when updating online users
//       setOnlineUsers(prev => {
//         return otherUsers.map(newUser => {
//           const existingUser = prev.find(u => u.userId === newUser.userId);
//           return {
//             ...newUser,
//             unread: existingUser?.unread || 0,
//             lastMessage: existingUser?.lastMessage || "",
//             lastMessageTime: existingUser?.lastMessageTime || ""
//           };
//         });
//       });
      
//       // Set first online user as active if none is selected
//       if (!activeUser && otherUsers.length > 0) {
//         setActiveUser(otherUsers[0].userId);
//         loadDirectMessages(otherUsers[0].userId);
//       }
//     };

//     const handleError = (errorMsg) => {
//       setError(errorMsg);
//       setTimeout(() => setError(null), 5000);
//     };

//     socket.on("privateMessage", handlePrivateMessage);
//     socket.on("userTyping", handleUserTyping);
//     socket.on("onlineUsers", handleOnlineUsers);
//     socket.on("error", handleError);

//     // Clean up socket listeners
//     return () => {
//       socket.off("privateMessage", handlePrivateMessage);
//       socket.off("userTyping", handleUserTyping);
//       socket.off("onlineUsers", handleOnlineUsers);
//       socket.off("error", handleError);
//     };
//   }, [activeUser, userId]); // Added userId to dependency array

//   // Load direct messages with a specific user
//   const loadDirectMessages = (targetUserId) => {
//     if (!userId || !targetUserId) return;
    
//     // In a real app, you might fetch message history from server
//     socket.emit("getDirectMessages", { 
//       senderId: userId, 
//       receiverId: targetUserId 
//     }, (messageHistory) => {
//       if (messageHistory) {
//         setMessages(messageHistory);
//       } else {
//         setMessages([]);
//       }
//     });
    
//     // Clear unread count for the selected user
//     setOnlineUsers(prev => 
//       prev.map(user => {
//         if (user.userId === targetUserId) {
//           return { ...user, unread: 0 };
//         }
//         return user;
//       })
//     );
//   };

//   // Handle sending a new message
//   const handleSendMessage = () => {
//     if (input.trim() !== "" && activeUser) {
//       const newMsg = {
//         id: Date.now(), // Unique ID based on timestamp
//         senderId: userId,
//         receiverId: activeUser,
//         text: input,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         isSelf: true
//       };
      
//       // Add to local messages
//       setMessages(prev => [...prev, newMsg]);
      
//       // Update the last message in online users list
//       setOnlineUsers(users => 
//         users.map(user => {
//           if (user.userId === activeUser) {
//             return {
//               ...user,
//               lastMessage: input,
//               lastMessageTime: newMsg.time
//             };
//           }
//           return user;
//         })
//       );
      
//       // Send message via socket
//       socket.emit("sendPrivateMessage", {
//         senderId: userId,
//         senderName: username,
//         receiverId: activeUser,
//         text: input,
//         time: newMsg.time
//       });
      
//       setInput("");
//     }
//   };

//   // Handle changing the active user
//   const handleUserChange = (newActiveUserId) => {
//     setActiveUser(newActiveUserId);
//     loadDirectMessages(newActiveUserId);
//   };

//   // Find the active user object
//   const activeUserObj = onlineUsers.find(user => user.userId === activeUser) || {};

//   // Check if selected user is typing
//   const isActiveUserTyping = typingUsers[activeUser]?.typing;

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#6a1b9a' }}>
//       {error && (
//         <Box sx={{ 
//           position: 'absolute', 
//           top: 20, 
//           left: '50%', 
//           transform: 'translateX(-50%)',
//           backgroundColor: '#f44336',
//           color: 'white',
//           padding: 2,
//           borderRadius: 1,
//           zIndex: 1000
//         }}>
//           <Typography>{error}</Typography>
//         </Box>
//       )}
      
//       <Paper sx={{ margin: 'auto', width: '100%', height: '100vh', display: 'flex', flexDirection: 'row', borderRadius: '16px', boxShadow: 3 }}>
        
//         {/* Left Sidebar */}
//         <Box sx={{ width: '300px', backgroundColor: '#6a1b9a', color: 'white', display: 'flex', flexDirection: 'column' }}>
//           {/* User profile */}
//           <Box sx={{ padding: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Avatar 
//                 sx={{ width: 48, height: 48 }}
//                 children={username.charAt(0).toUpperCase()}
//               />
//               <Box>
//                 <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                   {username}
//                 </Typography>
//                 <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                   Online
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
          
//           {/* Users Bar with Search Bar */}
//           <UsersBar 
//             users={onlineUsers} 
//             activeUser={activeUser} 
//             setActiveUser={handleUserChange} 
//           />
//         </Box>

//         {/* Chat Area */}
//         <Box sx={{ width: 'calc(100% - 300px)', background: 'linear-gradient(180deg, #6a1b9a 0%, #ab47bc 100%)', display: 'flex', flexDirection: 'column' }}>
//           {activeUser ? (
//             <>
//               <Box sx={{ padding: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Avatar 
//                     children={activeUserObj.username?.charAt(0).toUpperCase()} 
//                     sx={{ width: 40, height: 40 }} 
//                   />
//                   <Box>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                       {activeUserObj.username}
//                     </Typography>
//                     {isActiveUserTyping && (
//                       <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                         typing...
//                       </Typography>
//                     )}
//                   </Box>
//                 </Box>
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <Typography 
//                     sx={{ 
//                       backgroundColor: 'white', 
//                       color: '#8e24aa', 
//                       fontSize: '0.75rem', 
//                       fontWeight: 'bold', 
//                       cursor: 'pointer', 
//                       padding: '4px 12px', 
//                       borderRadius: '20px' 
//                     }}
//                     onClick={() => setMessages([])}
//                   >
//                     CLEAR CHAT
//                   </Typography>
//                   <Typography sx={{ backgroundColor: 'white', color: '#8e24aa', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', padding: '4px 12px', borderRadius: '20px' }}>
//                     MORE
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 3 }}>
//                 {messages.map((message) => (
//                   <Box
//                     key={message.id}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: message.senderId === userId ? 'row-reverse' : 'row',
//                       marginBottom: 3,
//                       alignItems: 'flex-start',
//                     }}
//                   >
//                     <Avatar 
//                       children={message.senderId === userId 
//                         ? username.charAt(0).toUpperCase() 
//                         : activeUserObj.username?.charAt(0).toUpperCase()}
//                       sx={{ width: 40, height: 40, margin: message.senderId === userId ? '0 0 0 8px' : '0 8px 0 0' }} 
//                     />
//                     <Box sx={{ maxWidth: '70%' }}>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0.5 }}>
//                         <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                           {message.senderId === userId ? "You" : activeUserObj.username}
//                         </Typography>
//                         {message.time && (
//                           <Typography variant="caption" sx={{ color: '#e1bee7', marginLeft: 1 }}>
//                             {message.time}
//                           </Typography>
//                         )}
//                       </Box>
//                       <Paper sx={{ 
//                         padding: '8px 12px', 
//                         backgroundColor: message.senderId === userId ? '#ffccbc' : '#8e24aa', 
//                         color: message.senderId === userId ? '#333' : 'white', 
//                         borderRadius: '16px',
//                         boxShadow: 'none',
//                       }}>
//                         <Typography variant="body2">{message.text}</Typography>
//                       </Paper>
//                     </Box>
//                   </Box>
//                 ))}
//               </Box>

//               <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 1, backgroundColor: 'white', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
//                 <IconButton sx={{ color: '#8e24aa' }}><Smile size={20} /></IconButton>
//                 <IconButton sx={{ color: '#8e24aa' }}><Paperclip size={20} /></IconButton>
//                 <InputBase
//                   placeholder="Type a message..."
//                   value={input}
//                   onChange={handleInputChange}
//                   onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//                   sx={{ flexGrow: 1, backgroundColor: 'white', borderRadius: '20px', padding: '8px 16px', border: '1px solid #d1d1d1', fontSize: '0.875rem' }}
//                 />
//                 <IconButton 
//                   sx={{ 
//                     backgroundColor: '#26c6da', 
//                     color: 'white', 
//                     '&:hover': { backgroundColor: '#26c6da' } 
//                   }} 
//                   onClick={handleSendMessage}
//                 >
//                   <Send size={20} />
//                 </IconButton>
//               </Box>
//             </>
//           ) : (
//             <Box sx={{ 
//               display: 'flex', 
//               justifyContent: 'center', 
//               alignItems: 'center', 
//               height: '100%',
//               flexDirection: 'column',
//               padding: 3
//             }}>
//               <Typography variant="h5" sx={{ color: 'white', marginBottom: 2 }}>
//                 Welcome to the Chat Application
//               </Typography>
//               <Typography variant="body1" sx={{ color: '#e1bee7', textAlign: 'center' }}>
//                 Select a user from the list to start chatting or wait for someone to come online.
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// .........................................................

// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Paper, Avatar, InputBase, IconButton } from '@mui/material';
// import { Search, Send, Paperclip, Smile } from 'lucide-react';
// import { io } from 'socket.io-client';

// const SOCKET_URL = "http://localhost:3000";
// const socket = io(SOCKET_URL, { transports: ['websocket'] });

// // Users Bar Component with Search Bar
// function UsersBar({ users, activeUser, setActiveUser }) {
//   const [searchTerm, setSearchTerm] = useState("");
  
//   const filteredUsers = users.filter(user => 
//     user.username.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   // Sort users by status first (online users first)
//   const sortedUsers = [...filteredUsers].sort((a, b) => {
//     if (a.status === b.status) return 0;
//     return a.status === "online" ? -1 : 1;
//   });

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
//       {/* Search Bar */}
//       <Box sx={{ paddingX: 2, marginY: 2 }}>
//         <Box sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           backgroundColor: '#8e24aa', 
//           borderRadius: '9999px', 
//           paddingX: 2, 
//           paddingY: 1 
//         }}>
//           <Search size={20} style={{ color: '#e1bee7' }} />
//           <InputBase
//             placeholder="SEARCH"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{ 
//               color: '#e1bee7', 
//               fontSize: '0.875rem', 
//               flexGrow: 1, 
//               marginLeft: 2,
//               '& .MuiInputBase-input::placeholder': {
//                 color: '#e1bee7',
//                 opacity: 1
//               }
//             }}
//           />
//         </Box>
//       </Box>

//       {/* Users List */}
//       <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//         {sortedUsers.map((user) => (
//           <Box
//             key={user.userId}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               paddingX: 2,
//               paddingY: 1.5,
//               cursor: 'pointer',
//               '&:hover': {
//                 backgroundColor: '#8e24aa',
//                 transition: 'background-color 0.3s ease',
//               },
//               backgroundColor: activeUser === user.userId ? '#8e24aa' : 'transparent',
//             }}
//             onClick={() => setActiveUser(user.userId)}
//           >
//             <Box sx={{ position: 'relative', marginRight: 2 }}>
//               <Avatar 
//                 alt={user.username} 
//                 sx={{ width: 48, height: 48 }}
//                 // Display first letter of username if no avatar
//                 children={user.username.charAt(0).toUpperCase()}
//               />
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   bottom: 0,
//                   right: 0,
//                   width: 16,
//                   height: 16,
//                   borderRadius: '50%',
//                   border: '2px solid #6a1b9a',
//                   // Fixed: Always show green for online users
//                   backgroundColor: user.status === 'online' ? '#4caf50' : '#f44336',
//                 }}
//               />
//             </Box>
//             <Box sx={{ flexGrow: 1 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                   {user.username}
//                 </Typography>
//                 {user.lastMessageTime && (
//                   <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                     {user.lastMessageTime}
//                   </Typography>
//                 )}
//               </Box>
//               {user.lastMessage && (
//                 <Typography variant="body2" sx={{ color: '#e1bee7', marginTop: 0.5 }}>
//                   {user.lastMessage.length > 25 
//                   ? user.lastMessage.substring(0, 25) + '...' 
//                   : user.lastMessage}
//                 </Typography>
//               )}
//             </Box>
//             {user.unread > 0 && (
//               <Box sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 justifyContent: 'center', 
//                 backgroundColor: '#f44336', 
//                 borderRadius: '50%', 
//                 width: 24, 
//                 height: 24 
//               }}>
//                 <Typography variant="caption" sx={{ color: 'white' }}>
//                   {user.unread}
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }

// export default function ChatApplication() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [username, setUsername] = useState("Anonymous");
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [activeUser, setActiveUser] = useState(null);
//   const [typingUsers, setTypingUsers] = useState({});
//   const [error, setError] = useState(null);
  
//   // Handle user input for typing notifications
//   const handleInputChange = (e) => {
//     setInput(e.target.value);
    
//     // Emit typing event
//     if (activeUser) {
//       socket.emit("typing", {
//         senderId: userId,
//         receiverId: activeUser,
//         username
//       });
//     }
//   };
  
//   useEffect(() => {
//     // Get or create user ID from session storage
//     let storedUserId = sessionStorage.getItem("userId");
//     const storedUsername = sessionStorage.getItem("username");
    
//     if (!storedUserId) {
//       storedUserId = Math.random().toString(36).substring(2, 10);
//       sessionStorage.setItem("userId", storedUserId);
//     }
    
//     setUserId(storedUserId);

//     if (storedUsername) {
//       setUsername(storedUsername);
//     }

//     // Register with the socket server
//     socket.emit("register", { 
//       userId: storedUserId, 
//       username: storedUsername || "Anonymous" 
//     });

//     // Socket event listeners for direct messaging
//     const handlePrivateMessage = (message) => {
//       // Fixed: Add incoming message to messages regardless of active user
//       setMessages((prev) => {
//         // If we're chatting with the sender or this is a message for the active conversation
//         if ((activeUser === message.senderId) || 
//             (activeUser === message.receiverId && message.senderId === storedUserId)) {
//           return [...prev, {
//             ...message,
//             id: Date.now() + Math.random(), // Ensure unique ID
//             time: message.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//           }];
//         }
//         return prev;
//       });
      
//       // Update unread count and last message if message is from someone other than active user
//       if (message.senderId !== activeUser && message.senderId !== storedUserId) {
//         setOnlineUsers(prev => 
//           prev.map(user => {
//             if (user.userId === message.senderId) {
//               return {
//                 ...user,
//                 unread: (user.unread || 0) + 1,
//                 lastMessage: message.text,
//                 lastMessageTime: message.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//               };
//             }
//             return user;
//           })
//         );
//       }
//     };

//     const handleUserTyping = ({ userId: typingUserId, username: typingUsername }) => {
//       if (typingUserId !== storedUserId) {
//         setTypingUsers((prev) => ({
//           ...prev,
//           [typingUserId]: { typing: true, username: typingUsername }
//         }));
        
//         // Clear typing indicator after delay
//         setTimeout(() => {
//           setTypingUsers((prev) => ({
//             ...prev,
//             [typingUserId]: { typing: true, username: typingUsername }
//           }));
//         }, 1500);
//       }
//     };

//     const handleOnlineUsers = (users) => {
//       // Filter out the current user
//       const otherUsers = users.filter((user) => user.userId !== storedUserId);
      
//       // Preserve unread counts and last messages when updating online users
//       setOnlineUsers(prev => {
//         return otherUsers.map(newUser => {
//           const existingUser = prev.find(u => u.userId === newUser.userId);
//           return {
//             ...newUser,
//             // Fixed: Make sure all users show as online with their registered names
//             status: newUser.status || "online",
//             username: newUser.username || "Anonymous",
//             unread: existingUser?.unread || 0,
//             lastMessage: existingUser?.lastMessage || "",
//             lastMessageTime: existingUser?.lastMessageTime || ""
//           };
//         });
//       });
      
//       // Set first online user as active if none is selected
//       if (!activeUser && otherUsers.length > 0) {
//         setActiveUser(otherUsers[0].userId);
//         loadDirectMessages(otherUsers[0].userId);
//       }
//     };

//     const handleError = (errorMsg) => {
//       setError(errorMsg);
//       setTimeout(() => setError(null), 5000);
//     };

//     // Improved socket event listeners
//     socket.on("privateMessage", handlePrivateMessage);
//     socket.on("userTyping", handleUserTyping);
//     socket.on("onlineUsers", handleOnlineUsers);
//     socket.on("error", handleError);

//     // Clean up socket listeners
//     return () => {
//       socket.off("privateMessage", handlePrivateMessage);
//       socket.off("userTyping", handleUserTyping);
//       socket.off("onlineUsers", handleOnlineUsers);
//       socket.off("error", handleError);
//     };
//   }, [activeUser, userId]); // Added userId to dependency array

//   // Load direct messages with a specific user
//   const loadDirectMessages = (targetUserId) => {
//     if (!userId || !targetUserId) return;
    
//     // In a real app, you might fetch message history from server
//     socket.emit("getDirectMessages", { 
//       senderId: userId, 
//       receiverId: targetUserId 
//     }, (messageHistory) => {
//       if (messageHistory) {
//         setMessages(messageHistory);
//       } else {
//         setMessages([]);
//       }
//     });
    
//     // Clear unread count for the selected user
//     setOnlineUsers(prev => 
//       prev.map(user => {
//         if (user.userId === targetUserId) {
//           return { ...user, unread: 0 };
//         }
//         return user;
//       })
//     );
//   };

//   // Handle sending a new message
//   const handleSendMessage = () => {
//     if (input.trim() !== "" && activeUser) {
//       const newMsg = {
//         id: Date.now(), // Unique ID based on timestamp
//         senderId: userId,
//         receiverId: activeUser,
//         text: input,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         isSelf: true
//       };
      
//       // Add to local messages
//       setMessages(prev => [...prev, newMsg]);
      
//       // Update the last message in online users list
//       setOnlineUsers(users => 
//         users.map(user => {
//           if (user.userId === activeUser) {
//             return {
//               ...user,
//               lastMessage: input,
//               lastMessageTime: newMsg.time
//             };
//           }
//           return user;
//         })
//       );
      
//       // Send message via socket
//       socket.emit("sendPrivateMessage", {
//         senderId: userId,
//         senderName: username,
//         receiverId: activeUser,
//         text: input,
//         time: newMsg.time
//       });
      
//       setInput("");
//     }
//   };

//   // Handle changing the active user
//   const handleUserChange = (newActiveUserId) => {
//     setActiveUser(newActiveUserId);
//     loadDirectMessages(newActiveUserId);
//   };

//   // Find the active user object
//   const activeUserObj = onlineUsers.find(user => user.userId === activeUser) || {};

//   // Check if selected user is typing
//   const isActiveUserTyping = typingUsers[activeUser]?.typing;

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#6a1b9a' }}>
//       {error && (
//         <Box sx={{ 
//           position: 'absolute', 
//           top: 20, 
//           left: '50%', 
//           transform: 'translateX(-50%)',
//           backgroundColor: '#f44336',
//           color: 'white',
//           padding: 2,
//           borderRadius: 1,
//           zIndex: 1000
//         }}>
//           <Typography>{error}</Typography>
//         </Box>
//       )}
      
//       <Paper sx={{ margin: 'auto', width: '100%', height: '100vh', display: 'flex', flexDirection: 'row', borderRadius: '16px', boxShadow: 3 }}>
        
//         {/* Left Sidebar */}
//         <Box sx={{ width: '300px', backgroundColor: '#6a1b9a', color: 'white', display: 'flex', flexDirection: 'column' }}>
//           {/* User profile */}
//           <Box sx={{ padding: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Avatar 
//                 sx={{ width: 48, height: 48 }}
//                 children={username.charAt(0).toUpperCase()}
//               />
//               <Box>
//                 <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                   {username}
//                 </Typography>
//                 <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                   Online
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
          
//           {/* Users Bar with Search Bar */}
//           <UsersBar 
//             users={onlineUsers} 
//             activeUser={activeUser} 
//             setActiveUser={handleUserChange} 
//           />
//         </Box>

//         {/* Chat Area */}
//         <Box sx={{ width: 'calc(100% - 300px)', background: 'linear-gradient(180deg, #6a1b9a 0%, #ab47bc 100%)', display: 'flex', flexDirection: 'column' }}>
//           {activeUser ? (
//             <>
//               <Box sx={{ padding: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Avatar 
//                     children={activeUserObj.username?.charAt(0).toUpperCase()} 
//                     sx={{ width: 40, height: 40 }} 
//                   />
//                   <Box>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                       {activeUserObj.username}
//                     </Typography>
//                     <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                       {isActiveUserTyping ? 'typing...' : activeUserObj.status === 'online' ? 'online' : 'offline'}
//                     </Typography>
//                   </Box>
//                 </Box>
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <Typography 
//                     sx={{ 
//                       backgroundColor: 'white', 
//                       color: '#8e24aa', 
//                       fontSize: '0.75rem', 
//                       fontWeight: 'bold', 
//                       cursor: 'pointer', 
//                       padding: '4px 12px', 
//                       borderRadius: '20px' 
//                     }}
//                     onClick={() => setMessages([])}
//                   >
//                     CLEAR CHAT
//                   </Typography>
//                   <Typography sx={{ backgroundColor: 'white', color: '#8e24aa', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', padding: '4px 12px', borderRadius: '20px' }}>
//                     MORE
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 3 }}>
//                 {messages.map((message) => (
//                   <Box
//                     key={message.id}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: message.senderId === userId ? 'row-reverse' : 'row',
//                       marginBottom: 3,
//                       alignItems: 'flex-start',
//                     }}
//                   >
//                     <Avatar 
//                       children={message.senderId === userId 
//                         ? username.charAt(0).toUpperCase() 
//                         : activeUserObj.username?.charAt(0).toUpperCase()}
//                       sx={{ width: 40, height: 40, margin: message.senderId === userId ? '0 0 0 8px' : '0 8px 0 0' }} 
//                     />
//                     <Box sx={{ maxWidth: '70%' }}>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0.5 }}>
//                         <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                           {message.senderId === userId ? "You" : activeUserObj.username}
//                         </Typography>
//                         {message.time && (
//                           <Typography variant="caption" sx={{ color: '#e1bee7', marginLeft: 1 }}>
//                             {message.time}
//                           </Typography>
//                         )}
//                       </Box>
//                       <Paper sx={{ 
//                         padding: '8px 12px', 
//                         backgroundColor: message.senderId === userId ? '#ffccbc' : '#8e24aa', 
//                         color: message.senderId === userId ? '#333' : 'white', 
//                         borderRadius: '16px',
//                         boxShadow: 'none',
//                       }}>
//                         <Typography variant="body2">{message.text}</Typography>
//                       </Paper>
//                     </Box>
//                   </Box>
//                 ))}
//               </Box>

//               <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 1, backgroundColor: 'white', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
//                 <IconButton sx={{ color: '#8e24aa' }}><Smile size={20} /></IconButton>
//                 <IconButton sx={{ color: '#8e24aa' }}><Paperclip size={20} /></IconButton>
//                 <InputBase
//                   placeholder="Type a message..."
//                   value={input}
//                   onChange={handleInputChange}
//                   onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//                   sx={{ flexGrow: 1, backgroundColor: 'white', borderRadius: '20px', padding: '8px 16px', border: '1px solid #d1d1d1', fontSize: '0.875rem' }}
//                 />
//                 <IconButton 
//                   sx={{ 
//                     backgroundColor: '#26c6da', 
//                     color: 'white', 
//                     '&:hover': { backgroundColor: '#26c6da' } 
//                   }} 
//                   onClick={handleSendMessage}
//                 >
//                   <Send size={20} />
//                 </IconButton>
//               </Box>
//             </>
//           ) : (
//             <Box sx={{ 
//               display: 'flex', 
//               justifyContent: 'center', 
//               alignItems: 'center', 
//               height: '100%',
//               flexDirection: 'column',
//               padding: 3
//             }}>
//               <Typography variant="h5" sx={{ color: 'white', marginBottom: 2 }}>
//                 Welcome to the Chat Application
//               </Typography>
//               <Typography variant="body1" sx={{ color: '#e1bee7', textAlign: 'center' }}>
//                 Select a user from the list to start chatting or wait for someone to come online.
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// .........3

import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, InputBase, IconButton } from '@mui/material';
import { Search, Send, Paperclip, Smile, LogOut } from 'lucide-react';
import { io } from 'socket.io-client';

const SOCKET_URL = "http://localhost:3000";
const socket = io(SOCKET_URL, { 
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Users Bar Component with Search Bar
function UsersBar({ users, activeUser, setActiveUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort users by status first (online users first)
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === "online" ? -1 : 1;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Search Bar */}
      <Box sx={{ paddingX: 2, marginY: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: '#8e24aa', 
          borderRadius: '9999px', 
          paddingX: 2, 
          paddingY: 1 
        }}>
          <Search size={20} style={{ color: '#e1bee7' }} />
          <InputBase
            placeholder="SEARCH"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              color: '#e1bee7', 
              fontSize: '0.875rem', 
              flexGrow: 1, 
              marginLeft: 2,
              '& .MuiInputBase-input::placeholder': {
                color: '#e1bee7',
                opacity: 1
              }
            }}
          />
        </Box>
      </Box>

      {/* Users List */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {sortedUsers.map((user) => (
          <Box
            key={user.userId}
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingX: 2,
              paddingY: 1.5,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#8e24aa',
                transition: 'background-color 0.3s ease',
              },
              backgroundColor: activeUser === user.userId ? '#8e24aa' : 'transparent',
            }}
            onClick={() => setActiveUser(user.userId)}
          >
            <Box sx={{ position: 'relative', marginRight: 2 }}>
              <Avatar 
                alt={user.username} 
                sx={{ width: 48, height: 48 }}
                // Display first letter of username if no avatar
                children={user.username.charAt(0).toUpperCase()}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '2px solid #6a1b9a',
                  backgroundColor: user.status === 'online' ? '#4caf50' : '#f44336',
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {user.username}
                </Typography>
                {user.lastMessageTime && (
                  <Typography variant="caption" sx={{ color: '#e1bee7' }}>
                    {user.lastMessageTime}
                  </Typography>
                )}
              </Box>
              {user.lastMessage && (
                <Typography variant="body2" sx={{ color: '#e1bee7', marginTop: 0.5 }}>
                  {user.lastMessage.length > 25 
                  ? user.lastMessage.substring(0, 25) + '...' 
                  : user.lastMessage}
                </Typography>
              )}
            </Box>
            {user.unread > 0 && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: '#f44336', 
                borderRadius: '50%', 
                width: 24, 
                height: 24 
              }}>
                <Typography variant="caption" sx={{ color: 'white' }}>
                  {user.unread}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function ChatApplication() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("Anonymous");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [typingUsers, setTypingUsers] = useState({});
  const [error, setError] = useState(null);
  
  // Handle user input for typing notifications
  const handleInputChange = (e) => {
    setInput(e.target.value);
    
    // Emit typing event
    if (activeUser) {
      socket.emit("typing", {
        senderId: userId,
        receiverId: activeUser,
        username
      });
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
  
    socket.emit("logout", userId);
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
  };
    useEffect(() => {
    let storedUserId = sessionStorage.getItem("userId");
    const storedUsername = sessionStorage.getItem("username");
    
    if (!storedUserId) {
      storedUserId = Math.random().toString(36).substring(2, 10);
      sessionStorage.setItem("userId", storedUserId);
    }
    
    setUserId(storedUserId);
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Register with the socket server
    socket.emit("register", { userId: storedUserId, username: storedUsername || "Anonymous" });
    // socket.emit("joinRoom", room);

    // Socket event listeners
    const handleRoomMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handlePrivateMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleUserTyping = ({ userId: typingUserId, username: typingUsername }) => {
      if (typingUserId !== storedUserId) {
        setTypingUsers((prev) => ({ 
          ...prev, 
          [typingUserId]: { typing: true, username: typingUsername } 
        }));
        
        setTimeout(() => {
          setTypingUsers((prev) => ({ 
            ...prev, 
            [typingUserId]: { typing: false, username: typingUsername } 
          }));
        }, 1500);
      }
    };

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users.filter((user) => user.userId !== storedUserId));
    };

    const handleError = (errorMsg) => {
      setError(errorMsg);
      setTimeout(() => setError(null), 5000);
    };

    socket.on("roomMessage", handleRoomMessage);
    socket.on("privateMessage", handlePrivateMessage);
    socket.on("userTyping", handleUserTyping);
    socket.on("onlineUsers", handleOnlineUsers);
    socket.on("error", handleError);

    // Clean up socket listeners
    return () => {
      socket.off("roomMessage", handleRoomMessage);
      socket.off("privateMessage", handlePrivateMessage);
      socket.off("userTyping", handleUserTyping);
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("error", handleError);
    };
  }, []); // Added userId to dependency array



  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (input.trim() !== "" && activeUser) {
      const newMsg = {
        id: Date.now(), // Unique ID based on timestamp
        senderId: userId,
        receiverId: activeUser,
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true
      };
      
      // Add to local messages
      setMessages(prev => [...prev, newMsg]);
      
      // Update the last message in online users list
      setOnlineUsers(users => 
        users.map(user => {
          if (user.userId === activeUser) {
            return {
              ...user,
              lastMessage: input,
              lastMessageTime: newMsg.time
            };
          }
          return user;
        })
      );
      
      // Send message via socket
      socket.emit("sendPrivateMessage", {
        senderId: userId,
        senderName: username,
        receiverId: activeUser,
        text: input,
        time: newMsg.time
      });
      
      setInput("");
    }
  };

  // Handle changing the active user
  const handleUserChange = (newActiveUserId) => {
    setActiveUser(newActiveUserId);
    // loadDirectMessages(newActiveUserId);
  };

  // Find the active user object
  const activeUserObj = onlineUsers.find(user => user.userId === activeUser) || {};

  // Check if selected user is typing
  const isActiveUserTyping = typingUsers[activeUser]?.typing;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#6a1b9a' }}>
      {error && (
        <Box sx={{ 
          position: 'absolute', 
          top: 20, 
          left: '50%', 
          transform: 'translateX(-50%)',
          backgroundColor: '#f44336',
          color: 'white',
          padding: 2,
          borderRadius: 1,
          zIndex: 1000
        }}>
          <Typography>{error}</Typography>
        </Box>
      )}
      
      <Paper sx={{ margin: 'auto', width: '100%', height: '100vh', display: 'flex', flexDirection: 'row', borderRadius: '16px', boxShadow: 3 }}>
        
        {/* Left Sidebar */}
        <Box sx={{ width: '300px', backgroundColor: '#6a1b9a', color: 'white', display: 'flex', flexDirection: 'column' }}>
          {/* User profile */}
          <Box sx={{ padding: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                sx={{ width: 48, height: 48 }}
                children={username.charAt(0).toUpperCase()}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {username}
                </Typography>
                <Typography variant="caption" sx={{ color: '#e1bee7' }}>
                  Online
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {/* Users Bar with Search Bar */}
          <UsersBar 
            users={onlineUsers} 
            activeUser={activeUser} 
            setActiveUser={handleUserChange} 
          />
        </Box>

        {/* Chat Area */}
        <Box sx={{ width: 'calc(100% - 300px)', background: 'linear-gradient(180deg, #6a1b9a 0%, #ab47bc 100%)', display: 'flex', flexDirection: 'column' }}>
          {activeUser ? (
            <>
              <Box sx={{ padding: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar 
                    children={activeUserObj.username?.charAt(0).toUpperCase()} 
                    sx={{ width: 40, height: 40 }} 
                  />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
                      {activeUserObj.username}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#e1bee7' }}>
                      {isActiveUserTyping ? 'typing...' : activeUserObj.status === 'online' ? 'online' : 'offline'}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography 
                    sx={{ 
                      backgroundColor: 'white', 
                      color: '#8e24aa', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold', 
                      cursor: 'pointer', 
                      padding: '4px 12px', 
                      borderRadius: '20px' 
                    }}
                    onClick={() => setMessages([])}
                  >
                    CLEAR CHAT
                  </Typography>
                  <Box
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#f44336', 
                      color: 'white', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold', 
                      cursor: 'pointer', 
                      padding: '4px 12px', 
                      borderRadius: '20px',
                      '&:hover': {
                        backgroundColor: '#d32f2f'
                      }
                    }}
                    onClick={handleLogout}
                  >
                    <LogOut size={14} style={{ marginRight: '4px' }} />
                    LOGOUT
                  </Box>
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 3 }}>
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        flexDirection: message.senderId === userId ? 'row-reverse' : 'row',
                        marginBottom: 3,
                        alignItems: 'flex-start',
                      }}
                    >
                      <Avatar 
                        children={message.senderId === userId 
                          ? username.charAt(0).toUpperCase() 
                          : activeUserObj.username?.charAt(0).toUpperCase()}
                        sx={{ width: 40, height: 40, margin: message.senderId === userId ? '0 0 0 8px' : '0 8px 0 0' }} 
                      />
                      <Box sx={{ maxWidth: '70%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                            {message.senderId === userId ? "You" : activeUserObj.username}
                          </Typography>
                          {message.time && (
                            <Typography variant="caption" sx={{ color: '#e1bee7', marginLeft: 1 }}>
                              {message.time}
                            </Typography>
                          )}
                        </Box>
                        <Paper sx={{ 
                          padding: '8px 12px', 
                          backgroundColor: message.senderId === userId ? '#ffccbc' : '#8e24aa', 
                          color: message.senderId === userId ? '#333' : 'white', 
                          borderRadius: '16px',
                          boxShadow: 'none',
                        }}>
                          <Typography variant="body2">{message.text}</Typography>
                        </Paper>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100%',
                    flexDirection: 'column'
                  }}>
                    <Typography variant="body1" sx={{ color: '#e1bee7', textAlign: 'center' }}>
                      No messages yet. Start a conversation!
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 1, backgroundColor: 'white', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
                <IconButton sx={{ color: '#8e24aa' }}><Smile size={20} /></IconButton>
                <IconButton sx={{ color: '#8e24aa' }}><Paperclip size={20} /></IconButton>
                <InputBase
                  placeholder="Type a message..."
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  sx={{ flexGrow: 1, backgroundColor: 'white', borderRadius: '20px', padding: '8px 16px', border: '1px solid #d1d1d1', fontSize: '0.875rem' }}
                />
                <IconButton 
                  sx={{ 
                    backgroundColor: '#26c6da', 
                    color: 'white', 
                    '&:hover': { backgroundColor: '#26c6da' } 
                  }} 
                  onClick={handleSendMessage}
                >
                  <Send size={20} />
                </IconButton>
              </Box>
            </>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%',
              flexDirection: 'column',
              padding: 3
            }}>
              <Typography variant="h5" sx={{ color: 'white', marginBottom: 2 }}>
                Welcome to the Chat Application
              </Typography>
              <Typography variant="body1" sx={{ color: '#e1bee7', textAlign: 'center' }}>
                Select a user from the list to start chatting or wait for someone to come online.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}