// //   import React, { useState } from 'react';
// // import { Box, InputBase } from '@mui/material';
// // import { Search } from 'lucide-react';
  
// // function SearchBar({ users, activeUser, setActiveUser }) {
// // const [searchTerm, setSearchTerm] = useState("");
  
// // const filteredUsers = users.filter(user => 
// //   user.username.toLowerCase().includes(searchTerm.toLowerCase())
// // );

// // // Sort users by status first (online users first)
// // const sortedUsers = [...filteredUsers].sort((a, b) => {
// //   if (a.status === b.status) return 0;
// //   return a.status === "online" ? -1 : 1;
// // });

// // return (
// //   <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
  
// // {/* Search Bar */}
// // <Box sx={{ paddingX: 2, marginY: 2 }}>
// //   <Box sx={{ 
// //     display: 'flex', 
// //     alignItems: 'center', 
// //     backgroundColor: '#8e24aa', 
// //     borderRadius: '9999px', 
// //     paddingX: 2, 
// //     paddingY: 1 
// //   }}>
// //     <Search size={20} style={{ color: '#e1bee7' }} />
// //     <InputBase
// //       placeholder="SEARCH"
// //       value={searchTerm}
// //       onChange={(e) => setSearchTerm(e.target.value)}
// //       sx={{ 
// //         color: '#e1bee7', 
// //         fontSize: '0.875rem', 
// //         flexGrow: 1, 
// //         marginLeft: 2,
// //         '& .MuiInputBase-input::placeholder': {
// //           color: '#e1bee7',
// //           opacity: 1
// //         }
// //       }}
// //     />
// //   </Box>
// // </Box>


// //     {/* Users List */}
// //     <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
// //       {sortedUsers.map((user) => (
// //         <Box
// //           key={user.userId}
// //           sx={{
// //             display: 'flex',
// //             alignItems: 'center',
// //             paddingX: 2,
// //             paddingY: 1.5,
// //             cursor: 'pointer',
// //             '&:hover': {
// //               backgroundColor: '#8e24aa',
// //               transition: 'background-color 0.3s ease',
// //             },
// //             backgroundColor: activeUser === user.userId ? '#8e24aa' : 'transparent',
// //           }}
// //           onClick={() => setActiveUser(user.userId)}
// //         >
// //           <Box sx={{ position: 'relative', marginRight: 2 }}>
// //             <Avatar 
// //               alt={user.username} 
// //               sx={{ width: 48, height: 48 }}
// //               // Display first letter of username if no avatar
// //               children={user.username.charAt(0).toUpperCase()}
// //             />
// //             <Box
// //               sx={{
// //                 position: 'absolute',
// //                 bottom: 0,
// //                 right: 0,
// //                 width: 16,
// //                 height: 16,
// //                 borderRadius: '50%',
// //                 border: '2px solid #6a1b9a',
// //                 backgroundColor: user.status === 'online' ? '#4caf50' : '#f44336',
// //               }}
// //             />
// //           </Box>
// //           <Box sx={{ flexGrow: 1 }}>
// //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //               <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>
// //                 {user.username}
// //               </Typography>
// //               {user.lastMessageTime && (
// //                 <Typography variant="caption" sx={{ color: '#e1bee7' }}>
// //                   {user.lastMessageTime}
// //                 </Typography>
// //               )}
// //             </Box>
// //             {user.lastMessage && (
// //               <Typography variant="body2" sx={{ color: '#e1bee7', marginTop: 0.5 }}>
// //                 {user.lastMessage.length > 25 
// //                 ? user.lastMessage.substring(0, 25) + '...' 
// //                 : user.lastMessage}
// //               </Typography>
// //             )}
// //           </Box>
// //           {user.unread > 0 && (
// //             <Box sx={{ 
// //               display: 'flex', 
// //               alignItems: 'center', 
// //               justifyContent: 'center', 
// //               backgroundColor: '#f44336', 
// //               borderRadius: '50%', 
// //               width: 24, 
// //               height: 24 
// //             }}>
// //               <Typography variant="caption" sx={{ color: 'white' }}>
// //                 {user.unread}
// //               </Typography>
// //             </Box>
// //           )}
// //         </Box>
// //       ))}
// //     </Box>
// //   </Box>
// // );
// // }

// // export default SearchBar;

// import React, { useState } from 'react';
// import { Box, InputBase, Avatar, Typography } from '@mui/material';
// import { Search } from 'lucide-react';

// function SearchBar({ users, activeUser, setActiveUser }) {
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

// export default SearchBar;
