
// // // // ....

// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Paper, Avatar, InputBase, IconButton } from '@mui/material';
// import { Search, Send, Paperclip, Smile, LogOut } from 'lucide-react';
// import { io } from 'socket.io-client';

// const SOCKET_URL = "http://localhost:3000";
// const socket = io(SOCKET_URL, { 
//   reconnection: true,
//   reconnectionAttempts: 5,  
//   reconnectionDelay: 1000,
// });

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

// export default function ChatApplication({ userId, username = "User" }) {
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [recipientId, setRecipientId] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [typingUsers, setTypingUsers] = useState({});
//   const [error, setError] = useState("");
  
//   // Format user data for display
//   const formatUserData = (users) => {
//     return users.map(user => ({
//       userId: user.id || user,
//       username: user.username || `User_${user}`,
//       status: "online",
//       lastMessage: "",
//       lastMessageTime: "",
//       unread: 0
//     }));
//   };
  
//   // Find active user object
//   const activeUserObj = onlineUsers.find(user => user.userId === recipientId) || {};

//   // Handle user selection
//   const handleUserChange = (userId) => {
//     setRecipientId(userId);
//     // Reset messages when changing user
//     setMessages([]);
//   };
  
//   // Handle logout
//   const handleLogout = () => {
//     socket.disconnect();
//     // You would typically handle logout, like redirecting to login page
//     setError("Logged out successfully");
//     setTimeout(() => setError(""), 3000);
//   };
  
//   // Handle input change and typing notification
//   const handleInputChange = (e) => {
//     setMessage(e.target.value);
    
//     if (recipientId) {
//       handleTyping();
//     }
//   };

//   // Register user
//   useEffect(() => {
//     if (userId) {
//       socket.emit("register", userId);
//     }

//     socket.on("onlineUsers", (users) => {
//       // Format users data
//       const formattedUsers = formatUserData(users.filter((id) => id !== userId));
//       setOnlineUsers(formattedUsers);
//     });

//     return () => {
//       socket.off("onlineUsers");
//     };
//   }, [userId]);

//   // Listen for incoming private messages
//   useEffect(() => {
//     socket.on("privateMessage", (message) => {
//       if (
//         (message.senderId === recipientId && message.recipientId === userId) ||
//         (message.senderId === userId && message.recipientId === recipientId)
//       ) {
//         // Add time property if not present
//         const messageWithTime = {
//           ...message,
//           time: message.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           id: message.id || Date.now() // Ensure there's an ID for React keys
//         };
        
//         setMessages((prev) => [...prev, messageWithTime]);
//       }
//     });

//     return () => {
//       socket.off("privateMessage");
//     };
//   }, [recipientId, userId]);

//   // Typing indicator
//   useEffect(() => {
//     socket.on("typing", ({ senderId, receiverId, username }) => {
//       if (receiverId === userId && senderId === recipientId) {
//         setTypingUsers((prev) => ({
//           ...prev,
//           [senderId]: `${username} is typing...`,
//         }));

//         setTimeout(() => {
//           setTypingUsers((prev) => {
//             const updated = { ...prev };
//             delete updated[senderId];
//             return updated;
//           });
//         }, 3000);
//       }
//     });

//     return () => {
//       socket.off("typing");
//     };
//   }, [recipientId, userId]);

//   // Send a message
//   const handleSendMessage = () => {
//     if (!message.trim() || !recipientId) return;

//     const newMessage = {
//       id: Date.now(),
//       senderId: userId,
//       recipientId,
//       text: message,
//       timestamp: new Date().toISOString(),
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };

//     socket.emit("sendPrivateMessage", newMessage);
//     setMessages((prev) => [...prev, newMessage]);
//     setMessage("");
//   };

//   // Emit typing
//   const handleTyping = () => {
//     socket.emit("typing", {
//       senderId: userId,
//       receiverId: recipientId,
//       username,
//     });
//   };

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
//                 children={(username || 'U').charAt(0).toUpperCase()}
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
//             activeUser={recipientId} 
//             setActiveUser={handleUserChange} 
//           />
//         </Box>

//         {/* Chat Area */}
//         <Box sx={{ width: 'calc(100% - 300px)', background: 'linear-gradient(180deg, #6a1b9a 0%, #ab47bc 100%)', display: 'flex', flexDirection: 'column' }}>
//           {recipientId ? (
//             <>
//               <Box sx={{ padding: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Avatar 
//                     children={(activeUserObj.username || 'U').charAt(0).toUpperCase()} 
//                     sx={{ width: 40, height: 40 }} 
//                   />
//                   <Box>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                       {activeUserObj.username}
//                     </Typography>
//                     {typingUsers[recipientId] && (
//                       <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                         {typingUsers[recipientId]}
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
//                   <Box
//                     sx={{ 
//                       display: 'flex',
//                       alignItems: 'center',
//                       backgroundColor: '#f44336', 
//                       color: 'white', 
//                       fontSize: '0.75rem', 
//                       fontWeight: 'bold', 
//                       cursor: 'pointer', 
//                       padding: '4px 12px', 
//                       borderRadius: '20px',
//                       '&:hover': {
//                         backgroundColor: '#d32f2f'
//                       }
//                     }}
//                     onClick={handleLogout}
//                   >
//                     <LogOut size={14} style={{ marginRight: '4px' }} />
//                     LOGOUT
//                   </Box>
//                 </Box>
//               </Box>

//               <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 3 }}>
//                 {messages.length > 0 ? (
//                   messages.map((message) => (
//                     <Box
//                       key={message.id}
//                       sx={{
//                         display: 'flex',
//                         flexDirection: message.senderId === userId ? 'row-reverse' : 'row',
//                         marginBottom: 3,
//                         alignItems: 'flex-start',
//                       }}
//                     >
//                       <Avatar 
//                         children={message.senderId === userId 
//                           ? (username || 'U').charAt(0).toUpperCase() 
//                           : (activeUserObj.username || 'U')?.charAt(0).toUpperCase()}
//                         sx={{ width: 40, height: 40, margin: message.senderId === userId ? '0 0 0 8px' : '0 8px 0 0' }} 
//                       />
//                       <Box sx={{ maxWidth: '70%' }}>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0.5 }}>
//                           <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                             {message.senderId === userId ? "You" : activeUserObj.username}
//                           </Typography>
//                           {message.time && (
//                             <Typography variant="caption" sx={{ color: '#e1bee7', marginLeft: 1 }}>
//                               {message.time}
//                             </Typography>
//                           )}
//                         </Box>
//                         <Paper sx={{ 
//                           padding: '8px 12px', 
//                           backgroundColor: message.senderId === userId ? '#ffccbc' : '#8e24aa', 
//                           color: message.senderId === userId ? '#333' : 'white', 
//                           borderRadius: '16px',
//                           boxShadow: 'none',
//                         }}>
//                           <Typography variant="body2">{message.text}</Typography>
//                         </Paper>
//                       </Box>
//                     </Box>
//                   ))
//                 ) : (
//                   <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'center', 
//                     alignItems: 'center', 
//                     height: '100%',
//                     flexDirection: 'column'
//                   }}>
//                     <Typography variant="body1" sx={{ color: '#e1bee7', textAlign: 'center' }}>
//                       No messages yet. Start a conversation!
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>

//               <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 1, backgroundColor: 'white', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
//                 <IconButton sx={{ color: '#8e24aa' }}><Smile size={20} /></IconButton>
//                 <IconButton sx={{ color: '#8e24aa' }}><Paperclip size={20} /></IconButton>
//                 <InputBase
//                   placeholder="Type a message..."
//                   value={message}
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

// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Paper, Avatar, InputBase, IconButton } from '@mui/material';
// import { Search, Send, Paperclip, Smile, LogOut } from 'lucide-react';
// import { io } from 'socket.io-client';

// const SOCKET_URL = "http://localhost:3000";
// const socket = io(SOCKET_URL, { 
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// function UsersBar({ users, activeUser, setActiveUser, searchTerm, setSearchTerm }) {
//   const filteredUsers = users.filter(user => 
//     user.username.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedUsers = [...filteredUsers].sort((a, b) => 
//     a.status === b.status ? 0 : a.status === "online" ? -1 : 1
//   );

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
//               },
//               backgroundColor: activeUser === user.userId ? '#8e24aa' : 'transparent',
//             }}
//             onClick={() => setActiveUser(user.userId)}
//           >
//             <Box sx={{ position: 'relative', marginRight: 2 }}>
//               <Avatar 
//                 sx={{ width: 48, height: 48 }}
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
//               <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                 {user.username}
//               </Typography>
//               {user.lastMessage && (
//                 <Typography variant="body2" sx={{ color: '#e1bee7', marginTop: 0.5 }}>
//                   {user.lastMessage.length > 25 
//                     ? user.lastMessage.substring(0, 25) + '...' 
//                     : user.lastMessage}
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }

// export default function ChatApplication({ userId, username = "User" }) {
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [recipientId, setRecipientId] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [typingUsers, setTypingUsers] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isConnected, setIsConnected] = useState(false);

//   // Register user and setup listeners
//   useEffect(() => {
//     // Connection status
//     socket.on('connect', () => {
//       setIsConnected(true);
//       socket.emit("register", { userId, username });
//     });

//     socket.on('disconnect', () => setIsConnected(false));

//     // Online users handler
//     socket.on("onlineUsers", (users) => {
//       const formattedUsers = users
//         .filter(user => user.id !== userId)
//         .map(user => ({
//           userId: user.id,
//           username: user.username,
//           status: user.status,
//           lastMessage: "",
//           lastMessageTime: "",
//           unread: 0
//         }));
//       setOnlineUsers(formattedUsers);
//     });

//     // Message handler
//     socket.on("privateMessage", (message) => {
//       setMessages(prev => [...prev, {
//         ...message,
//         time: message.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }]);
//     });

//     // Typing indicator
//     socket.on("typing", ({ senderId, username }) => {
//       setTypingUsers(prev => ({
//         ...prev,
//         [senderId]: `${username} is typing...`
//       }));
//       setTimeout(() => {
//         setTypingUsers(prev => {
//           const updated = { ...prev };
//           delete updated[senderId];
//           return updated;
//         });
//       }, 3000);
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('disconnect');
//       socket.off("onlineUsers");
//       socket.off("privateMessage");
//       socket.off("typing");
//     };
//   }, [userId, username]);

//   const handleSendMessage = () => {
//     if (!message.trim() || !recipientId) return;

//     const newMessage = {
//       id: Date.now(),
//       senderId: userId,
//       recipientId,
//       text: message,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };

//     socket.emit("sendPrivateMessage", newMessage);
//     setMessages(prev => [...prev, newMessage]);
//     setMessage("");
//   };

//   const handleTyping = () => {
//     if (recipientId) {
//       socket.emit("typing", {
//         senderId: userId,
//         receiverId: recipientId,
//         username
//       });
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#6a1b9a' }}>
//       <Paper sx={{ margin: 'auto', width: '100%', height: '100%', display: 'flex', borderRadius: 0 }}>
//         {/* Left Sidebar */}
//         <Box sx={{ width: '300px', backgroundColor: '#6a1b9a', display: 'flex', flexDirection: 'column' }}>
//           {/* User profile */}
//           <Box sx={{ padding: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Avatar children={username.charAt(0).toUpperCase()} />
//               <Box>
//                 <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
//                   {username}
//                 </Typography>
//                 <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                   {isConnected ? 'Online' : 'Offline'}
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
          
//           {/* Users list */}
//           <UsersBar 
//             users={onlineUsers}
//             activeUser={recipientId}
//             setActiveUser={setRecipientId}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//           />
//         </Box>

//         {/* Chat area */}
//         <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #6a1b9a 0%, #ab47bc 100%)' }}>
//           {recipientId ? (
//             <>
//               {/* Chat header */}
//               <Box sx={{ padding: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Avatar children={onlineUsers.find(u => u.userId === recipientId)?.username.charAt(0).toUpperCase()} />
//                   <Box>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                       {onlineUsers.find(u => u.userId === recipientId)?.username}
//                     </Typography>
//                     {typingUsers[recipientId] && (
//                       <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                         {typingUsers[recipientId]}
//                       </Typography>
//                     )}
//                   </Box>
//                 </Box>
//               </Box>

//               {/* Messages */}
//               <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
//                 {messages.filter(m => 
//                   (m.senderId === recipientId && m.recipientId === userId) ||
//                   (m.senderId === userId && m.recipientId === recipientId)
//                 ).map((message) => (
//                   <Box
//                     key={message.id}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: message.senderId === userId ? 'row-reverse' : 'row',
//                       marginBottom: 2,
//                       alignItems: 'flex-start',
//                       gap: 1
//                     }}
//                   >
//                     <Avatar children={message.senderId === userId ? username.charAt(0).toUpperCase() : onlineUsers.find(u => u.userId === recipientId)?.username.charAt(0).toUpperCase()} />
//                     <Box sx={{ maxWidth: '70%' }}>
//                       <Paper sx={{ 
//                         padding: '8px 12px', 
//                         backgroundColor: message.senderId === userId ? '#ffccbc' : '#8e24aa',
//                         color: message.senderId === userId ? '#333' : 'white',
//                         borderRadius: '16px'
//                       }}>
//                         <Typography>{message.text}</Typography>
//                       </Paper>
//                       <Typography variant="caption" sx={{ 
//                         display: 'block', 
//                         textAlign: message.senderId === userId ? 'right' : 'left',
//                         color: '#e1bee7',
//                         marginTop: 0.5
//                       }}>
//                         {message.time}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 ))}
//               </Box>

//               {/* Message input */}
//               <Box sx={{ padding: 2, backgroundColor: 'white', display: 'flex', gap: 1 }}>
//                 <InputBase
//                   placeholder="Type a message..."
//                   value={message}
//                   onChange={(e) => {
//                     setMessage(e.target.value);
//                     handleTyping();
//                   }}
//                   onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//                   sx={{ 
//                     flex: 1, 
//                     backgroundColor: 'white', 
//                     borderRadius: '20px', 
//                     padding: '8px 16px', 
//                     border: '1px solid #d1d1d1' 
//                   }}
//                 />
//                 <IconButton 
//                   onClick={handleSendMessage}
//                   sx={{ backgroundColor: '#26c6da', color: 'white' }}
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
//               color: 'white',
//               textAlign: 'center',
//               padding: 4
//             }}>
//               <Typography variant="h6">
//                 Select a user to start chatting
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </Paper>
//     </Box>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Paper, Avatar, InputBase, IconButton } from '@mui/material';
// import { Search, Send, Paperclip, Smile, LogOut } from 'lucide-react';
// import { io } from 'socket.io-client';

// const SOCKET_URL = "http://localhost:5000";
// const socket = io(SOCKET_URL, { 
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

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
//       {/* Users List */}
// <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//   {sortedUsers.map((user) => (
//     <Box
//       key={user.id} // ✅ Ensure this is unique and defined
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         paddingX: 2,
//         paddingY: 1.5,
//         cursor: 'pointer',
//         '&:hover': {
//           backgroundColor: '#8e24aa',
//           transition: 'background-color 0.3s ease',
//         },
//         backgroundColor: activeUser === user.id ? '#8e24aa' : 'transparent',
//       }}
//       onClick={() => setActiveUser(user.id)}
//     >
//       <Box sx={{ position: 'relative', marginRight: 2 }}>
//         <Avatar 
//           alt={user.username} 
//           sx={{ width: 48, height: 48 }}
//         >
//           {user.username?.charAt(0).toUpperCase()}
//         </Avatar>
//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: 0,
//             right: 0,
//             width: 16,
//             height: 16,
//             borderRadius: '50%',
//             border: '2px solid #6a1b9a',
//             backgroundColor: user.status === 'online' ? '#4caf50' : '#f44336',
//           }}
//         />
//       </Box>
//       <Box sx={{ flexGrow: 1 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
//             {user.username}
//           </Typography>
//           {user.lastMessageTime && (
//             <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//               {user.lastMessageTime}
//             </Typography>
//           )}
//         </Box>
//         {user.lastMessage && (
//           <Typography variant="body2" sx={{ color: '#e1bee7', marginTop: 0.5 }}>
//             {user.lastMessage.length > 25 
//               ? user.lastMessage.substring(0, 25) + '...' 
//               : user.lastMessage}
//           </Typography>
//         )}
//       </Box>
//       {user.unread > 0 && (
//         <Box sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center', 
//           backgroundColor: '#f44336', 
//           borderRadius: '50%', 
//           width: 24, 
//           height: 24 
//         }}>
//           <Typography variant="caption" sx={{ color: 'white' }}>
//             {user.unread}
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   ))}
// </Box>

//       {/* <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
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
//       </Box> */}
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

//   // Handle logout functionality
//   const handleLogout = () => {
  
//     socket.emit("logout", userId);
//         sessionStorage.removeItem("userId");
//         sessionStorage.removeItem("username");
//         localStorage.removeItem("token");
//         window.location.href = "/login"; // Redirect to login page
//   };
//     useEffect(() => {
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
//     socket.emit("register", { userId: storedUserId, username: storedUsername || "Anonymous" });
//     // socket.emit("joinRoom", room);

//     // Socket event listeners
//     const handleRoomMessage = (message) => {
//       setMessages((prev) => [...prev, message]);
//     };

//     const handlePrivateMessage = (message) => {
//       setMessages((prev) => [...prev, message]);
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
//       setOnlineUsers(users.filter((user) => user.userId !== storedUserId));
//     };

//     const handleError = (errorMsg) => {
//       setError(errorMsg);
//       setTimeout(() => setError(null), 5000);
//     };

//     socket.on("roomMessage", handleRoomMessage);
//     socket.on("privateMessage", handlePrivateMessage);
//     socket.on("userTyping", handleUserTyping);
//     socket.on("onlineUsers", handleOnlineUsers);
//     socket.on("error", handleError);

//     // Clean up socket listeners
//     return () => {
//       socket.off("roomMessage", handleRoomMessage);
//       socket.off("privateMessage", handlePrivateMessage);
//       socket.off("userTyping", handleUserTyping);
//       socket.off("onlineUsers", handleOnlineUsers);
//       socket.off("error", handleError);
//     };
//   }, []); // Added userId to dependency array



  
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
//     // loadDirectMessages(newActiveUserId);
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
//                   <Box
//                     sx={{ 
//                       display: 'flex',
//                       alignItems: 'center',
//                       backgroundColor: '#f44336', 
//                       color: 'white', 
//                       fontSize: '0.75rem', 
//                       fontWeight: 'bold', 
//                       cursor: 'pointer', 
//                       padding: '4px 12px', 
//                       borderRadius: '20px',
//                       '&:hover': {
//                         backgroundColor: '#d32f2f'
//                       }
//                     }}
//                     onClick={handleLogout}
//                   >
//                     <LogOut size={14} style={{ marginRight: '4px' }} />
//                     LOGOUT
//                   </Box>
//                 </Box>
//               </Box>

//               <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 3 }}>
//                 {messages.length > 0 ? (
//                   messages.map((message) => (
//                     <Box
//                       key={message.id}
//                       sx={{
//                         display: 'flex',
//                         flexDirection: message.senderId === userId ? 'row-reverse' : 'row',
//                         marginBottom: 3,
//                         alignItems: 'flex-start',
//                       }}
//                     >
//                       <Avatar 
//                         children={message.senderId === userId 
//                           ? username.charAt(0).toUpperCase() 
//                           : activeUserObj.username?.charAt(0).toUpperCase()}
//                         sx={{ width: 40, height: 40, margin: message.senderId === userId ? '0 0 0 8px' : '0 8px 0 0' }} 
//                       />
//                       <Box sx={{ maxWidth: '70%' }}>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0.5 }}>
//                           <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                             {message.senderId === userId ? "You" : activeUserObj.username}
//                           </Typography>
//                           {message.time && (
//                             <Typography variant="caption" sx={{ color: '#e1bee7', marginLeft: 1 }}>
//                               {message.time}
//                             </Typography>
//                           )}
//                         </Box>
//                         <Paper sx={{ 
//                           padding: '8px 12px', 
//                           backgroundColor: message.senderId === userId ? '#ffccbc' : '#8e24aa', 
//                           color: message.senderId === userId ? '#333' : 'white', 
//                           borderRadius: '16px',
//                           boxShadow: 'none',
//                         }}>
//                           <Typography variant="body2">{message.text}</Typography>
//                         </Paper>
//                       </Box>
//                     </Box>
//                   ))
//                 ) : (
//                   <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'center', 
//                     alignItems: 'center', 
//                     height: '100%',
//                     flexDirection: 'column'
//                   }}>
//                     <Typography variant="body1" sx={{ color: '#e1bee7', textAlign: 'center' }}>
//                       No messages yet. Start a conversation!
//                     </Typography>
//                   </Box>
//                 )}
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

// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Paper, Avatar, InputBase, IconButton } from '@mui/material';
// import { Search, Send, Paperclip, Smile, LogOut } from 'lucide-react';
// import { io } from 'socket.io-client';

// const SOCKET_URL = "http://localhost:5000";
// const socket = io(SOCKET_URL, { 
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

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
//   const [recipientId, setRecipientId] = useState(null);
//   const [typingUsers, setTypingUsers] = useState({});
//   const [error, setError] = useState(null);
  
//   // Handle user input for typing notifications
//   const handleInputChange = (e) => {
//     setInput(e.target.value);
    
//     // Emit typing event
//     if (recipientId) {
//       socket.emit("typing", {
//         senderId: userId,
//         receiverId: recipientId,
//         username
//       });
//     }
//   };

//   // Handle logout functionality
//   const handleLogout = () => {
  
//     socket.emit("logout", userId);
//         sessionStorage.removeItem("userId");
//         sessionStorage.removeItem("username");
//         localStorage.removeItem("token");
//         window.location.href = "/login"; // Redirect to login page
//   };
//     useEffect(() => {
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
//     socket.emit("register", { userId: storedUserId, username: storedUsername || "Anonymous" });
//     // socket.emit("joinRoom", room);

//     // Socket event listeners
//     const handleRoomMessage = (message) => {
//       setMessages((prev) => [...prev, message]);
//     };

//     const handlePrivateMessage = (message) => {
//       setMessages((prev) => [...prev, message]);
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
//       setOnlineUsers(users.filter((user) => user.userId !== storedUserId));
//     };

//     const handleError = (errorMsg) => {
//       setError(errorMsg);
//       setTimeout(() => setError(null), 5000);
//     };

//     socket.on("roomMessage", handleRoomMessage);
//     socket.on("privateMessage", handlePrivateMessage);
//     socket.on("userTyping", handleUserTyping);
//     socket.on("onlineUsers", handleOnlineUsers);
//     socket.on("error", handleError);

//     // Clean up socket listeners
//     return () => {
//       socket.off("roomMessage", handleRoomMessage);
//       socket.off("privateMessage", handlePrivateMessage);
//       socket.off("userTyping", handleUserTyping);
//       socket.off("onlineUsers", handleOnlineUsers);
//       socket.off("error", handleError);
//     };
//   }, []); // Added userId to dependency array



  
//   // Handle sending a new message
//   const handleSendMessage = () => {
//     if (input.trim() !== "" && recipientId) {
//       const newMsg = {
//         id: Date.now(), // Unique ID based on timestamp
//         senderId: userId,
//         receiverId: recipientId,
//         text: input,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         isSelf: true
//       };
      
//       // Add to local messages
//       setMessages(prev => [...prev, newMsg]);
      
//       // Update the last message in online users list
//       setOnlineUsers(users => 
//         users.map(user => {
//           if (user.userId === recipientId) {
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
//         receiverId: recipientId,
//         text: input,
//         time: newMsg.time
//       });
      
//       setInput("");
//     }
//   };

//   // Handle changing the active user
//   const handleUserChange = (newActiveUserId) => {
//     setRecipientId(newActiveUserId);
//     // loadDirectMessages(newActiveUserId);
//   };

//   // Find the active user object
//   const activeUserObj = onlineUsers.find(user => user.userId === recipientId) || {};

//   // Check if selected user is typing
//   const isActiveUserTyping = typingUsers[recipientId]?.typing;

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
//             activeUser={recipientId} 
//             setActiveUser={handleUserChange} 
//           />
//         </Box>

//         {/* Chat Area */}
//         <Box sx={{ width: 'calc(100% - 300px)', background: 'linear-gradient(180deg, #6a1b9a 0%, #ab47bc 100%)', display: 'flex', flexDirection: 'column' }}>
//           {recipientId ? (
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
//                   <Box
//                     sx={{ 
//                       display: 'flex',
//                       alignItems: 'center',
//                       backgroundColor: '#f44336', 
//                       color: 'white', 
//                       fontSize: '0.75rem', 
//                       fontWeight: 'bold', 
//                       cursor: 'pointer', 
//                       padding: '4px 12px', 
//                       borderRadius: '20px',
//                       '&:hover': {
//                         backgroundColor: '#d32f2f'
//                       }
//                     }}
//                     onClick={handleLogout}
//                   >
//                     <LogOut size={14} style={{ marginRight: '4px' }} />
//                     LOGOUT
//                   </Box>
//                 </Box>
//               </Box>

//               <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 3 }}>
//                 {messages.length > 0 ? (
//                   messages.map((message) => (
//                     <Box
//                       key={message.id}
//                       sx={{
//                         display: 'flex',
//                         flexDirection: message.senderId === userId ? 'row-reverse' : 'row',
//                         marginBottom: 3,
//                         alignItems: 'flex-start',
//                       }}
//                     >
//                       <Avatar 
//                         children={message.senderId === userId 
//                           ? username.charAt(0).toUpperCase() 
//                           : activeUserObj.username?.charAt(0).toUpperCase()}
//                         sx={{ width: 40, height: 40, margin: message.senderId === userId ? '0 0 0 8px' : '0 8px 0 0' }} 
//                       />
//                       <Box sx={{ maxWidth: '70%' }}>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0.5 }}>
//                           <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
//                             {message.senderId === userId ? "You" : activeUserObj.username}
//                           </Typography>
//                           {message.time && (
//                             <Typography variant="caption" sx={{ color: '#e1bee7', marginLeft: 1 }}>
//                               {message.time}
//                             </Typography>
//                           )}
//                         </Box>
//                         <Paper sx={{ 
//                           padding: '8px 12px', 
//                           backgroundColor: message.senderId === userId ? '#ffccbc' : '#8e24aa', 
//                           color: message.senderId === userId ? '#333' : 'white', 
//                           borderRadius: '16px',
//                           boxShadow: 'none',
//                         }}>
//                           <Typography variant="body2">{message.text}</Typography>
//                         </Paper>
//                       </Box>
//                     </Box>
//                   ))
//                 ) : (
//                   <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'center', 
//                     alignItems: 'center', 
//                     height: '100%',
//                     flexDirection: 'column'
//                   }}>
//                     <Typography variant="body1" sx={{ color: '#e1bee7', textAlign: 'center' }}>
//                       No messages yet. Start a conversation!
//                     </Typography>
//                   </Box>
//                 )}
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

//...tested code
// File: ChatBox.jsx
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
//   InputAdornment,
// } from "@mui/material";
// import { io } from "socket.io-client";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import EmojiPicker from "emoji-picker-react";
// import LogoutDialog from "../components/LogoutDialog";
// import axios from "axios";
// import { useDropzone } from "react-dropzone";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // For the + sign

// const socket = io("http://localhost:5000");

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
//         const response = await axios.post("http://localhost:5000/api/upload", formData, {
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
        
//         {/* Input with "+" sign */}
//         <TextField
//           value={input}
//           onChange={handleInputChange}
//           placeholder="Type a message"
//           fullWidth
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => document.querySelector('input[type="file"]').click()}>
//                   <AddCircleOutlineIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
        
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
//   InputAdornment,
// } from "@mui/material";
// import { io } from "socket.io-client";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import EmojiPicker from "emoji-picker-react";
// import LogoutDialog from "../components/LogoutDialog";
// import axios from "axios";
// import { useDropzone } from "react-dropzone";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import MicIcon from "@mui/icons-material/Mic";
// import StopIcon from "@mui/icons-material/Stop";

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
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioURL, setAudioURL] = useState("");

//   const [mediaRecorder, setMediaRecorder] = useState(null);

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

//   useEffect(() => {
//     if (isRecording) {
//       navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//         const recorder = new MediaRecorder(stream);
//         setMediaRecorder(recorder);

//         recorder.ondataavailable = (e) => {
//           setAudioBlob(e.data);
//           setAudioURL(URL.createObjectURL(e.data));
//         };

//         recorder.start();
//       });
//     } else {
//       mediaRecorder?.stop();
//     }
//   }, [isRecording]);

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     socket.emit("typing", { userId, room, recipientId, chatMode });
//   };

//   const sendMessage = async () => {
//     if (!input.trim() && !audioBlob && files.length === 0) return;

//     const message = {
//       userId,
//       text: input,
//       timestamp: new Date().toISOString(),
//       recipientId: chatMode === "private" ? recipientId : null,
//     };

//     if (audioBlob) {
//       const formData = new FormData();
//       formData.append("audio", audioBlob, "audio.webm");

//       try {
//         const response = await axios.post("http://localhost:3000/api/uploadAudio", formData);
//         message.audio = response.data.fileUrl;
//         setAudioBlob(null); // Reset audio after sending
//       } catch (error) {
//         console.error("Audio upload error:", error);
//       }
//     }

//     if (files.length > 0) {
//       const formData = new FormData();
//       files.forEach((file) => formData.append("files", file));

//       try {
//         const response = await axios.post("http://localhost:3000/api/upload", formData);
//         const uploadedFiles = response.data.files;
//         message.files = uploadedFiles;
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
//                 {msg.audio && (
//                   <Box sx={{ mt: 1 }}>
//                     <audio controls>
//                       <source src={msg.audio} type="audio/webm" />
//                       Your browser does not support the audio element.
//                     </audio>
//                   </Box>
//                 )}
//                 {msg.files &&
//                   msg.files.map((file, idx) => (
//                     <Box key={idx} sx={{ mt: 1 }}>
//                       <a href={file.url} target="_blank" rel="noopener noreferrer">
//                         {file.name}
//                       </a>
//                     </Box>
//                   ))}
//                 <Typography variant="caption" color="text.secondary">
//                   {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                 </Typography>
//               </Box>
//               {msg.userId !== userId && <Avatar>O</Avatar>}
//             </Stack>
//           </Box>
//         ))}
//       </Paper>

//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <IconButton onClick={() => setShowEmojiPicker((prev) => !prev)}>
//           <EmojiEmotionsIcon />
//         </IconButton>
//         {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
//         <TextField
//           fullWidth
//           placeholder="Type a message..."
//           variant="outlined"
//           value={input}
//           onChange={handleInputChange}
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setIsRecording((prev) => !prev)}>
//                   {isRecording ? <StopIcon /> : <MicIcon />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {files.length > 0 && (
//         <Box>
//           <Typography variant="body2">Files:</Typography>
//           {files.map((file, idx) => (
//             <Box key={idx}>
//               <Typography variant="body2">{file.name}</Typography>
//             </Box>
//           ))}
//         </Box>
//       )}

//       <Box
//         {...getRootProps()}
//         sx={{
//           border: "2px dashed gray",
//           borderRadius: 2,
//           padding: 2,
//           textAlign: "center",
//           cursor: "pointer",
//           marginTop: 2,
//         }}
//       >
//         <input {...getInputProps()} />
//         <AddCircleOutlineIcon />
//         <Typography variant="body2">Drag & Drop Files Here</Typography>
//       </Box>

//       {uploadingFiles.length > 0 && <LinearProgress />}
//     </Stack>
//   );
// };

// export default ChatBox;
// ........2

// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Avatar, Paper, InputBase, IconButton } from '@mui/material';
// import { Smile, Send, LogOut } from 'lucide-react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000'); // Replace with your backend URL

// const ChatBox = ({ users, currentUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [recipientId, setRecipientId] = useState(null);
//   const [activeUserObj, setActiveUserObj] = useState({});
//   const [typingStatus, setTypingStatus] = useState({});

//   const userId = currentUser._id; // Assuming currentUser is passed as a prop

//   // Handle input change and emit typing
//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     socket.emit('typing', { senderId: userId, receiverId: recipientId });
//   };

//   // Send message
//   const handleSendMessage = () => {
//     if (!input.trim()) return;
//     const messageData = {
//       text: input,
//       senderId: userId,
//       receiverId: recipientId,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };
//     socket.emit('private_message', messageData);
//     setMessages((prev) => [...prev, { ...messageData, isSelf: true }]);
//     setInput('');
//   };

//   // Handle receiving messages
//   useEffect(() => {
//     socket.on('private_message', (message) => {
//       setMessages((prev) => [...prev, { ...message, isSelf: false }]);
//     });

//     socket.on('typing', ({ senderId, receiverId }) => {
//       if (receiverId === userId) {
//         setTypingStatus((prev) => ({ ...prev, [senderId]: true }));
//         setTimeout(() => {
//           setTypingStatus((prev) => ({ ...prev, [senderId]: false }));
//         }, 3000);
//       }
//     });

//     return () => {
//       socket.off('private_message');
//       socket.off('typing');
//     };
//   }, [userId]);

//   // Select user to chat with
//   const handleUserSelect = (user) => {
//     setRecipientId(user._id);
//     setActiveUserObj(user);
//     setTypingStatus({});
//   };

//   // Logout function placeholder
//   const handleLogout = () => {
//     console.log("Logout clicked");
//   };

//   const isActiveUserTyping = typingStatus[recipientId];

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       {/* Sidebar */}
//       <Box sx={{ width: 250, borderRight: '1px solid #ddd', backgroundColor: '#f3e5f5', padding: 2 }}>
//         <Typography variant="h6" sx={{ marginBottom: 2 }}>
//           All Users
//         </Typography>
//         {users.filter((u) => u._id !== userId).map((user) => (
//           <Box
//             key={user._id}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               padding: 1,
//               borderRadius: 1,
//               cursor: 'pointer',
//               backgroundColor: recipientId === user._id ? '#e1bee7' : 'transparent',
//               '&:hover': {
//                 backgroundColor: '#f8bbd0'
//               }
//             }}
//             onClick={() => handleUserSelect(user)}
//           >
//             <Avatar sx={{ width: 32, height: 32, marginRight: 1 }}>
//               {user.username?.charAt(0).toUpperCase()}
//             </Avatar>
//             <Typography>{user.username}</Typography>
//           </Box>
//         ))}
//       </Box>

//       {/* Chat Box */}
//       <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//         {/* Chat Header */}
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, backgroundColor: '#8e24aa', color: 'white' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Avatar sx={{ width: 40, height: 40, marginRight: 2 }}>
//               {activeUserObj.username?.charAt(0).toUpperCase()}
//             </Avatar>
//             <Box>
//               <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                 {activeUserObj.username || "No User Selected"}
//               </Typography>
//               {isActiveUserTyping && (
//                 <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                   {activeUserObj.username} is typing...
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//           <IconButton onClick={handleLogout} sx={{ color: 'white' }}>
//             <LogOut size={20} />
//           </IconButton>
//         </Box>

//         {/* Messages */}
//         <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
//           {messages
//             .filter(
//               (msg) =>
//                 (msg.senderId === userId && msg.receiverId === recipientId) ||
//                 (msg.senderId === recipientId && msg.receiverId === userId)
//             )
//             .map((msg, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: msg.isSelf ? 'flex-end' : 'flex-start',
//                   marginY: 1
//                 }}
//               >
//                 <Paper
//                   elevation={2}
//                   sx={{
//                     padding: 1,
//                     backgroundColor: msg.isSelf ? '#ab47bc' : '#ce93d8',
//                     color: 'white',
//                     borderRadius: 2,
//                     maxWidth: '70%'
//                   }}
//                 >
//                   <Typography variant="body2">{msg.text}</Typography>
//                   <Typography variant="caption" sx={{ fontSize: '0.7rem', marginTop: 0.5, textAlign: 'right' }}>
//                     {msg.time}
//                   </Typography>
//                 </Paper>
//               </Box>
//             ))}
//         </Box>

//         {/* Chat Input */}
//         <Box sx={{
//           display: 'flex',
//           alignItems: 'center',
//           padding: 2,
//           borderTop: '1px solid rgba(255,255,255,0.1)',
//           backgroundColor: '#7b1fa2'
//         }}>
//           <IconButton>
//             <Smile color="#e1bee7" size={20} />
//           </IconButton>
//           <InputBase
//             placeholder="Type your message..."
//             value={input}
//             onChange={handleInputChange}
//             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//             sx={{
//               flexGrow: 1,
//               backgroundColor: '#f3e5f5',
//               color: '#4a148c',
//               paddingY: 1,
//               paddingX: 2,
//               borderRadius: 2,
//               marginX: 1,
//               fontSize: '0.9rem'
//             }}
//           />
//           <IconButton onClick={handleSendMessage}>
//             <Send color="#e1bee7" size={20} />
//           </IconButton>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ChatBox;


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Avatar,
//   Paper,
//   InputBase,
//   IconButton
// } from '@mui/material';
// import { Smile, Send, LogOut } from 'lucide-react';
// import io from 'socket.io-client';

// const ChatBox = ({ users, currentUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [recipientId, setRecipientId] = useState(null);
//   const [activeUserObj, setActiveUserObj] = useState({});
//   const [typingStatus, setTypingStatus] = useState({});
//   const socketRef = useRef(null);

//   useEffect(() => {
//     // Connect socket only once
//     socketRef.current = io('http://localhost:5000');

//     // Listen for messages
//     socketRef.current.on('private_message', (message) => {
//       setMessages((prev) => [...prev, { ...message, isSelf: false }]);
//     });

//     // Listen for typing
//     socketRef.current.on('typing', ({ senderId, receiverId }) => {
//       if (receiverId === currentUser?._id) {
//         setTypingStatus((prev) => ({ ...prev, [senderId]: true }));
//         setTimeout(() => {
//           setTypingStatus((prev) => ({ ...prev, [senderId]: false }));
//         }, 3000);
//       }
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [currentUser]);

//   const userId = currentUser?._id;
//   if (!userId) return <Typography>Loading...</Typography>;

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     if (recipientId) {
//       socketRef.current.emit('typing', { senderId: userId, receiverId: recipientId });
//     }
//   };

//   const handleSendMessage = () => {
//     if (!input.trim() || !recipientId) return;

//     const messageData = {
//       text: input,
//       senderId: userId,
//       receiverId: recipientId,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };

//     socketRef.current.emit('private_message', messageData);
//     setMessages((prev) => [...prev, { ...messageData, isSelf: true }]);
//     setInput('');
//   };

//   const handleUserSelect = (user) => {
//     setRecipientId(user._id);
//     setActiveUserObj(user);
//     setTypingStatus({});
//   };

//   const handleLogout = () => {
//     console.log("Logout clicked");
//   };

//   const isActiveUserTyping = typingStatus[recipientId];

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       {/* Sidebar */}
//       <Box sx={{ width: 250, borderRight: '1px solid #ddd', backgroundColor: '#f3e5f5', padding: 2 }}>
//         <Typography variant="h6" sx={{ marginBottom: 2 }}>
//           All Users
//         </Typography>
//         {users
//           .filter((u) => u._id !== userId)
//           .map((user) => (
//             <Box
//               key={user._id}
//               onClick={() => handleUserSelect(user)}
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 padding: 1,
//                 borderRadius: 1,
//                 cursor: 'pointer',
//                 backgroundColor: recipientId === user._id ? '#e1bee7' : 'transparent',
//                 '&:hover': {
//                   backgroundColor: '#f8bbd0'
//                 }
//               }}
//             >
//               <Avatar sx={{ width: 32, height: 32, marginRight: 1 }}>
//                 {user.username?.charAt(0).toUpperCase()}
//               </Avatar>
//               <Typography>{user.username}</Typography>
//             </Box>
//           ))}
//       </Box>

//       {/* Chat Area */}
//       <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//         {/* Header */}
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: 2,
//             backgroundColor: '#8e24aa',
//             color: 'white'
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Avatar sx={{ width: 40, height: 40, marginRight: 2 }}>
//               {activeUserObj?.username?.charAt(0).toUpperCase()}
//             </Avatar>
//             <Box>
//               <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                 {activeUserObj?.username || "No User Selected"}
//               </Typography>
//               {isActiveUserTyping && (
//                 <Typography variant="caption" sx={{ color: '#e1bee7' }}>
//                   {activeUserObj.username} is typing...
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//           <IconButton onClick={handleLogout} sx={{ color: 'white' }}>
//             <LogOut size={20} />
//           </IconButton>
//         </Box>

//         {/* Messages */}
//         <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
//           {messages
//             .filter(
//               (msg) =>
//                 (msg.senderId === userId && msg.receiverId === recipientId) ||
//                 (msg.senderId === recipientId && msg.receiverId === userId)
//             )
//             .map((msg, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: msg.isSelf ? 'flex-end' : 'flex-start',
//                   marginY: 1
//                 }}
//               >
//                 <Paper
//                   elevation={2}
//                   sx={{
//                     padding: 1,
//                     backgroundColor: msg.isSelf ? '#ab47bc' : '#ce93d8',
//                     color: 'white',
//                     borderRadius: 2,
//                     maxWidth: '70%'
//                   }}
//                 >
//                   <Typography variant="body2">{msg.text}</Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{ fontSize: '0.7rem', marginTop: 0.5, textAlign: 'right' }}
//                   >
//                     {msg.time}
//                   </Typography>
//                 </Paper>
//               </Box>
//             ))}
//         </Box>

//         {/* Chat Input */}
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             padding: 2,
//             borderTop: '1px solid rgba(255,255,255,0.1)',
//             backgroundColor: '#7b1fa2'
//           }}
//         >
//           <IconButton>
//             <Smile color="#e1bee7" size={20} />
//           </IconButton>
//           <InputBase
//             placeholder="Type your message..."
//             value={input}
//             onChange={handleInputChange}
//             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//             sx={{
//               flexGrow: 1,
//               backgroundColor: '#f3e5f5',
//               color: '#4a148c',
//               paddingY: 1,
//               paddingX: 2,
//               borderRadius: 2,
//               marginX: 1,
//               fontSize: '0.9rem'
//             }}
//           />
//           <IconButton onClick={handleSendMessage}>
//             <Send color="#e1bee7" size={20} />
//           </IconButton>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ChatBox;

//.....3
// import React, { useState, useEffect, useRef } from "react";
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
//   Chip,
//   CircularProgress,
//   Tooltip,
//   Badge,
//   Divider,
//   InputAdornment,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { io } from "socket.io-client";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import SendIcon from "@mui/icons-material/Send";
// import MicIcon from "@mui/icons-material/Mic";
// import StopIcon from "@mui/icons-material/Stop";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import CloseIcon from "@mui/icons-material/Close";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import PersonIcon from "@mui/icons-material/Person";
// import GroupIcon from "@mui/icons-material/Group";
// import LogoutIcon from "@mui/icons-material/Logout";
// // import data from "@emoji-mart/data";
// // import Picker from "@emoji-mart/react";
// // import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import EmojiPicker from "emoji-picker-react";
// import LogoutDialog from "../components/LogoutDialog";
// import axios from "axios";
// import { useDropzone } from "react-dropzone";


// // Fixed the socket connection to use environment variables
// const SOCKET_URL =  "http://localhost:5000";
// const API_URL =  "http://localhost:5000/api";

// // Create a singleton socket instance
// const socket = io(SOCKET_URL, { 
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [username, setUsername] = useState("Anonymous");
//   const [typingUsers, setTypingUsers] = useState({});
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [room, setRoom] = useState("general");
//   const [chatMode, setChatMode] = useState("room"); // 'room' or 'private'
//   const [recipientId, setRecipientId] = useState(""); // For private chat
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [showLogout, setShowLogout] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [audioURL, setAudioURL] = useState("");
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [error, setError] = useState(null);
  
//   const messagesEndRef = useRef(null);
//   const fileInputRef = useRef(null);

//   // Load user data from session storage
//   useEffect(() => {
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
//     socket.emit("register", { userId: storedUserId, username: storedUsername || "Anonymous" });
//     socket.emit("joinRoom", room);

//     // Socket event listeners
//     const handleRoomMessage = (message) => {
//       setMessages((prev) => [...prev, message]);
//     };

//     const handlePrivateMessage = (message) => {
//       setMessages((prev) => [...prev, message]);
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
//       setOnlineUsers(users.filter((user) => user.userId !== storedUserId));
//     };

//     const handleError = (errorMsg) => {
//       setError(errorMsg);
//       setTimeout(() => setError(null), 5000);
//     };

//     socket.on("roomMessage", handleRoomMessage);
//     socket.on("privateMessage", handlePrivateMessage);
//     socket.on("userTyping", handleUserTyping);
//     socket.on("onlineUsers", handleOnlineUsers);
//     socket.on("error", handleError);

//     // Clean up socket listeners
//     return () => {
//       socket.off("roomMessage", handleRoomMessage);
//       socket.off("privateMessage", handlePrivateMessage);
//       socket.off("userTyping", handleUserTyping);
//       socket.off("onlineUsers", handleOnlineUsers);
//       socket.off("error", handleError);
//     };
//   }, [room]);

//   // Audio recording functionality
//   useEffect(() => {
//     if (isRecording) {
//       navigator.mediaDevices.getUserMedia({ audio: true })
//         .then((stream) => {
//           const recorder = new MediaRecorder(stream);
//           const audioChunks = [];
          
//           recorder.ondataavailable = (e) => {
//             audioChunks.push(e.data);
//           };
          
//           recorder.onstop = () => {
//             const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
//             setAudioBlob(audioBlob);
//             setAudioURL(URL.createObjectURL(audioBlob));
//           };
          
//           setMediaRecorder(recorder);
//           recorder.start();
//         })
//         .catch((err) => {
//           setError("Microphone access denied: " + err.message);
//           setIsRecording(false);
//         });
//     } else if (mediaRecorder && mediaRecorder.state !== "inactive") {
//       mediaRecorder.stop();
//     }
    
//     return () => {
//       if (mediaRecorder && mediaRecorder.state !== "inactive") {
//         mediaRecorder.stop();
//       }
//     };
//   }, [isRecording, mediaRecorder]);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
    
//     // Emit typing event with debounce
//     if (e.target.value.trim()) {
//       socket.emit("typing", { 
//         userId, 
//         username,
//         room, 
//         recipientId, 
//         chatMode 
//       });
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim() && !audioBlob && files.length === 0) return;

//     try {
//       setIsUploading(!!files.length || !!audioBlob);
      
//       const message = {
//         userId,
//         username,
//         text: input.trim(),
//         timestamp: new Date().toISOString(),
//         recipientId: chatMode === "private" ? recipientId : null,
//       };

//       // Handle audio uploads
//       if (audioBlob) {
//         const formData = new FormData();
//         formData.append("audio", audioBlob, `audio-${Date.now()}.webm`);

//         try {
//           const response = await axios.post(`${API_URL}/uploadAudio`, formData);
//           message.audio = response.data.fileUrl;
//         } catch (error) {
//           setError("Audio upload failed: " + error.message);
//         } finally {
//           setAudioBlob(null);
//           setAudioURL("");
//         }
//       }

//       // Handle file uploads
//       if (files.length > 0) {
//         const formData = new FormData();
//         files.forEach((file) => formData.append("files", file));

//         try {
//           const response = await axios.post(`${API_URL}/upload`, formData);
//           message.files = response.data.files;
//         } catch (error) {
//           setError("File upload failed: " + error.message);
//         }
//       }

//       // Send message via socket
//       if (chatMode === "room") {
//         socket.emit("sendMessage", { message, room });
//       } else {
//         socket.emit("sendPrivateMessage", message);
//       }

//       // Update local state
//       setMessages((prev) => [...prev, message]);
//       setInput("");
//       setFiles([]);
//       setIsUploading(false);
//     } catch (error) {
//       setError("Failed to send message: " + error.message);
//       setIsUploading(false);
//     }
//   };

//   const handleEmojiClick = (emojiData) => {
//     setInput((prev) => prev + emojiData.native);
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
//     if (newValue === "room") {
//       socket.emit("joinRoom", room);
//     }
//   };

//   const handleLogout = () => {
//     socket.emit("logout", userId);
//     sessionStorage.removeItem("userId");
//     sessionStorage.removeItem("username");
//     localStorage.removeItem("token");
//     window.location.href = "/login"; // Redirect to login page
//   };

//   // File handling
//   const onDrop = (acceptedFiles) => {
//     // Limit to a reasonable number of files
//     const maxFiles = 5;
//     if (files.length + acceptedFiles.length > maxFiles) {
//       setError(`You can only upload up to ${maxFiles} files at once`);
//       return;
//     }
    
//     // Limit file size
//     const maxSize = 10 * 1024 * 1024; // 10MB
//     const validFiles = acceptedFiles.filter(file => file.size <= maxSize);
    
//     if (validFiles.length < acceptedFiles.length) {
//       setError("Some files were too large and have been excluded (10MB max)");
//     }
    
//     setFiles(prev => [...prev, ...validFiles]);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     multiple: true,
//     accept: {
//       'image/*': [],
//       'application/pdf': [],
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
//     },
//     maxSize: 10 * 1024 * 1024, // 10MB
//   });

//   const removeFile = (indexToRemove) => {
//     setFiles(files.filter((_, index) => index !== indexToRemove));
//   };

//   const removeAudio = () => {
//     setAudioBlob(null);
//     setAudioURL("");
//   };

//   const getActiveTypingUsers = () => {
//     return Object.entries(typingUsers)
//       .filter(([, data]) => data.typing)
//       .map(([, data]) => data.username);
//   };
  
//   const activeTypers = getActiveTypingUsers();

//   return (
//     <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
//       {/* Header */}
//       <Box 
//         sx={{ 
//           p: 2, 
//           bgcolor: "primary.dark", 
//           color: "white", 
//           display: "flex", 
//           justifyContent: "space-between",
//           alignItems: "center",
//           borderBottom: "1px solid",
//           borderColor: "divider"
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold">
//           {chatMode === "room" ? `${room} Room` : `Chat with ${recipientId}`}
//         </Typography>
        
//         <Stack direction="row" spacing={1} alignItems="center">
//           <Chip 
//             icon={<PersonIcon />} 
//             label={`${username} (You)`} 
//             color="secondary" 
//             size="small" 
//           />
//           <Tooltip title="Logout">
//             <IconButton color="inherit" onClick={() => setShowLogout(true)}>
//               <LogoutIcon />
//             </IconButton>
//           </Tooltip>
//         </Stack>
//       </Box>

//       {/* Chat mode tabs */}
//       <Tabs 
//         value={chatMode} 
//         onChange={handleChatModeChange} 
//         variant="fullWidth"
//         sx={{ bgcolor: "background.paper" }}
//       >
//         <Tab 
//           label="Room Chat" 
//           value="room" 
//           icon={<GroupIcon />} 
//           iconPosition="start"
//         />
//         <Tab 
//           label="Private Chat" 
//           value="private" 
//           icon={<PersonIcon />} 
//           iconPosition="start"
//         />
//       </Tabs>

//       {/* Room selector or recipient selector */}
//       <Box sx={{ px: 2, py: 1, bgcolor: "background.paper" }}>
//         {chatMode === "room" ? (
//           <FormControl fullWidth size="small">
//             <InputLabel>Chat Room</InputLabel>
//             <Select 
//               value={room} 
//               onChange={handleRoomChange} 
//               label="Chat Room"
//             >
//               <MenuItem value="general">General</MenuItem>
//               <MenuItem value="dev">Developers</MenuItem>
//               <MenuItem value="fun">Fun</MenuItem>
//             </Select>
//           </FormControl>
//         ) : (
//           <FormControl fullWidth size="small">
//             <InputLabel>Select User</InputLabel>
//             <Select 
//               value={recipientId} 
//               onChange={(e) => setRecipientId(e.target.value)} 
//               label="Select User"
//               disabled={onlineUsers.length === 0}
//             >
//               {onlineUsers.length > 0 ? (
//                 onlineUsers.map((user) => (
//                   <MenuItem key={user.userId} value={user.userId}>
//                     {user.username || user.userId}
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No users online</MenuItem>
//               )}
//             </Select>
//           </FormControl>
//         )}
//       </Box>

//       {/* Error display */}
//       {error && (
//         <Box sx={{ px: 2, py: 1, bgcolor: "error.light", color: "error.contrastText" }}>
//           <Typography variant="body2">{error}</Typography>
//         </Box>
//       )}

//       {/* Messages area */}
//       <Box sx={{ 
//         flex: 1, 
//         p: 2, 
//         overflowY: "auto", 
//         display: "flex", 
//         flexDirection: "column", 
//         gap: 2,
//         bgcolor: "grey.50" 
//       }}>
//         {messages.length === 0 ? (
//           <Box sx={{ 
//             display: "flex", 
//             flexDirection: "column", 
//             alignItems: "center", 
//             justifyContent: "center", 
//             height: "100%",
//             opacity: 0.6
//           }}>
//             <Typography variant="body1" color="text.secondary">
//               {chatMode === "room" 
//                 ? "No messages in this room yet. Start the conversation!" 
//                 : "Select a recipient and start a private conversation!"}
//             </Typography>
//           </Box>
//         ) : (
//           messages.map((msg, index) => {
//             const isCurrentUser = msg.userId === userId;
//             const isConsecutive = index > 0 && messages[index - 1].userId === msg.userId;
            
//             return (
//               <Box 
//                 key={index} 
//                 sx={{ 
//                   display: "flex", 
//                   justifyContent: isCurrentUser ? "flex-end" : "flex-start",
//                   mb: isConsecutive ? 0.5 : 1.5,
//                 }}
//               >
//                 {!isCurrentUser && !isConsecutive && (
//                   <Avatar 
//                     sx={{ mr: 1, bgcolor: "secondary.main" }}
//                   >
//                     {msg.username ? msg.username[0].toUpperCase() : "U"}
//                   </Avatar>
//                 )}
                
//                 <Stack 
//                   spacing={0.5} 
//                   sx={{ 
//                     maxWidth: "70%",
//                     alignItems: isCurrentUser ? "flex-end" : "flex-start"
//                   }}
//                 >
//                   {!isConsecutive && (
//                     <Typography 
//                       variant="caption" 
//                       sx={{ 
//                         ml: isCurrentUser ? 0 : 1,
//                         mr: isCurrentUser ? 1 : 0,
//                         fontWeight: "medium"
//                       }}
//                     >
//                       {isCurrentUser ? "You" : (msg.username || msg.userId)}
//                     </Typography>
//                   )}
                  
//                   <Card 
//                     elevation={1} 
//                     sx={{ 
//                       bgcolor: isCurrentUser ? "primary.light" : "background.paper",
//                       color: isCurrentUser ? "primary.contrastText" : "text.primary",
//                       borderRadius: 2,
//                       maxWidth: "100%",
//                     }}
//                   >
//                     <CardContent sx={{ py: 1, px: 2, "&:last-child": { pb: 1 } }}>
//                       {msg.text && (
//                         <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
//                           {msg.text}
//                         </Typography>
//                       )}
                      
//                       {msg.audio && (
//                         <Box sx={{ mt: msg.text ? 1 : 0 }}>
//                           <audio 
//                             controls 
//                             style={{ maxWidth: "100%", height: 40 }}
//                           >
//                             <source src={msg.audio} type="audio/webm" />
//                             Your browser does not support the audio element.
//                           </audio>
//                         </Box>
//                       )}
                      
//                       {msg.files && msg.files.length > 0 && (
//                         <Box sx={{ mt: (msg.text || msg.audio) ? 1 : 0 }}>
//                           <Stack spacing={1}>
//                             {msg.files.map((file, idx) => (
//                               <Button 
//                                 key={idx} 
//                                 variant="outlined"
//                                 size="small"
//                                 startIcon={<AttachFileIcon />}
//                                 href={file.url} 
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 sx={{ 
//                                   textTransform: "none", 
//                                   justifyContent: "flex-start",
//                                   bgcolor: "background.paper",
//                                   color: "text.primary",
//                                 }}
//                               >
//                                 {file.name.length > 20 
//                                   ? `${file.name.substring(0, 20)}...` 
//                                   : file.name}
//                               </Button>
//                             ))}
//                           </Stack>
//                         </Box>
//                       )}
//                     </CardContent>
//                   </Card>
                  
//                   <Typography 
//                     variant="caption" 
//                     color="text.secondary"
//                     sx={{ 
//                       ml: isCurrentUser ? 0 : 1,
//                       mr: isCurrentUser ? 1 : 0,
//                     }}
//                   >
//                     {new Date(msg.timestamp).toLocaleTimeString([], { 
//                       hour: "2-digit", 
//                       minute: "2-digit" 
//                     })}
//                   </Typography>
//                 </Stack>
                
//                 {isCurrentUser && !isConsecutive && (
//                   <Avatar 
//                     sx={{ ml: 1, bgcolor: "primary.main" }}
//                   >
//                     {username ? username[0].toUpperCase() : "M"}
//                   </Avatar>
//                 )}
//               </Box>
//             );
//           })
//         )}
        
//         {activeTypers.length > 0 && (
//           <Box sx={{ pl: 2 }}>
//             <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
//               {activeTypers.length === 1 
//                 ? `${activeTypers[0]} is typing...` 
//                 : `${activeTypers.length} people are typing...`}
//             </Typography>
//           </Box>
//         )}
        
//         <div ref={messagesEndRef} />
//       </Box>

//       {/* File preview area */}
//       {(files.length > 0 || audioURL) && (
//         <Paper 
//           elevation={0} 
//           sx={{ 
//             p: 1.5, 
//             bgcolor: "background.paper",
//             borderTop: "1px solid",
//             borderColor: "divider"
//           }}
//         >
//           <Stack direction="row" spacing={1} flexWrap="wrap">
//             {audioURL && (
//               <Chip
//                 label="Audio recording"
//                 onDelete={removeAudio}
//                 color="secondary"
//                 icon={<MicIcon fontSize="small" />}
//                 sx={{ m: 0.5 }}
//               />
//             )}
            
//             {files.map((file, idx) => (
//               <Chip
//                 key={idx}
//                 label={file.name.length > 15 ? `${file.name.substring(0, 15)}...` : file.name}
//                 onDelete={() => removeFile(idx)}
//                 color="primary"
//                 icon={<AttachFileIcon fontSize="small" />}
//                 sx={{ m: 0.5 }}
//               />
//             ))}
//           </Stack>
//         </Paper>
//       )}

//       {/* Message input area */}
//       <Paper 
//         elevation={3} 
//         sx={{ 
//           p: 2, 
//           bgcolor: "background.paper",
//           borderTop: "1px solid",
//           borderColor: "divider"
//         }}
//       >
//         <Stack direction="row" spacing={1} alignItems="center">
//           <Box sx={{ position: "relative" }}>
//             <IconButton 
//               color="primary" 
//               onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//               disabled={isUploading}
//             >
//               <EmojiEmotionsIcon />
//             </IconButton>
            
//             {showEmojiPicker && (
//               <Box 
//                 sx={{ 
//                   position: "absolute", 
//                   bottom: "100%", 
//                   left: 0, 
//                   zIndex: 10,
//                   boxShadow: 5,
//                   borderRadius: 1,
//                   overflow: "hidden"
//                 }}
//               >
//                 <Box sx={{ position: "absolute", top: 5, right: 5, zIndex: 2 }}>
//                   <IconButton 
//                     size="small" 
//                     onClick={() => setShowEmojiPicker(false)}
//                     sx={{ bgcolor: "background.paper" }}
//                   >
//                     <CloseIcon fontSize="small" />
//                   </IconButton>
//                 </Box>
//                 <Picker 
//                   data={''} 
//                   onEmojiSelect={handleEmojiClick}
//                   theme="light"
//                   set="apple"
//                   previewPosition="none"
//                 />
//               </Box>
//             )}
//           </Box>
          
//           <IconButton 
//             color="primary"
//             onClick={() => fileInputRef.current?.click()}
//             disabled={isUploading}
//           >
//             <AttachFileIcon />
//           </IconButton>
//           <input
//             type="file"
//             multiple
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//             onChange={(e) => {
//               if (e.target.files) {
//                 onDrop(Array.from(e.target.files));
//               }
//               e.target.value = '';
//             }}
//           />
          
//           <TextField
//             fullWidth
//             placeholder={chatMode === "private" && !recipientId 
//               ? "Select a recipient first..." 
//               : "Type a message..."}
//             variant="outlined"
//             value={input}
//             onChange={handleInputChange}
//             onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
//             disabled={isUploading || (chatMode === "private" && !recipientId)}
//             multiline
//             maxRows={3}
//             size="medium"
//             InputProps={{
//               sx: { borderRadius: 3 },
//             }}
//           />
          
//           <IconButton 
//             color={isRecording ? "error" : "primary"} 
//             onClick={() => setIsRecording(!isRecording)}
//             disabled={isUploading}
//           >
//             {isRecording ? <StopIcon /> : <MicIcon />}
//           </IconButton>
          
//           <IconButton 
//             color="primary" 
//             onClick={sendMessage}
//             disabled={(!input.trim() && !audioBlob && files.length === 0) || isUploading || (chatMode === "private" && !recipientId)}
//             sx={{ bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.dark" } }}
//           >
//             {isUploading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
//           </IconButton>
//         </Stack>
//       </Paper>

//       {/* File drop area */}
//       <Box
//         {...getRootProps()}
//         sx={{
//           display: isDragActive ? "flex" : "none",
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           bgcolor: "rgba(0, 0, 0, 0.5)",
//           zIndex: 1000,
//           alignItems: "center",
//           justifyContent: "center",
//           pointerEvents: isDragActive ? "auto" : "none",
//         }}
//       >
//         <input {...getInputProps()} />
//         <Paper 
//           elevation={6} 
//           sx={{ 
//             p: 4, 
//             display: "flex", 
//             flexDirection: "column", 
//             alignItems: "center",
//             borderRadius: 2,
//           }}
//         >
//           <AddCircleOutlineIcon fontSize="large" color="primary" sx={{ mb: 2 }} />
//           <Typography variant="h6" color="primary" fontWeight="bold">
//             Drop files here
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Up to 5 files, 10MB each
//           </Typography>
//         </Paper>
//       </Box>

//       {/* Logout dialog */}
//       <LogoutDialog 
//         open={showLogout} 
//         onClose={() => setShowLogout(false)} 
//         onConfirm={handleLogout} 
//       />
//     </Box>
//   );
// };

// export default ChatBox;



  // // useEffect(() => {
  //   // Get or create user ID from session storage
  //   let storedUserId = sessionStorage.getItem("userId");
  //   const storedUsername = sessionStorage.getItem("username");
    
  //   if (!storedUserId) {
  //     storedUserId = Math.random().toString(36).substring(2, 10);
  //     sessionStorage.setItem("userId", storedUserId);
  //   }
    
  //   setUserId(storedUserId);

  //   if (storedUsername) {
  //     setUsername(storedUsername);
  //   }

  //   // Register with the socket server
  //   socket.emit("register", { 
  //     userId: storedUserId, 
  //     username: storedUsername || "Anonymous" 
  //   });

  //   // Socket event listeners for direct messaging
  //   const handlePrivateMessage = (message) => {
  //     setMessages((prev) => {
  //       // Check if the message is related to the current active conversation
  //       if (
  //         // If we're viewing a chat with the sender
  //         (activeUser === message.senderId) || 
  //         // Or if this is our message to the receiver
  //         (activeUser === message.receiverId && message.senderId === storedUserId)
  //       ) {
  //         return [...prev, {
  //           ...message,
  //           id: Date.now() + Math.random(), // Ensure unique ID
  //           time: message.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //         }];
  //       }
  //       return prev;
  //     });
      
  //     // Update unread count and last message for the sender if it's not the active conversation
  //     if (message.senderId !== storedUserId && message.senderId !== activeUser) {
  //       setOnlineUsers(prev => 
  //         prev.map(user => {
  //           if (user.userId === message.senderId) {
  //             return {
  //               ...user,
  //               unread: (user.unread || 0) + 1,
  //               lastMessage: message.text,
  //               lastMessageTime: message.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //             };
  //           }
  //           return user;
  //         })
  //       );
  //     }
  //   };

  //   const handleUserTyping = ({ userId: typingUserId, username: typingUsername }) => {
  //     if (typingUserId !== storedUserId) {
  //       setTypingUsers((prev) => ({
  //         ...prev,
  //         [typingUserId]: { typing: true, username: typingUsername }
  //       }));
        
  //       // Clear typing indicator after delay
  //       setTimeout(() => {
  //         setTypingUsers((prev) => {
  //           // Only update if the user hasn't started typing again
  //           const updatedUsers = { ...prev };
  //           if (updatedUsers[typingUserId]) {
  //             updatedUsers[typingUserId] = { 
  //               ...updatedUsers[typingUserId],
  //               typing: false 
  //             };
  //           }
  //           return updatedUsers;
  //         });
  //       }, 3000);
  //     }
  //   };

  //   const handleOnlineUsers = (users) => {
  //     // Filter out the current user
  //     const otherUsers = users.filter((user) => user.userId !== storedUserId);
      
  //     // Preserve unread counts and last messages when updating online users
  //     setOnlineUsers(prev => {
  //       return otherUsers.map(newUser => {
  //         const existingUser = prev.find(u => u.userId === newUser.userId);
  //         return {
  //           ...newUser,
  //           status: newUser.status || "online",
  //           userId: newUser.userId || "Anonymous",
  //           unread: existingUser?.unread || 0,
  //           lastMessage: existingUser?.lastMessage || "",
  //           lastMessageTime: existingUser?.lastMessageTime || ""
  //         };
  //       });
  //     });
      
  //     // Set first online user as active if none is selected
  //     if (!activeUser && otherUsers.length > 0) {
  //       setActiveUser(otherUsers[0].userId);
  //       // loadDirectMessages(otherUsers[0].userId);
  //     }
  //   };

  //   const handleError = (errorMsg) => {
  //     setError(errorMsg);
  //     setTimeout(() => setError(null), 5000);
  //   };
    

  //   // Socket event listeners
  //   socket.on("privateMessage", handlePrivateMessage);
  //   socket.on("userTyping", handleUserTyping);
  //   socket.on("onlineUsers", handleOnlineUsers);
  //   socket.on("error", handleError);

  //   // Clean up socket listeners
  //   return () => {
  //     socket.off("privateMessage", handlePrivateMessage);
  //     socket.off("userTyping", handleUserTyping);
  //     socket.off("onlineUsers", handleOnlineUsers);
  //     socket.off("error", handleError);
  //     setMessages([]);
  //   };
    
  // }, [activeUser, userId]);