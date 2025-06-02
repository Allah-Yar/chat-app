// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import {
//   saveMessage,
//   getMessages,
//   exportChatHistory,
//   clearOldMessages,
//   importChatHistory,
// } from '../storage/chatStorage';
// import { setSharedKey } from '../storage/sharedKey';
// import { generateKey } from '../utils/generateKey';

// const socket = io('http://localhost:3000'); // Replace with your server URL

// const ChatPage = () => {
//   const [message, setMessage] = useState('');
//   const [chats, setChats] = useState([]);
//   const [newKey, setNewKey] = useState('');

//   const loadMessages = async () => {
//     const msgs = await getMessages();
//     setChats(msgs);
//   };

//   const handleSend = async () => {
//     const msg = { text: message, timestamp: new Date().toISOString() };
//     socket.emit('sendMessage', msg);
//     await saveMessage(msg);
//     setChats((prev) => [...prev, msg]);
//     setMessage('');
//   };

//   const handleImport = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       await importChatHistory(file);
//       loadMessages();
//     }
//   };

//   const handleSetKey = () => {
//     setSharedKey(newKey);
//     alert('Shared key set!');
//   };

//   useEffect(() => {
//     loadMessages();
//     clearOldMessages(60); // 60 min expiry

//     socket.on('receiveMessage', async (msg) => {
//       await saveMessage(msg);
//       setChats((prev) => [...prev, msg]);
//     });

//     return () => socket.disconnect();
//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>📩 Local Chat</h2>
//       <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
//         {chats.map((m, i) => (
//           <div key={i}>• {m.text}</div>
//         ))}
//       </div>

//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message..."
//         style={{ width: '100%', marginTop: '10px' }}
//       />
//       <button onClick={handleSend}>Send</button>
//       <button onClick={exportChatHistory} style={{ marginLeft: '10px' }}>
//         Export Chat
//       </button>
//       <input
//         type="file"
//         accept=".json"
//         onChange={handleImport}
//         style={{ display: 'block', marginTop: '10px' }}
//       />

//       <div style={{ marginTop: '20px' }}>
//         <h4>🔐 End-to-End Encryption Key</h4>
//         <input
//           value={newKey}
//           onChange={(e) => setNewKey(e.target.value)}
//           placeholder="Enter shared secret"
//           style={{ width: '60%' }}
//         />
//         <button onClick={handleSetKey}>Set Key</button>
//         <button onClick={() => setNewKey(generateKey())} style={{ marginLeft: '10px' }}>
//           Generate Random Key
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


//...............
  // Get user information from session storage on component mount
  // useEffect(() => {
  //   const userId = sessionStorage.getItem("userId") || recipientId || "Guest";
  //   const email = sessionStorage.getItem("email") ;
  //   const userEmail = email || `${email.toLowerCase()}`;
  //   // Format the name to be proper case (capitalize first letter of each word)
  //   const formattedName = userId.split(' ')
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(' ');
    
  //   // Generate initials from the name (first letter of first and last name)
  //   const nameParts = formattedName.split(' ');
  //   let initials = nameParts[0].charAt(0).toUpperCase();
    
  //   if (nameParts.length > 1) {
  //     initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  //   }
    
  //   setUserData({
  //     name: formattedName,
  //     email: userEmail,
  //     initials: initials
  //   });
  // }, [recipientId]);
  // Get user information from session storage on component mount
  // useEffect(() => {
  //   // Get the actual user ID and email from session storage
  //   const userId = sessionStorage.getItem("userId") || recipientId || "Guest";
  //   const email = sessionStorage.getItem("email");
    
  //   // Use the email from session storage, or create a fallback if it doesn't exist
  //   const userEmail = email || (userId ? `${userId.toLowerCase()}@example.com` : "guest@example.com");
    
  //   // Format the name to be proper case (capitalize first letter of each word)
  //   const formattedName = userId.split(' ')
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(' ');
    
  //   // Generate initials from the name (first letter of first and last name)
  //   const nameParts = formattedName.split(' ');
  //   let initials = nameParts[0].charAt(0).toUpperCase();
    
  //   if (nameParts.length > 1) {
  //     initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  //   }
    
  //   setUserData({
  //     name: formattedName,
  //     email: userEmail,
  //     initials: initials
  //   });
    
  //   console.log("User data loaded:", { userId, email, formattedName, initials });
  // }, [recipientId]);

  //   useEffect(() => {
  //   // Get the logged-in user data from session/local storage
  //   const username = sessionStorage.getItem("username");
  //   const userId = sessionStorage.getItem("userId");
  //   const email = sessionStorage.getItem("email");
    
  //   // Use available data with fallbacks
  //   const displayName = username || userId || recipientId || "Guest";
  //   const userEmail = email || "";
    
  //   // Format the name to be proper case (capitalize first letter of each word)
  //   const formattedName = displayName.split(' ')
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(' ');
    
  //   // Generate initials from the name (first letter of first and last name)
  //   const nameParts = formattedName.split(' ');
  //   let initials = nameParts[0].charAt(0).toUpperCase();
    
  //   if (nameParts.length > 1) {
  //     initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  //   }
    
  //   setUserData({
  //     name: formattedName,
  //     email: userEmail,
  //     initials: initials
  //   });
    
  //   console.log("User data loaded:", { username, userId, email, formattedName, initials });
  // }, [recipientId]);

  //..........................
  // // Navbar.jsx
  // import React, { useState, useContext } from 'react';
  // import {
  //   Box,
  //   Typography,
  //   IconButton,
  //   Badge,
  //   Menu,
  //   MenuItem,
  //   Tooltip,
  //   Switch,
  //   Divider,
  //   useMediaQuery,
  //   useTheme,
  //   alpha,
  //   Button
  // } from '@mui/material';
  
  // import {
  //   Home,
  //   Users,
  //   Settings,
  //   HelpCircle,
  //   FileText,
  //   Search,
  //   Bell,
  //   Moon,
  //   Sun,
  //   ChevronDown,
  //   User,
  //   LogOut,
  //   Menu as MenuIcon
  // } from 'lucide-react';
  // import LogoutIcon from "@mui/icons-material/Logout";
  // import LogoutDialog from "../components/LogoutDialog";
  
  // // Import the ColorModeContext from the App component
  // import { ColorModeContext } from '../App'; // Adjust the path as needed
  
  
  // function Navbar({ activeTab = 'chat', onTabChange, recipientId }) {
  //   const theme = useTheme();
  //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  //   const [anchorEl, setAnchorEl] = useState(null);
  //   const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  //   const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  //   // const [recipientId, setRecipientId] = useState("");
  //   const [showLogout, setShowLogout] = useState(false);
    
  //   // Access the color mode context
  //   const colorMode = useContext(ColorModeContext);
  //   const isDarkMode = theme.palette.mode === 'dark';
  
  //   // Handle profile menu
  //   const handleProfileMenuOpen = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  
  //   const handleProfileMenuClose = () => {
  //     setAnchorEl(null);
  //   };
  
  //   // Handle mobile menu
  //   const handleMobileMenuOpen = (event) => {
  //     setMobileMenuAnchor(event.currentTarget);
  //   };
  
  //   const handleMobileMenuClose = () => {
  //     setMobileMenuAnchor(null);
  //   };
  
  //   // Handle notifications
  //   const handleNotificationsOpen = (event) => {
  //     setNotificationsAnchor(event.currentTarget);
  //   };
  
  //   const handleNotificationsClose = () => {
  //     setNotificationsAnchor(null);
  //   };
  
  //   const handleLogout = () => {
  //     sessionStorage.removeItem("userId");
  //     localStorage.removeItem("token");
  //     window.location.href = "/login"; // Redirect to login page
  //   };
  
  //   // Handle tab change
  //   const handleNavItemClick = (tab) => {
  //     if (onTabChange) {
  //       onTabChange(tab);
  //     }
  //     handleMobileMenuClose();
  //   };
  
  //   // Create gradient based on color mode
  //   const navbarBackground = isDarkMode
  //     ? 'linear-gradient(to right, #4a148c, #6a1b9a)'
  //     : 'linear-gradient(to right, #8e24aa, #6a1b9a)';
  
  //   // Get icon color based on active state
  //   const getIconColor = (tabName) => {
  //     if (activeTab === tabName) {
  //       return theme.palette.secondary.light;
  //     }
  //     return 'white';
  //   };
  
  //   // Get active indicator style
  //   const getActiveStyle = (tabName) => {
  //     if (activeTab === tabName) {
  //       return {
  //         borderBottom: `3px solid ${theme.palette.secondary.light}`,
  //         borderRadius: 0,
  //         paddingBottom: '4px'
  //       };
  //     }
  //     return {};
  //   };
  
  //   return (
  //     <Box sx={{
  //       background: navbarBackground,
  //       px: { xs: 1.5, sm: 2 },
  //       py: 1.5,
  //       display: 'flex',
  //       justifyContent: 'space-between',
  //       alignItems: 'center',
  //       width: '100%',
  //       boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
  //       position: 'sticky',
  //       top: 0,
  //       zIndex: 1100,
  //     }}>
  //       {/* Left Section: Logo/Title */}
  //       <Box sx={{ 
  //         display: 'flex', 
  //         alignItems: 'center', 
  //         gap: 1.5 
  //       }}>
  //         {isMobile && (
  //           <IconButton 
  //             color="inherit" 
  //             edge="start" 
  //             onClick={handleMobileMenuOpen}
  //             sx={{ color: 'white', mr: 1 }}
  //           >
  //             <MenuIcon size={24} />
  //           </IconButton>
  //         )}
          
  //         <Box sx={{
  //           background: `linear-gradient(135deg, ${theme.palette.secondary.light}, #66bb6a)`,
  //           borderRadius: '50%',
  //           padding: 0.8,
  //           display: 'flex',
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           width: 32,
  //           height: 32,
  //           boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  //           transition: 'transform 0.3s',
  //           '&:hover': {
  //             transform: 'scale(1.05)',
  //           }
  //         }}>
  //           <Typography sx={{ 
  //             color: 'white', 
  //             fontSize: '1.2rem', 
  //             lineHeight: 1,
  //             fontWeight: 'bold',
  //           }}>
  //             •••
  //           </Typography>
  //         </Box>
          
  //         <Typography
  //           variant="h6"
  //           sx={{
  //             fontWeight: 'bold',
  //             color: 'white',
  //             fontSize: { xs: '1.2rem', sm: '1.5rem' },
  //             textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
  //             fontFamily: "'Poppins', sans-serif",
  //             display: { xs: 'none', sm: 'block' }
  //           }}
  //         >
  //           familYchaT
  //         </Typography>
  //       </Box>
  
  //       {/* Middle Section: Navigation Icons (hidden on mobile) */}
  //       {!isMobile && (
  //         <Box sx={{ 
  //           display: 'flex', 
  //           gap: { xs: 1, sm: 1.5, md: 2 }, 
  //           alignItems: 'center',
  //           position: 'absolute',
  //           left: '50%',
  //           transform: 'translateX(-50%)'
  //         }}>
  //           <Tooltip title="Home">
  //             <IconButton 
  //               sx={{ 
  //                 color: getIconColor('home'),
  //                 ...getActiveStyle('home'),
  //                 transition: 'all 0.2s'
  //               }} 
  //               size="medium"
  //               onClick={() => handleNavItemClick('home')}
  //             >
  //               <Home size={20} />
  //             </IconButton>
  //           </Tooltip>
            
  //           <Tooltip title="Chat">
  //             <IconButton
  //               sx={{
  //                 color: getIconColor('chat'),
  //                 ...getActiveStyle('chat'),
  //                 transition: 'all 0.2s'
  //               }}
  //               size="medium"
  //               onClick={() => handleNavItemClick('chat')}
  //             >
  //               <Users size={20} />
  //             </IconButton>
  //           </Tooltip>
            
  //           <Tooltip title="Settings">
  //             <IconButton 
  //               sx={{ 
  //                 color: getIconColor('settings'),
  //                 ...getActiveStyle('settings'),
  //                 transition: 'all 0.2s'
  //               }} 
  //               size="medium"
  //               onClick={() => handleNavItemClick('settings')}
  //             >
  //               <Settings size={20} />
  //             </IconButton>
  //           </Tooltip>
            
  //           <Tooltip title="Help">
  //             <IconButton 
  //               sx={{ 
  //                 color: getIconColor('help'),
  //                 ...getActiveStyle('help'),
  //                 transition: 'all 0.2s'
  //               }} 
  //               size="medium"
  //               onClick={() => handleNavItemClick('help')}
  //             >
  //               <HelpCircle size={20} />
  //             </IconButton>
  //           </Tooltip>
            
  //           <Tooltip title="Documents">
  //             <IconButton 
  //               sx={{ 
  //                 color: getIconColor('documents'),
  //                 ...getActiveStyle('documents'),
  //                 transition: 'all 0.2s' 
  //               }} 
  //               size="medium"
  //               onClick={() => handleNavItemClick('documents')}
  //             >
  //               <FileText size={20} />
  //             </IconButton>
  //           </Tooltip>
  //         </Box>
  //       )}
  
  //       {/* Right Section: Action Icons */}
  //       <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1.5 }, alignItems: 'center' }}>
  //         <Tooltip title="Search">
  //           <IconButton 
  //             sx={{ 
  //               color: 'white',
  //               backgroundColor: alpha('#ffffff', 0.1),
  //               '&:hover': {
  //                 backgroundColor: alpha('#ffffff', 0.2),
  //               }
  //             }} 
  //             size="small"
  //           >
  //             <Search size={18} />
  //           </IconButton>
  //         </Tooltip>
          
  //         <Tooltip title="Notifications">
  //           <IconButton 
  //             sx={{ 
  //               color: 'white',
  //               backgroundColor: alpha('#ffffff', 0.1),
  //               '&:hover': {
  //                 backgroundColor: alpha('#ffffff', 0.2),
  //               } 
  //             }} 
  //             size="small"
  //             onClick={handleNotificationsOpen}
  //           >
  //             <Badge 
  //               badgeContent={3} 
  //               color="error" 
  //               sx={{ 
  //                 '& .MuiBadge-badge': {
  //                   backgroundColor: theme.palette.secondary.light,
  //                   border: `2px solid ${theme.palette.primary.dark}`,
  //                 }
  //               }}
  //             >
  //               <Bell size={18} />
  //             </Badge>
  //           </IconButton>
  //         </Tooltip>
          
  //         <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
  //           <IconButton 
  //             onClick={colorMode.toggleColorMode}
  //             sx={{ 
  //               color: 'white',
  //               backgroundColor: alpha('#ffffff', 0.1),
  //               '&:hover': {
  //                 backgroundColor: alpha('#ffffff', 0.2),
  //               }
  //             }} 
  //             size="small"
  //           >
  //             {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
  //           </IconButton>
  //         </Tooltip>
          
  //         <Box 
  //           onClick={handleProfileMenuOpen}
  //           sx={{
  //             display: 'flex',
  //             alignItems: 'center',
  //             cursor: 'pointer',
  //             backgroundColor: alpha('#ffffff', 0.1),
  //             borderRadius: 20,
  //             padding: '4px 8px 4px 4px',
  //             ml: 0.5,
  //             '&:hover': {
  //               backgroundColor: alpha('#ffffff', 0.2),
  //             }
  //           }}
  //         >
  //           <Box 
  //             sx={{
  //               width: 28,
  //               height: 28,
  //               borderRadius: '50%',
  //               backgroundColor: theme.palette.secondary.light,
  //               display: 'flex',
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //               mr: { xs: 0, sm: 1 }
  //             }}
  //           >
  //             <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>
  //               {recipientId ? recipientId.charAt(0).toUpperCase() : 'JD'}
  //             </Typography>
  //           </Box>
            
  //           {!isMobile && (
  //             <>
  //               <Typography sx={{ color: 'white', fontSize: '0.9rem', fontWeight: 500 }}>
  //                 {recipientId ? recipientId : 'John Doe'}
  //               </Typography>
  //               <ChevronDown size={16} color="white" style={{ marginLeft: 4 }} />
  //             </>
  //           )}
  //         </Box>
  //       </Box>
  
  //       {/* Notifications Menu */}
  //       <Menu
  //         anchorEl={notificationsAnchor}
  //         open={Boolean(notificationsAnchor)}
  //         onClose={handleNotificationsClose}
  //         sx={{ mt: 1.5 }}
  //         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
  //         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  //         PaperProps={{
  //           sx: {
  //             width: 320,
  //             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  //             backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
  //             maxHeight: 400,
  //             overflow: 'auto',
  //           }
  //         }}
  //       >
  //         <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
  //           <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', color: isDarkMode ? 'white' : 'inherit' }}>
  //             Notifications
  //           </Typography>
  //         </Box>
          
  //         <MenuItem 
  //           sx={{ 
  //             backgroundColor: alpha(theme.palette.primary.main, 0.1),
  //             '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.15) },
  //             py: 1.5
  //           }} 
  //           onClick={handleNotificationsClose}
  //         >
  //           <Box sx={{ width: '100%' }}>
  //             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
  //               <Typography variant="subtitle2" fontWeight="bold" color={isDarkMode ? 'white' : 'inherit'}>
  //                 New Message
  //               </Typography>
  //               <Typography variant="caption" color="text.secondary">
  //                 2 min ago
  //               </Typography>
  //             </Box>
  //             <Typography variant="body2" noWrap color={isDarkMode ? 'rgba(255,255,255,0.7)' : 'inherit'}>
  //               Sarah sent you a message: "Hey, are you available for..."
  //             </Typography>
  //           </Box>
  //         </MenuItem>
          
  //         <MenuItem sx={{ py: 1.5 }} onClick={handleNotificationsClose}>
  //           <Box sx={{ width: '100%' }}>
  //             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
  //               <Typography variant="subtitle2" fontWeight="bold" color={isDarkMode ? 'white' : 'inherit'}>
  //                 File Shared
  //               </Typography>
  //               <Typography variant="caption" color="text.secondary">
  //                 1 hour ago
  //               </Typography>
  //             </Box>
  //             <Typography variant="body2" noWrap color={isDarkMode ? 'rgba(255,255,255,0.7)' : 'inherit'}>
  //               Mike shared a document with you: "Project Report.pdf"
  //             </Typography>
  //           </Box>
  //         </MenuItem>
          
  //         <MenuItem sx={{ py: 1.5 }} onClick={handleNotificationsClose}>
  //           <Box sx={{ width: '100%' }}>
  //             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
  //               <Typography variant="subtitle2" fontWeight="bold" color={isDarkMode ? 'white' : 'inherit'}>
  //                 Room Invitation
  //               </Typography>
  //               <Typography variant="caption" color="text.secondary">
  //                 Yesterday
  //               </Typography>
  //             </Box>
  //             <Typography variant="body2" noWrap color={isDarkMode ? 'rgba(255,255,255,0.7)' : 'inherit'}>
  //               You've been invited to join "Design Team" room
  //             </Typography>
  //           </Box>
  //         </MenuItem>
          
  //         <Box sx={{ p: 1.5, textAlign: 'center', borderTop: '1px solid', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
  //           <Typography 
  //             sx={{ 
  //               fontSize: '0.875rem', 
  //               color: theme.palette.primary.main, 
  //               cursor: 'pointer',
  //               '&:hover': { textDecoration: 'underline' }
  //             }}
  //           >
  //             See all notifications
  //           </Typography>
  //         </Box>
  //       </Menu>
  
  //       {/* Profile Menu */}
  //       <Menu
  //         anchorEl={anchorEl}
  //         open={Boolean(anchorEl)}
  //         onClose={handleProfileMenuClose}
  //         sx={{ mt: 1.5 }}
  //         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
  //         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  //         PaperProps={{
  //           sx: {
  //             minWidth: 200,
  //             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  //             backgroundColor: isDarkMode ? '#2d2d2d' : 'white'
  //           }
  //         }}
  //       >
  //         <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
  //           <Box 
  //             sx={{
  //               width: 40,
  //               height: 40,
  //               borderRadius: '50%',
  //               backgroundColor: theme.palette.primary.main,
  //               display: 'flex',
  //               alignItems: 'center',
  //               justifyContent: 'center'
  //             }}
  //           >
  //             <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
  //               JD
  //             </Typography>
  //           </Box>
  //           <Box>
  //             <Typography fontWeight="bold" color={isDarkMode ? 'white' : 'inherit'}>
  //               John Doe
  //             </Typography>
  //             <Typography variant="body2" color="text.secondary">
  //               john.doe@example.com
  //             </Typography>
  //           </Box>
  //         </Box>
  
  //         <Divider />
  
  //         <MenuItem onClick={handleProfileMenuClose} sx={{ gap: 1.5, py: 1 }}>
  //           <User size={16} />
  //           <Typography>Profile</Typography>
  //         </MenuItem>
          
  //         <MenuItem onClick={handleProfileMenuClose} sx={{ gap: 1.5, py: 1 }}>
  //           <Settings size={16} />
  //           <Typography>Account Settings</Typography>
  //         </MenuItem>
          
  //         <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  //           <Typography>Dark Mode</Typography>
  //           <Switch 
  //             checked={isDarkMode}
  //             onChange={colorMode.toggleColorMode}
  //             color="secondary"
  //           />
  //         </Box>
  
  //         <Divider />
  
  //         <MenuItem 
  //           onClick={handleProfileMenuClose} 
  //           sx={{ 
  //             color: theme.palette.error.main, 
  //             gap: 1.5, 
  //             py: 1
  //           }}
  //         >
  //           {/* <LogOut size={16} />
  //           <Typography>Logout</Typography> */}
                 
  //                     <Button 
  //                       variant="outlined" 
  //                       color="primary" 
  //                       fullWidth 
  //                       onClick={() => setShowLogout(true)}
  //                       startIcon={<LogoutIcon />}
  //                       sx={{ mt: 2 }}
  //                     >
  //                       Logout
  //                     </Button>
  //         </MenuItem>
  //       </Menu>
  
  //       {/* Mobile Menu */}
  //       <Menu
  //         anchorEl={mobileMenuAnchor}
  //         open={Boolean(mobileMenuAnchor)}
  //         onClose={handleMobileMenuClose}
  //         sx={{ mt: 1.5 }}
  //         transformOrigin={{ horizontal: 'left', vertical: 'top' }}
  //         anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
  //         PaperProps={{
  //           sx: {
  //             width: 200,
  //             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  //             backgroundColor: isDarkMode ? '#2d2d2d' : 'white'
  //           }
  //         }}
  //       >
  //         <MenuItem 
  //           onClick={() => handleNavItemClick('home')}
  //           sx={{ 
  //             backgroundColor: activeTab === 'home' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
  //             color: activeTab === 'home' ? theme.palette.primary.main : 'inherit',
  //             gap: 1.5,
  //             py: 1
  //           }}
  //         >
  //           <Home size={18} />
  //           <Typography>Home</Typography>
  //         </MenuItem>
          
  //         <MenuItem 
  //           onClick={() => handleNavItemClick('chat')}
  //           sx={{ 
  //             backgroundColor: activeTab === 'chat' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
  //             color: activeTab === 'chat' ? theme.palette.primary.main : 'inherit',
  //             gap: 1.5,
  //             py: 1
  //           }}
  //         >
  //           <Users size={18} />
  //           <Typography>Chat</Typography>
  //         </MenuItem>
          
  //         <MenuItem 
  //           onClick={() => handleNavItemClick('settings')}
  //           sx={{ 
  //             backgroundColor: activeTab === 'settings' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
  //             color: activeTab === 'settings' ? theme.palette.primary.main : 'inherit',
  //             gap: 1.5,
  //             py: 1
  //           }}
  //         >
  //           <Settings size={18} />
  //           <Typography>Settings</Typography>
  //         </MenuItem>
          
  //         <MenuItem 
  //           onClick={() => handleNavItemClick('help')}
  //           sx={{ 
  //             backgroundColor: activeTab === 'help' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
  //             color: activeTab === 'help' ? theme.palette.primary.main : 'inherit',
  //             gap: 1.5,
  //             py: 1
  //           }}
  //         >
  //           <HelpCircle size={18} />
  //           <Typography>Help</Typography>
  //         </MenuItem>
          
  //         <MenuItem 
  //           onClick={() => handleNavItemClick('documents')}
  //           sx={{ 
  //             backgroundColor: activeTab === 'documents' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
  //             color: activeTab === 'documents' ? theme.palette.primary.main : 'inherit',
  //             gap: 1.5,
  //             py: 1
  //           }}
  //         >
  //           <FileText size={18} />
  //           <Typography>Documents</Typography>
  //         </MenuItem>
  //       </Menu>
  //          {/* Logout Dialog */}
  //          <LogoutDialog open={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} />
  //     </Box>
  //   );
  // }
  
  // export default Navbar;

  // //.......new design
  // // File: ChatBox.jsx
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
  //   LinearProgress,
  //   InputAdornment,
  //   Chip,
  //   Drawer,
  //   Divider,
  //   Badge,
  //   ThemeProvider,
  //   createTheme,
  //   alpha,
  //   Tooltip,
  //   Slide,
  //   Fade,
  //   useTheme,
  
  // } from "@mui/material";
  // import { io } from "socket.io-client";
  // import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
  // import SendIcon from "@mui/icons-material/Send";
  // import AttachFileIcon from "@mui/icons-material/AttachFile";
  // import PersonIcon from "@mui/icons-material/Person";
  // import GroupIcon from "@mui/icons-material/Group";
  // import LogoutIcon from "@mui/icons-material/Logout";
  // import CloseIcon from "@mui/icons-material/Close";
  // import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
  // import EmojiPicker from "emoji-picker-react";
  // import LogoutDialog from "../components/LogoutDialog";
  // import axios from "axios";
  // import { useDropzone } from "react-dropzone";
  
  // const socket = io("http://localhost:5000");
  
  // // Custom purple theme
  // const purpleTheme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#9c27b0",
  //       light: "#d05ce3",
  //       dark: "#6a0080",
  //       contrastText: "#ffffff",
  //     },
  //     secondary: {
  //       main: "#7b1fa2",
  //       light: "#ae52d4",
  //       dark: "#4a0072",
  //       contrastText: "#ffffff",
  //     },
  //     background: {
  //       default: "#f5f0fa",
  //       paper: "#ffffff",
  //     },
  //     text: {
  //       primary: "#3c0d53",
  //       secondary: "#7c4dff",
  //     },
  //   },
  //   typography: {
  //     fontFamily: "'Poppins', sans-serif",
  //   },
  //   shape: {
  //     borderRadius: 16,
  //   },
  //   shadows: [
  //     "none",
  //     "0px 2px 8px rgba(156, 39, 176, 0.1)",
  //     "0px 4px 12px rgba(156, 39, 176, 0.15)",
  //     "0px 6px 16px rgba(156, 39, 176, 0.2)",
  //     // ...rest of shadows
  //   ],
  //   components: {
  //     MuiButton: {
  //       styleOverrides: {
  //         root: {
  //           borderRadius: 25,
  //           textTransform: "none",
  //           fontWeight: 600,
  //         },
  //       },
  //     },
  //     MuiTextField: {
  //       styleOverrides: {
  //         root: {
  //           "& .MuiOutlinedInput-root": {
  //             borderRadius: 25,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  
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
  //   const [showDrawer, setShowDrawer] = useState(false);
  //   const messagesEndRef = useRef(null);
  
  //   const theme = useTheme();
  //   const isDarkMode = theme.palette.mode === 'dark';
  
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
  
  //   // Scroll to bottom when messages update
  //   useEffect(() => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, [messages]);
  
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
  //         setUploadingFiles(files.map(file => ({ file, progress: 0 })));
          
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
  
  //   const handleKeyPress = (e) => {
  //     if (e.key === 'Enter' && !e.shiftKey) {
  //       e.preventDefault();
  //       sendMessage();
  //     }
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
  
  //   const removeFile = (indexToRemove) => {
  //     setFiles(files.filter((_, index) => index !== indexToRemove));
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
  
  //   // Helper function to get message style based on sender
  //   const getMessageStyle = (msgUserId) => {
  //     const isOwnMessage = msgUserId === userId;
      
  //     return {
  //       alignSelf: isOwnMessage ? "flex-end" : "flex-start",
  //       backgroundColor: isOwnMessage 
  //         ? alpha(purpleTheme.palette.primary.main, 0.15)
  //         : alpha(purpleTheme.palette.secondary.main, 0.1),
  //       color: isOwnMessage 
  //         ? purpleTheme.palette.primary.dark
  //         : purpleTheme.palette.secondary.dark,
  //       borderRadius: isOwnMessage 
  //         ? "18px 18px 4px 18px"
  //         : "18px 18px 18px 4px",
  //       maxWidth: "75%",
  //       padding: "12px 16px",
  //       margin: "4px 0",
  //       boxShadow: isOwnMessage 
  //         ? "0 2px 5px rgba(156, 39, 176, 0.2)"
  //         : "0 2px 5px rgba(123, 31, 162, 0.1)",
  //     };
  //   };
  
  //   // Get avatar color based on user ID
  //   const getAvatarColor = (id) => {
  //     const colors = [
  //       "#9c27b0", // Main purple
  //       "#7b1fa2", // Dark purple
  //       "#ba68c8", // Light purple
  //       "#6a1b9a", // Deep purple
  //       "#8e24aa", // Mid purple
  //     ];
      
  //     // Simple hash function to pick a color
  //     const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  //     return colors[hash % colors.length];
  //   };
  
  //   return (
  //     <ThemeProvider theme={purpleTheme}>
  //        <Box sx={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //       height: 'calc(100vh - 64px)', // Adjust based on your navbar height
  //       backgroundColor: theme.palette.background.default,
        
  //       padding: 2,
  //     }}>
  //       <Paper
  //         elevation={3}
  //         sx={{
  //           flex: 1,
  //           display: 'flex',
  //           flexDirection: 'column',
  //           backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            
  //           borderRadius: 2,
  //           overflow: 'hidden',
  //         }}
  //       >
  //       <Box sx={{ 
  //         height: "100vh", 
  //         display: "flex", 
  //         flexDirection: "column",
  //         bgcolor: "background.default",
  //         backgroundColor: theme.palette.background.default,
  //         position: "relative",
  //         overflow: "hidden"
  //       }}>
         
  //         {/* App Bar */}
  //         <Box sx={{ 
  //           bgcolor: "primary.main",
  //           color: "white",
  //           p: 2,
  //           display: "flex",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //           borderBottomLeftRadius: 20,
  //           borderBottomRightRadius: 20,
  //           boxShadow: 3,
  //         }}>
  //           <Typography variant="h5" fontWeight="bold">
  //             {chatMode === "room" ? 
  //               `${room.charAt(0).toUpperCase() + room.slice(1)} Room` : 
  //               `Chat with ${recipientId}`
  //             }
  //           </Typography>
            
  //           <Stack direction="row" spacing={1}>
  //             <Tooltip title="Settings">
  //               <IconButton 
  //                 color="inherit" 
  //                 onClick={() => setShowDrawer(true)}
  //                 sx={{ bgcolor: alpha("#ffffff", 0.2) }}
  //               >
  //                 {chatMode === "room" ? <GroupIcon /> : <PersonIcon />}
  //               </IconButton>
  //             </Tooltip>
              
  //             <Tooltip title="Logout">
  //               <IconButton 
  //                 color="inherit" 
  //                 onClick={() => setShowLogout(true)}
  //                 sx={{ bgcolor: alpha("#ffffff", 0.2) }}
  //               >
  //                 <LogoutIcon />  
  //               </IconButton>
  //             </Tooltip>
  //           </Stack>
  //         </Box>
  
  //         {/* Main Chat Area */}
  //         <Box sx={{ 
  //           flexGrow: 1, 
  //           p: 2, 
  //           overflowY: "auto",
  //           display: "flex",
  //           flexDirection: "column",
            
  //           gap: 1,
  //         }}>
  //           {messages.map((msg, index) => (
  //             <Fade 
  //               key={index} 
  //               in={true} 
  //               timeout={300} 
  //               style={{ 
  //                 transitionDelay: `${index % 5 * 50}ms`,
  //                 alignSelf: msg.userId === userId ? "flex-end" : "flex-start",
  //                 maxWidth: "80%",
  //               }}
  //             >
  //               <Box>
  //                 <Box 
  //                   sx={{ 
  //                     display: "flex", 
  //                     flexDirection: "row", 
  //                     alignItems: "flex-end",
  //                     gap: 1,
  //                     mb: 0.5, 
  //                     ...(msg.userId === userId ? { flexDirection: "row-reverse" } : {})
  //                   }}
  //                 >
  //                   <Avatar 
  //                     sx={{ 
  //                       width: 36, 
  //                       height: 36,
  //                       bgcolor: getAvatarColor(msg.userId),
  //                       boxShadow: 1,
  //                     }}
  //                   >
  //                     {msg.userId === userId ? "Me" : msg.userId.charAt(0).toUpperCase()}
  //                   </Avatar>
                    
  //                   <Box sx={getMessageStyle(msg.userId)}>
  //                     <Typography variant="body1" sx={{color: '#fff'}}>{msg.text}</Typography>
                      
  //                     {msg.files && msg.files.length > 0 && (
  //                       <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
  //                         {msg.files.map((file, idx) => (
  //                           <Box 
  //                             key={idx} 
  //                             sx={{
  //                               display: "flex",
  //                               alignItems: "center",
  //                               gap: 1,
  //                               p: 1,
  //                               borderRadius: 2,
  //                               bgcolor: alpha("#ffffff", 0.5),
  //                             }}
  //                           >
  //                             <InsertDriveFileIcon color="primary" />
  //                             <a 
  //                               href={file.url} 
  //                               target="_blank" 
  //                               rel="noopener noreferrer"
  //                               style={{ 
  //                                 color: purpleTheme.palette.primary.dark,
  //                                 textDecoration: "none",
  //                                 fontWeight: 500,
  //                               }}
  //                             >
  //                               {file.name}
  //                             </a>
  //                           </Box>
  //                         ))}
  //                       </Box>
  //                     )}
                      
  //                     <Typography 
  //                       variant="caption" 
  //                       sx={{ 
  //                         display: "block", 
  //                         mt: 0.5,
  //                         opacity: 0.7,
  //                         fontSize: "0.7rem",
  //                         color: '#fff'
  //                       }}
  //                     >
  //                       {new Date(msg.timestamp).toLocaleTimeString([], { 
  //                         hour: "2-digit", 
  //                         minute: "2-digit" 
  //                       })}
  //                     </Typography>
  //                   </Box>
  //                 </Box>
  //               </Box>
  //             </Fade>
  //           ))}
  
  //           {/* Typing indicators */}
  //           {Object.keys(typingUsers).map(
  //             (typingUserId) =>
  //               typingUsers[typingUserId] && (
  //                 <Box 
  //                   key={typingUserId}
  //                   sx={{ 
  //                     display: "flex", 
  //                     alignItems: "center", 
  //                     gap: 1,
  //                     alignSelf: "flex-start",
  //                     mt: 1,
  //                   }}
  //                 >
  //                   <Avatar 
  //                     sx={{ 
  //                       width: 32, 
  //                       height: 32,
  //                       bgcolor: getAvatarColor(typingUserId),
  //                     }}
  //                   >
  //                     {typingUserId.charAt(0).toUpperCase()}
  //                   </Avatar>
  //                   <Box sx={{
  //                     display: "flex",
  //                     alignItems: "center",
  //                     p: 1,
  //                     borderRadius: 5,
  //                     bgcolor: alpha(purpleTheme.palette.primary.light, 0.1),
  //                   }}>
  //                     <Typography variant="body2" sx={{ color: "text.secondary" }}>
  //                       typing
  //                       <span className="typing-animation">...</span>
  //                     </Typography>
  //                   </Box>
  //                 </Box>
  //               )
  //           )}
            
  //           {/* Invisible element to scroll to */}
  //           <div ref={messagesEndRef} />
  //         </Box>
  
  //         {/* File upload preview */}
  //         {files.length > 0 && (
  //           <Slide direction="up" in={files.length > 0}>
  //             <Paper 
  //               elevation={3} 
  //               sx={{ 
  //                 m: 2,
  //                 p: 2,
  //                 borderRadius: 3,
  //                 bgcolor: alpha(purpleTheme.palette.primary.light, 0.08),
  //                 border: `1px solid ${alpha(purpleTheme.palette.primary.main, 0.2)}`,
  //               }}
  //             >
  //               <Typography variant="subtitle2" color="primary.main" fontWeight="bold" mb={1}>
  //                 Files to upload ({files.length})
  //               </Typography>
                
  //               <Stack spacing={1}>
  //                 {files.map((file, idx) => (
  //                   <Box 
  //                     key={idx} 
  //                     sx={{ 
  //                       display: "flex", 
  //                       justifyContent: "space-between", 
  //                       alignItems: "center",
  //                       p: 1,
  //                       borderRadius: 2,
  //                       bgcolor: "background.paper",
  //                     }}
  //                   >
  //                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
  //                       <InsertDriveFileIcon color="primary" />
  //                       <Typography variant="body2" noWrap sx={{ maxWidth: "200px" }}>
  //                         {file.name}
  //                       </Typography>
  //                     </Box>
                      
  //                     {uploadingFiles.some((upload) => upload.file.name === file.name) ? (
  //                       <Box sx={{ width: "40%", ml: 2 }}>
  //                         <LinearProgress 
  //                           variant="determinate" 
  //                           value={uploadingFiles.find((upload) => upload.file.name === file.name)?.progress || 0}
  //                           color="secondary"
  //                           sx={{ borderRadius: 5, height: 6 }}
  //                         />
  //                       </Box>
  //                     ) : (
  //                       <IconButton 
  //                         size="small" 
  //                         onClick={() => removeFile(idx)}
  //                         sx={{ color: "text.secondary" }}
  //                       >
  //                         <CloseIcon fontSize="small" />
  //                       </IconButton>
  //                     )}
  //                   </Box>
  //                 ))}
  //               </Stack>
  //             </Paper>
  //           </Slide>
  //         )}
  
  //         {/* Message Input Area */}
  //         <Paper 
  //           elevation={4}
  //           sx={{ 
  //             p: 2, 
  //             borderTopLeftRadius: 20,
  //             borderTopRightRadius: 20,
  //             bgcolor: "background.paper",
  //             position: "relative",
  //           }}
  //         >
  //           {/* Hidden dropzone area */}
  //           <Box 
  //             {...getRootProps()} 
  //             sx={{ 
  //               position: "absolute", 
  //               top: 0, 
  //               left: 0, 
  //               right: 0, 
  //               bottom: 0, 
  //               opacity: 0,
  //               cursor: "pointer"
  //             }}
  //           >
  //             <input {...getInputProps()} />
  //           </Box>
            
  //           <Stack direction="row" spacing={1} alignItems="center">
  //             <IconButton 
  //               onClick={() => setShowEmojiPicker(!showEmojiPicker)}
  //               sx={{ 
  //                 bgcolor: alpha(purpleTheme.palette.primary.main, 0.1),
  //                 "&:hover": {
  //                   bgcolor: alpha(purpleTheme.palette.primary.main, 0.2),
  //                 }
  //               }}
  //             >
  //               <EmojiEmotionsIcon color="primary" />
  //             </IconButton>
              
  //             <IconButton 
  //               onClick={() => document.querySelector('input[type="file"]').click()}
  //               sx={{ 
  //                 bgcolor: alpha(purpleTheme.palette.primary.main, 0.1),
  //                 "&:hover": {
  //                   bgcolor: alpha(purpleTheme.palette.primary.main, 0.2),
  //                 }
  //               }}
  //             >
  //               <Badge 
  //                 badgeContent={files.length} 
  //                 color="secondary"
  //                 invisible={files.length === 0}
  //               >
  //                 <AttachFileIcon color="primary" />
  //               </Badge>
  //             </IconButton>
              
  //             <TextField
  //               value={input}
  //               onChange={handleInputChange}
  //               onKeyPress={handleKeyPress}
  //               placeholder={`Message ${chatMode === 'room' ? room : recipientId}...`}
  //               fullWidth
  //               multiline
  //               maxRows={3}
  //               variant="outlined"
  //               InputProps={{
  //                 sx: { 
  //                   bgcolor: alpha(purpleTheme.palette.primary.main, 0.05),
  //                   "&:hover": {
  //                     bgcolor: alpha(purpleTheme.palette.primary.main, 0.08),
  //                   },
  //                   "& .MuiOutlinedInput-notchedOutline": {
  //                     borderColor: alpha(purpleTheme.palette.primary.main, 0.2),
  //                   },
  //                 }
  //               }}
  //             />
              
  //             <Button 
  //               variant="contained" 
  //               color="primary"
  //               endIcon={<SendIcon />}
  //               onClick={sendMessage}
  //               sx={{ 
  //                 height: "52px",
  //                 width: "100px",
  //                 boxShadow: 2,
  //               }}
  //             >
  //               Send
  //             </Button>
  //           </Stack>
            
  //           {/* Emoji Picker Popover */}
  //           {showEmojiPicker && (
  //             <Box 
  //               sx={{ 
  //                 position: "absolute", 
  //                 bottom: "80px", 
  //                 left: "20px", 
  //                 zIndex: 1200,
  //                 boxShadow: 4,
  //                 borderRadius: 2,
  //                 overflow: "hidden",
  //               }}
  //             >
  //               <EmojiPicker onEmojiClick={handleEmojiClick} />
  //             </Box>
  //           )}
  //         </Paper>
  //       </Box>
  
  //       {/* Settings Drawer */}
  //       <Drawer
  //         anchor="right"
  //         open={showDrawer}
  //         onClose={() => setShowDrawer(false)}
  //         PaperProps={{
  //           sx: { 
  //             width: 320,
  //             // bgcolor: "background.default",
  //             backgroundColor: isDarkMode ? '#2d2d2d' : 'background.default',
  //             color: isDarkMode ? 'inherit' : '#fff',
  //             p: 2,
  //           }
  //         }}
  //       >
  //         <Typography variant="h6" color="primary" fontWeight="bold" mb={2} sx={{ color: isDarkMode ? 'inherit' : 'primary' }}>
  //           Chat Settings
  //         </Typography>
          
  //         <Divider sx={{ mb: 3 }} />
          
  //         <Tabs 
  //           value={chatMode} 
  //           onChange={handleChatModeChange} 
  //           variant="fullWidth"
  //           sx={{
  //             mb: 3,
  //             "& .MuiTabs-indicator": {
  //               backgroundColor: "primary.main",
  //               height: 3,
  //               borderRadius: 5,
  //             },
  //             "& .MuiTab-root": {
  //               borderRadius: 2,
  //               "&.Mui-selected": {
  //                 color: "primary.main",
  //                 fontWeight: "bold",
  //               },
  //             },
  //           }}
  //         >
  //           <Tab 
  //             label="Room Chat" 
  //             value="room"
  //             icon={<GroupIcon />}
  //             iconPosition="start"
  //           />
  //           <Tab 
  //             label="Private Chat" 
  //             value="private" 
  //             icon={<PersonIcon />}
  //             iconPosition="start"
  //           />
  //         </Tabs>
  
  //         {chatMode === "room" ? (
  //           <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
  //             <InputLabel id="room-select-label">Chat Room</InputLabel>
  //             <Select
  //               labelId="room-select-label"
  //               value={room}
  //               onChange={handleRoomChange}
  //               label="Chat Room"
  //               sx={{
  //                 borderRadius: 3,
  //                 color: 'primary.main',
  //                 "& .MuiOutlinedInput-notchedOutline": {
  //                   borderColor: alpha(purpleTheme.palette.primary.main, 0.3),
  //                 },
  //               }}
  //             >
  //               <MenuItem value="general">General Discussion</MenuItem>
  //               <MenuItem value="dev">Developers Hub</MenuItem>
  //               <MenuItem value="fun">Fun & Off-topic</MenuItem>
  //             </Select>
  //           </FormControl>
  //         ) : (
  //           <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
  //             <InputLabel id="user-select-label">Select User</InputLabel>
  //             <Select
  //               labelId="user-select-label"
  //               value={recipientId}
  //               onChange={(e) => setRecipientId(e.target.value)}
  //               label="Select User"
  //               sx={{
  //                 borderRadius: 3,
  //                 "& .MuiOutlinedInput-notchedOutline": {
  //                   borderColor: alpha(purpleTheme.palette.primary.main, 0.3),
  //                 },
  //               }}
  //             >