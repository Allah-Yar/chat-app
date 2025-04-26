// import React, { useState } from 'react';
// import { 
//   Paper, 
//   List, 
//   ListItem, 
//   ListItemAvatar, 
//   ListItemText, 
//   Avatar, 
//   Typography, 
//   Box,
//   IconButton,
//   InputBase
// } from '@mui/components/ui/alert';
// import { Search, MoreVert } from 'lucide-react';

// export default function MessengerUserBar() {
//   // Sample users data with online status
//   const [users, setUsers] = useState([
//     { id: 1, name: "Emma Wilson", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 2, name: "James Johnson", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 3, name: "Olivia Martinez", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 20m ago" },
//     { id: 4, name: "Noah Thompson", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 1h ago" },
//     { id: 5, name: "Sophia Davis", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 6, name: "Liam Miller", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 2h ago" }
//   ]);

//   // Sort users by status (online first)
//   const sortedUsers = [...users].sort((a, b) => {
//     if (a.status === b.status) return 0;
//     return a.status === "online" ? -1 : 1;
//   });

//   return (
//     <Paper className="w-64 h-96 bg-gray-50 rounded-lg overflow-hidden shadow-md">
//       {/* Header */}
//       <Box className="p-3 bg-blue-600 text-white flex justify-between items-center">
//         <Typography variant="h6" className="font-medium">Contacts</Typography>
//         <IconButton size="small" className="text-white">
//           <MoreVert size={20} />
//         </IconButton>
//       </Box>
      
//       {/* Search bar */}
//       <Box className="p-2 bg-gray-100 flex items-center">
//         <Box className="flex rounded bg-white p-1 w-full items-center">
//           <Search size={18} className="mx-2 text-gray-500" />
//           <InputBase
//             placeholder="Search contacts..."
//             className="ml-1 flex-grow text-sm"
//           />
//         </Box>
//       </Box>
      
//       {/* Users list */}
//       <List className="overflow-y-auto h-72">
//         {sortedUsers.map((user) => (
//           <ListItem 
//             key={user.id} 
//             className="hover:bg-gray-100 cursor-pointer transition-colors px-3 py-2"
//           >
//             <ListItemAvatar className="relative min-w-fit">
//               <Avatar 
//                 src={user.avatar} 
//                 alt={user.name}
//                 className="h-10 w-10"
//               />
//               {/* Status indicator */}
//               <Box 
//                 className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
//                   ${user.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}
//               />
//             </ListItemAvatar>
//             <ListItemText 
//               primary={user.name}
//               primaryTypographyProps={{ className: "text-sm font-medium" }}
//               secondary={user.lastSeen} 
//               secondaryTypographyProps={{ className: "text-xs text-gray-500" }}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Paper>
//   );
// }

// import React, { useState } from 'react';
// import { 
//   Paper, 
//   List, 
//   ListItem, 
//   ListItemAvatar, 
//   ListItemText, 
//   Avatar, 
//   Typography, 
//   Box,
//   IconButton,
//   InputBase
// } from '@mui/material';
// import { Search, MoreVertical } from 'lucide-react';

// export default function MessengerUserBar() {
//   // Sample users data
//   const [users] = useState([
//     { id: 1, name: "Emma Wilson", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 2, name: "James Johnson", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 3, name: "Olivia Martinez", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 20m ago" },
//     { id: 4, name: "Noah Thompson", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 1h ago" },
//     { id: 5, name: "Sophia Davis", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 6, name: "Liam Miller", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 2h ago" }
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');

//   // First filter by search, then sort by status
//   const filteredAndSortedUsers = users
//     .filter(user =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (a.status === b.status) return 0;
//       return a.status === "online" ? -1 : 1;
//     });

//   return (
//     <Paper className="w-64 h-96 bg-gray-50 rounded-lg overflow-hidden shadow-md">
//       {/* Header */}
//       <Box className="p-3 bg-blue-600 text-white flex justify-between items-center">
//         <Typography variant="h6" className="font-medium">Contacts</Typography>
//         <IconButton size="small" className="text-white">
//           <MoreVertical size={20} />
//         </IconButton>
//       </Box>
      
//       {/* Search bar */}
//       <Box className="p-2 bg-gray-100 flex items-center">
//         <Box className="flex rounded bg-white p-1 w-full items-center">
//           <Search size={18} className="mx-2 text-gray-500" />
//           <InputBase
//             placeholder="Search contacts..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="ml-1 flex-grow text-sm"
//           />
//         </Box>
//       </Box>
      
//       {/* Users list */}
//       <List className="overflow-y-auto h-72">
//         {filteredAndSortedUsers.map((user) => (
//           <ListItem 
//             key={user.id} 
//             className="hover:bg-gray-100 cursor-pointer transition-colors px-3 py-2"
//           >
//             <ListItemAvatar className="relative min-w-fit">
//               <Avatar 
//                 src={user.avatar} 
//                 alt={user.name}
//                 className="h-10 w-10"
//               />
//               {/* Status indicator */}
//               <Box 
//                 className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
//                   ${user.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}
//               />
//             </ListItemAvatar>
//             <ListItemText 
//               primary={user.name}
//               primaryTypographyProps={{ className: "text-sm font-medium" }}
//               secondary={user.lastSeen}
//               secondaryTypographyProps={{ className: "text-xs text-gray-500" }}
//             />
//           </ListItem>
//         ))}

//         {/* If no users match */}
//         {filteredAndSortedUsers.length === 0 && (
//           <Box className="p-4 text-center text-gray-500 text-sm">
//             No contacts found.
//           </Box>
//         )}
//       </List>
//     </Paper>
//   );
// }

// import React, { useState } from 'react';
// import { 
//   Paper, 
//   List, 
//   ListItem, 
//   ListItemAvatar, 
//   ListItemText, 
//   Avatar, 
//   Typography, 
//   Box,
//   IconButton,
//   InputBase
// } from '@mui/material';
// import { Search, MoreVertical } from 'lucide-react';

// export default function MessengerUserBar() {
//   const [users] = useState([
//     { id: 1, name: "Emma Wilson", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 2, name: "James Johnson", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 3, name: "Olivia Martinez", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 20m ago" },
//     { id: 4, name: "Noah Thompson", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 1h ago" },
//     { id: 5, name: "Sophia Davis", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 6, name: "Liam Miller", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 2h ago" }
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredAndSortedUsers = users
//     .filter(user =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (a.status === b.status) return 0;
//       return a.status === "online" ? -1 : 1;
//     });

//   return (
//     <Paper 
//       elevation={3}
//       sx={{
//         width: 260,
//         height: 384,
//         bgcolor: 'grey.50',
//         borderRadius: 2,
//         overflow: 'hidden',
//         display: 'flex',
//         flexDirection: 'column'
//       }}
//     >
//       {/* Header */}
//       <Box 
//         sx={{
//           p: 2,
//           bgcolor: 'primary.main',
//           color: 'white',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         }}
//       >
//         <Typography variant="h6" sx={{ fontWeight: 500, fontSize: 18 }}>Contacts</Typography>
//         <IconButton size="small" sx={{ color: 'white' }}>
//           <MoreVertical size={20} />
//         </IconButton>
//       </Box>

//       {/* Search bar */}
//       <Box sx={{ p: 1, bgcolor: 'grey.100' }}>
//         <Box 
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             bgcolor: 'white',
//             p: 0.5,
//             borderRadius: 1
//           }}
//         >
//           <Search size={18} style={{ marginLeft: 8, marginRight: 8, color: '#9e9e9e' }} />
//           <InputBase
//             placeholder="Search contacts..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             sx={{ flexGrow: 1, fontSize: 14 }}
//           />
//         </Box>
//       </Box>

//       {/* Users list */}
//       <List sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
//         {filteredAndSortedUsers.map((user) => (
//           <ListItem 
//             key={user.id}
//             button
//             sx={{
//               '&:hover': { bgcolor: 'grey.100' },
//               transition: 'background-color 0.3s',
//               px: 2,
//               py: 1
//             }}
//           >
//             <ListItemAvatar sx={{ position: 'relative', minWidth: 'fit-content', mr: 2 }}>
//               <Avatar 
//                 src={user.avatar} 
//                 alt={user.name}
//                 sx={{ width: 40, height: 40 }}
//               />
//               {/* Status indicator */}
//               <Box 
//                 sx={{
//                   position: 'absolute',
//                   bottom: 0,
//                   right: 0,
//                   width: 10,
//                   height: 10,
//                   borderRadius: '50%',
//                   bgcolor: user.status === 'online' ? 'green' : 'red',
//                   border: '2px solid white'
//                 }}
//               />
//             </ListItemAvatar>
//             <ListItemText 
//               primary={user.name}
//               secondary={user.lastSeen}
//               primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
//               secondaryTypographyProps={{ fontSize: 12, color: 'text.secondary' }}
//             />
//           </ListItem>
//         ))}

//         {/* No users found */}
//         {filteredAndSortedUsers.length === 0 && (
//           <Box sx={{ p: 4, textAlign: 'center', color: 'grey.500', fontSize: 14 }}>
//             No contacts found.
//           </Box>
//         )}
//       </List>
//     </Paper>
//   );
// }


// import React, { useState } from 'react';
// import { 
//   Paper, 
//   List, 
//   ListItem, 
//   ListItemAvatar, 
//   ListItemText, 
//   Avatar, 
//   Typography, 
//   Box,
//   IconButton,
//   InputBase
// } from '@mui/material';
// import { Search, MoreVertical } from 'lucide-react';

// export default function MessengerUserBar() {
//   const [users] = useState([
//     { id: 1, name: "Emma Wilson", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 2, name: "James Johnson", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 3, name: "Olivia Martinez", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 20m ago" },
//     { id: 4, name: "Noah Thompson", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 1h ago" },
//     { id: 5, name: "Sophia Davis", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 6, name: "Liam Miller", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 2h ago" }
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredAndSortedUsers = users
//     .filter(user =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (a.status === b.status) return 0;
//       return a.status === "online" ? -1 : 1;
//     });

//   return (
//     <Paper 
//       elevation={3}
//       sx={{
//         width: '100%',
//         height: 72,
//         bgcolor: 'grey.50',
//         borderRadius: 0,
//         overflow: 'hidden',
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         px: 2,
//       }}
//     >
//       {/* Left Section: Header and Search */}
//       <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
//         <Typography variant="h6" sx={{ fontWeight: 500, fontSize: 18, mr: 2 }}>Contacts</Typography>
//         <Box 
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             bgcolor: 'white',
//             p: 0.5,
//             borderRadius: 1,
//           }}
//         >
//           <Search size={18} style={{ marginLeft: 8, marginRight: 8, color: '#9e9e9e' }} />
//           <InputBase
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             sx={{ width: 120, fontSize: 14 }}
//           />
//         </Box>
//       </Box>

//       {/* Divider */}
//       <Box sx={{ flexGrow: 1, overflowX: 'auto', display: 'flex', alignItems: 'center' }}>
//         {/* Users list */}
//         <List sx={{ display: 'flex', flexDirection: 'row', p: 0, m: 0 }}>
//           {filteredAndSortedUsers.map((user) => (
//             <ListItem 
//               key={user.id}
//               button
//               sx={{
//                 width: 'auto',
//                 px: 1,
//                 py: 0,
//                 minWidth: 100,
//                 '&:hover': { bgcolor: 'grey.100' },
//                 transition: 'background-color 0.3s',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center'
//               }}
//             >
//               <ListItemAvatar sx={{ position: 'relative', minWidth: 'fit-content', mb: 0.5 }}>
//                 <Avatar 
//                   src={user.avatar} 
//                   alt={user.name}
//                   sx={{ width: 36, height: 36 }}
//                 />
//                 {/* Status indicator */}
//                 <Box 
//                   sx={{
//                     position: 'absolute',
//                     bottom: 0,
//                     right: 0,
//                     width: 10,
//                     height: 10,
//                     borderRadius: '50%',
//                     bgcolor: user.status === 'online' ? 'green' : 'red',
//                     border: '2px solid white'
//                   }}
//                 />
//               </ListItemAvatar>
//               <ListItemText 
//                 primary={user.name.split(' ')[0]} // show first name only
//                 primaryTypographyProps={{ fontSize: 12, fontWeight: 500, textAlign: 'center' }}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Right: More Options */}
//       <IconButton size="small" sx={{ color: 'text.secondary', ml: 2 }}>
//         <MoreVertical size={20} />
//       </IconButton>
//     </Paper>
//   );
// }

// import React, { useState } from 'react';
// import { 
//   Paper, 
//   List, 
//   ListItem, 
//   ListItemAvatar, 
//   ListItemText, 
//   Avatar, 
//   Typography, 
//   Box,
//   IconButton,
//   InputBase
// } from '@mui/material';
// import { Search, MoreVertical } from 'lucide-react';

// export default function MessengerUserBar() {
//   const [users] = useState([
//     { id: 1, name: "Emma Wilson", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 2, name: "James Johnson", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 3, name: "Olivia Martinez", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 20m ago" },
//     { id: 4, name: "Noah Thompson", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 1h ago" },
//     { id: 5, name: "Sophia Davis", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 6, name: "Liam Miller", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 2h ago" }
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredAndSortedUsers = users
//     .filter(user =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (a.status === b.status) return 0;
//       return a.status === "online" ? -1 : 1;
//     });

//   return (
//     <Paper 
//       elevation={0}
//       sx={{
//         width: '100%',
//         height: 80,
//         bgcolor: 'rgba(255, 255, 255, 0.8)',
//         backdropFilter: 'blur(10px)',
//         borderBottom: '1px solid #e0e0e0',
//         display: 'flex',
//         alignItems: 'center',
//         px: 2,
//         overflowX: 'auto'
//       }}
//     >
//       {/* Left: Title and Search */}
//       <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
//         <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 20, color: 'primary.main', mr: 2 }}>
//           Contacts
//         </Typography>
//         <Box 
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             bgcolor: 'grey.100',
//             borderRadius: 2,
//             px: 1,
//             py: 0.5,
//             width: 180,
//           }}
//         >
//           <Search size={18} style={{ marginRight: 8, color: '#9e9e9e' }} />
//           <InputBase
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             sx={{ fontSize: 14, width: '100%' }}
//           />
//         </Box>
//       </Box>

//       {/* Center: Users */}
//       <List sx={{ display: 'flex', flexDirection: 'row', p: 0, m: 0, flexGrow: 1 }}>
//         {filteredAndSortedUsers.map((user) => (
//           <ListItem 
//             key={user.id}
//             button
//             sx={{
//               width: 'auto',
//               minWidth: 80,
//               mx: 1,
//               py: 0,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               transition: 'all 0.3s',
//               borderRadius: 2,
//               '&:hover': { bgcolor: 'grey.100' },
//             }}
//           >
//             <ListItemAvatar sx={{ position: 'relative', mb: 0.5 }}>
//               <Avatar 
//                 src={user.avatar} 
//                 alt={user.name}
//                 sx={{ width: 40, height: 40, boxShadow: 2 }}
//               />
//               {/* Status indicator */}
//               <Box 
//                 sx={{
//                   position: 'absolute',
//                   bottom: 0,
//                   right: 0,
//                   width: 10,
//                   height: 10,
//                   borderRadius: '50%',
//                   bgcolor: user.status === 'online' ? 'green' : 'red',
//                   border: '2px solid white',
//                   animation: user.status === 'online' ? 'pulse 1.5s infinite' : 'none'
//                 }}
//               />
//             </ListItemAvatar>
//             <ListItemText 
//               primary={user.name.split(' ')[0]}
//               primaryTypographyProps={{
//                 fontSize: 12,
//                 fontWeight: 500,
//                 textAlign: 'center',
//                 color: 'text.primary'
//               }}
//             />
//           </ListItem>
//         ))}
//       </List>

//       {/* Right: More Options */}
//       <IconButton size="small" sx={{ color: 'text.secondary', ml: 2 }}>
//         <MoreVertical size={20} />
//       </IconButton>

//       {/* Custom Pulse Animation */}
//       <style>
//         {`
//           @keyframes pulse {
//             0% {
//               transform: scale(1);
//               opacity: 1;
//             }
//             50% {
//               transform: scale(1.4);
//               opacity: 0.6;
//             }
//             100% {
//               transform: scale(1);
//               opacity: 1;
//             }
//           }
//         `}
//       </style>
//     </Paper>
//   );
// }

// import React, { useState } from 'react';
// import { 
//   Paper, 
//   List, 
//   ListItem, 
//   ListItemAvatar, 
//   ListItemText, 
//   Avatar, 
//   Typography, 
//   Box,
//   IconButton,
//   InputBase
// } from '@mui/material';
// import { Search, MoreVertical } from 'lucide-react';

// export default function MessengerUserBar() {
//   const [users] = useState([
//     { id: 1, name: "Emma Wilson", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 2, name: "James Johnson", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 3, name: "Olivia Martinez", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 20m ago" },
//     { id: 4, name: "Noah Thompson", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 1h ago" },
//     { id: 5, name: "Sophia Davis", avatar: "/api/placeholder/100/100", status: "online", lastSeen: "Active now" },
//     { id: 6, name: "Liam Miller", avatar: "/api/placeholder/100/100", status: "offline", lastSeen: "Last seen 2h ago" }
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredAndSortedUsers = users
//     .filter(user =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (a.status === b.status) return 0;
//       return a.status === "online" ? -1 : 1;
//     });

//   return (
//     <Paper 
//       elevation={0}
//       sx={{
//         width: '100%',
//         height: 80,
//         bgcolor: 'rgba(10, 25, 47, 0.8)', // bluish black base
//         backdropFilter: 'blur(10px)',
//         borderBottom: '1px solid #1a2634',
//         display: 'flex',
//         alignItems: 'center',
//         px: 2,
//         overflowX: 'auto',
//         transition: 'background-color 0.5s, box-shadow 0.5s', // smooth transition
//         '&:hover': {
//           bgcolor: 'rgba(15, 30, 55, 0.9)', // slightly lighter bluish black
//           boxShadow: '0 4px 20px rgba(0, 100, 255, 0.2)', // soft blue glow
//         },
//         animation: 'pulseBackground 5s ease-in-out infinite' // pulse animation
//       }}
//     >
//       {/* Left: Title and Search */}
//       <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
//         <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 20, color: 'primary.main', mr: 2 }}>
//           Contacts
//         </Typography>
//         <Box 
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             bgcolor: 'grey.100',
//             borderRadius: 2,
//             px: 1,
//             py: 0.5,
//             width: 180,
//           }}
//         >
//           <Search size={18} style={{ marginRight: 8, color: '#9e9e9e' }} />
//           <InputBase
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             sx={{ fontSize: 14, width: '100%' }}
//           />
//         </Box>
//       </Box>

//       {/* Center: Users */}
//       <List sx={{ display: 'flex', flexDirection: 'row', p: 0, m: 0, flexGrow: 1 }}>
//         {filteredAndSortedUsers.map((user) => (
//           <ListItem 
//             key={user.id}
//             button
//             sx={{
//               width: 'auto',
//               minWidth: 80,
//               mx: 1,
//               py: 0,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               transition: 'all 0.3s',
//               borderRadius: 2,
//               '&:hover': { bgcolor: 'grey.100' },
//             }}
//           >
//             <ListItemAvatar sx={{ position: 'relative', mb: 0.5 }}>
//               <Avatar 
//                 src={user.avatar} 
//                 alt={user.name}
//                 sx={{ width: 40, height: 40, boxShadow: 2 }}
//               />
//               {/* Status indicator */}
//               <Box 
//                 sx={{
//                   position: 'absolute',
//                   bottom: 0,
//                   right: 0,
//                   width: 10,
//                   height: 10,
//                   borderRadius: '50%',
//                   bgcolor: user.status === 'online' ? 'green' : 'red',
//                   border: '2px solid white',
//                   animation: user.status === 'online' ? 'pulse 1.5s infinite' : 'none'
//                 }}
//               />
//             </ListItemAvatar>
//             <ListItemText 
//               primary={user.name.split(' ')[0]}
//               primaryTypographyProps={{
//                 fontSize: 12,
//                 fontWeight: 500,
//                 textAlign: 'center',
//                 color: 'text.primary'
//               }}
//             />
//           </ListItem>
//         ))}
//       </List>

//       {/* Right: More Options */}
//       <IconButton size="small" sx={{ color: 'text.secondary', ml: 2 }}>
//         <MoreVertical size={20} />
//       </IconButton>

//       {/* Custom Pulse Animation */}
//       <style>
//         {`
//           @keyframes pulse {
//             0% {
//               transform: scale(1);
//               opacity: 1;
//             }
//             50% {
//               transform: scale(1.4);
//               opacity: 0.6;
//             }
//             100% {
//               transform: scale(1);
//               opacity: 1;
//             }
//           }

//           @keyframes pulseBackground {
//             0% {
//               transform: scale(1);
//               opacity: 1;
//             }
//             50% {
//               transform: scale(1.05);
//               opacity: 0.8;
//             }
//             100% {
//               transform: scale(1);
//               opacity: 1;
//             }
//           }
//         `}
//       </style>
//     </Paper>
//   );
// }


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
// } from '@mui/material'; // Corrected import
// import { 
//   Search, 
//   Send, 
//   Paperclip, 
//   Smile, 
//   Bell, 
//   Settings, 
//   Home, 
//   Users, 
//   HelpCircle, 
//   FileText 
// } from 'lucide-react';

// export default function ChatApplication() {
//   // Sample user data with messages
//   const [users, setUsers] = useState([
//     { id: 1, name: "John Doe", message: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", status: "online", unread: 0 },
//     { id: 2, name: "Jessie Woo", message: "Working with you like dream!", time: "08:50", avatar: "/api/placeholder/80/80", status: "online", unread: 5 },
//     { id: 3, name: "Amelia Nelson", message: "Hi there, How are you?", time: "08:30", avatar: "/api/placeholder/80/80", status: "offline", unread: 5 },
//     { id: 4, name: "Samantha Martin", message: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
//     { id: 5, name: "Chies Lie", message: "Working with you like dream!", time: "08:50", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
//     { id: 6, name: "Nicolas Plum", message: "Hi there, How are you?", time: "08:30", avatar: "/api/placeholder/80/80", status: "online", unread: 0 },
//     { id: 7, name: "Alexa Doe", message: "Cool!! Looks good...", time: "08:30", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
//   ]);

//   // Sort users: online first, then offline
//   const sortedUsers = [...users].sort((a, b) => {
//     if (a.status === b.status) return 0;
//     return a.status === "online" ? -1 : 1;
//   });

//   // Active chat messages
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
//     <Box className="flex flex-col h-screen bg-gray-100">
//       {/* Curved background */}
//       <Box className="absolute top-0 left-0 w-full h-full">
//         <Box className="absolute top-0 left-0 w-1/2 h-1/2 bg-orange-300 rounded-br-full" />
//         <Box className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-100 rounded-tl-full" />
//       </Box>
      
//       {/* Main chat container */}
//       <Paper className="m-auto w-full max-w-6xl h-screen sm:h-5/6 relative z-10 overflow-hidden flex flex-row shadow-xl rounded-lg">
//         {/* Left sidebar */}
//         <Box className="w-1/3 min-w-64 bg-purple-900 text-white flex flex-col">
//           {/* App header */}
//           <Box className="p-4 flex justify-between items-center">
//             <Box className="flex items-center space-x-2">
//               <Box className="bg-green-400 rounded-full p-1">
//                 <Box className="text-white text-lg">•••</Box>
//               </Box>
//               <Typography variant="h6" className="font-bold">ChatBOT</Typography>
//             </Box>
//             <Box className="flex space-x-4">
//               <IconButton className="text-white" size="small">
//                 <Home size={18} />
//               </IconButton>
//               <IconButton className="text-white" size="small" style={{ borderBottom: '2px solid #fff' }}>
//                 <Users size={18} />
//               </IconButton>
//               <IconButton className="text-white" size="small">
//                 <Settings size={18} />
//               </IconButton>
//               <IconButton className="text-white" size="small">
//                 <HelpCircle size={18} />
//               </IconButton>
//               <IconButton className="text-white" size="small">
//                 <FileText size={18} />
//               </IconButton>
//               <IconButton className="text-white" size="small">
//                 <Search size={18} />
//               </IconButton>
//               <Badge badgeContent={1} color="error">
//                 <IconButton className="text-white" size="small">
//                   <Bell size={18} />
//                 </IconButton>
//               </Badge>
//             </Box>
//           </Box>
          
//           {/* Search box */}
//           <Box className="px-4 my-4">
//             <Box className="flex items-center bg-purple-800 rounded-full px-3 py-2">
//               <Search size={20} className="text-gray-400 mr-2" />
//               <InputBase
//                 placeholder="SEARCH"
//                 className="text-gray-300 text-sm flex-grow"
//               />
//             </Box>
//           </Box>
          
//           {/* Contact list */}
//           <Box className="flex-grow overflow-y-auto">
//             {sortedUsers.map((user) => (
//               <Box 
//                 key={user.id}
//                 className={`flex items-center px-4 py-3 cursor-pointer hover:bg-purple-800 transition-colors ${activeUser === user.name ? 'bg-purple-800' : ''}`}
//                 onClick={() => setActiveUser(user.name)}
//               >
//                 <Box className="relative mr-3">
//                   <Avatar src={user.avatar} alt={user.name} />
//                   <Box 
//                     className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-purple-900 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}
//                   />
//                 </Box>
//                 <Box className="flex-grow">
//                   <Box className="flex justify-between">
//                     <Typography variant="subtitle2" className="font-semibold">{user.name}</Typography>
//                     <Typography variant="caption" className="text-gray-300">{user.time}</Typography>
//                   </Box>
//                   <Typography variant="body2" className="text-gray-300 text-sm truncate">
//                     {user.message}
//                   </Typography>
//                 </Box>
//                 {user.unread > 0 && (
//                   <Badge 
//                     badgeContent={user.unread} 
//                     color="error"
//                     className="ml-2"
//                   />
//                 )}
//               </Box>
//             ))}
//           </Box>
//         </Box>
        
//         {/* Chat area */}
//         <Box className="flex-grow bg-purple-800 flex flex-col">
//           {/* Action buttons */}
//           <Box className="flex justify-end p-4 gap-2">
//             <button className="bg-purple-700 text-white px-4 py-2 rounded-full text-sm">CLEAR CHAT</button>
//             <button className="bg-purple-700 text-white px-4 py-2 rounded-full text-sm">MORE</button>
//           </Box>
          
//           {/* Messages */}
//           <Box className="flex-grow p-4 overflow-y-auto">
//             {messages.map((message) => (
//               <Box 
//                 key={message.id}
//                 className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'} mb-4`}
//               >
//                 {!message.isSelf && (
//                   <Avatar 
//                     src={message.avatar} 
//                     alt={message.sender} 
//                     className="mr-2"
//                   />
//                 )}
//                 <Box 
//                   className={`max-w-sm p-3 rounded-lg ${
//                     message.isSelf 
//                       ? 'bg-orange-300 text-gray-800' 
//                       : 'bg-purple-700 text-white'
//                   }`}
//                 >
//                   <Typography variant="body1" className="mb-1">
//                     {message.text}
//                   </Typography>
//                   {message.time && (
//                     <Typography variant="caption" className="block text-right">
//                       {message.time}
//                     </Typography>
//                   )}
//                 </Box>
//               </Box>
//             ))}
//           </Box>
          
//           {/* Message input */}
//           <Box className="p-4">
//             <Box className="flex items-center bg-white rounded-full p-2">
//               <IconButton size="small">
//                 <Smile size={20} />
//               </IconButton>
//               <InputBase
//                 placeholder="Type a message"
//                 className="ml-2 flex-grow"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') handleSendMessage();
//                 }}
//               />
//               <IconButton size="small">
//                 <Paperclip size={20} />
//               </IconButton>
//               <IconButton 
//                 className="bg-teal-500 text-white ml-2" 
//                 onClick={handleSendMessage}
//               >
//                 <Send size={20} />
//               </IconButton>
//             </Box>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }


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
// } from '@mui/material'; // Corrected import
// import { 
//   Search, 
//   Send, 
//   Paperclip, 
//   Smile, 
//   Bell, 
//   Settings, 
//   Home, 
//   Users, 
//   HelpCircle, 
//   FileText 
// } from 'lucide-react';

// export default function ChatApplication() {
//   // Sample user data with messages
//   const [users, setUsers] = useState([
//     { id: 1, name: "John Doe", message: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", status: "online", unread: 0 },
//     { id: 2, name: "Jessie Woo", message: "Working with you like dream!", time: "08:50", avatar: "/api/placeholder/80/80", status: "online", unread: 5 },
//     { id: 3, name: "Amelia Nelson", message: "Hi there, How are you?", time: "08:30", avatar: "/api/placeholder/80/80", status: "offline", unread: 5 },
//     { id: 4, name: "Samantha Martin", message: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
//     { id: 5, name: "Chies Lie", message: "Working with you like dream!", time: "08:50", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
//     { id: 6, name: "Nicolas Plum", message: "Hi there, How are you?", time: "08:30", avatar: "/api/placeholder/80/80", status: "online", unread: 0 },
//     { id: 7, name: "Alexa Doe", message: "Cool!! Looks good...", time: "08:30", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
//   ]);

//   // Sort users: online first, then offline
//   const sortedUsers = [...users].sort((a, b) => {
//     if (a.status === b.status) return 0;
//     return a.status === "online" ? -1 : 1;
//   });

//   // Active chat messages
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
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f0f0f0' }}>
//       {/* Curved background */}
//       <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
//         <Box sx={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '50%', backgroundColor: '#ffb74d', borderBottomRightRadius: '50%' }} />
//         <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '50%', backgroundColor: '#90caf9', borderTopLeftRadius: '50%' }} />
//       </Box>

//       {/* Main chat container */}
//       <Paper sx={{ margin: 'auto', width: '100%', maxWidth: '1200px', height: '100vh', display: 'flex', flexDirection: 'row', borderRadius: '16px', boxShadow: 3 }}>
//         {/* Left sidebar */}
//         <Box sx={{ width: '33%', minWidth: '256px', backgroundColor: '#6a1b9a', color: 'white', display: 'flex', flexDirection: 'column' }}>
//           {/* App header */}
//           <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Box sx={{ backgroundColor: '#66bb6a', borderRadius: '50%', padding: 1 }}>
//                 <Typography variant="h6">•••</Typography>
//               </Box>
//               <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ChatBOT</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <IconButton sx={{ color: 'white' }} size="small">
//                 <Home size={18} />
//               </IconButton>
//               <IconButton sx={{ color: 'white' }} size="small" style={{ borderBottom: '2px solid white' }}>
//                 <Users size={18} />
//               </IconButton>
//               <IconButton sx={{ color: 'white' }} size="small">
//                 <Settings size={18} />
//               </IconButton>
//               <IconButton sx={{ color: 'white' }} size="small">
//                 <HelpCircle size={18} />
//               </IconButton>
//               <IconButton sx={{ color: 'white' }} size="small">
//                 <FileText size={18} />
//               </IconButton>
//               <IconButton sx={{ color: 'white' }} size="small">
//                 <Search size={18} />
//               </IconButton>
//               <Badge badgeContent={1} color="error">
//                 <IconButton sx={{ color: 'white' }} size="small">
//                   <Bell size={18} />
//                 </IconButton>
//               </Badge>
//             </Box>
//           </Box>

//           {/* Search box */}
//           <Box sx={{ paddingX: 2, marginY: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#8e24aa', borderRadius: '9999px', paddingX: 2, paddingY: 1 }}>
//               <Search size={20} style={{ color: '#e1bee7' }} />
//               <InputBase
//                 placeholder="SEARCH"
//                 sx={{ color: '#e1bee7', fontSize: '0.875rem', flexGrow: 1, marginLeft: 2 }}
//               />
//             </Box>
//           </Box>

//           {/* Contact list */}
//           <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//             {sortedUsers.map((user) => (
//               <Box
//                 key={user.id}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   paddingX: 2,
//                   paddingY: 1,
//                   cursor: 'pointer',
//                   '&:hover': {
//                     backgroundColor: '#8e24aa',
//                     transition: 'background-color 0.3s ease',
//                   },
//                   backgroundColor: activeUser === user.name ? '#8e24aa' : 'transparent',
//                 }}
//                 onClick={() => setActiveUser(user.name)}
//               >
//                 <Box sx={{ position: 'relative', marginRight: 2 }}>
//                   <Avatar src={user.avatar} alt={user.name} />
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       bottom: 0,
//                       right: 0,
//                       width: 12,
//                       height: 12,
//                       borderRadius: '50%',
//                       border: '2px solid #6a1b9a',
//                       backgroundColor: user.status === 'online' ? '#4caf50' : '#f44336',
//                     }}
//                   />
//                 </Box>
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
//                     <Typography variant="caption" sx={{ color: '#e1bee7' }}>{user.time}</Typography>
//                   </Box>
//                   <Typography variant="body2" sx={{ color: '#e1bee7', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                     {user.message}
//                   </Typography>
//                 </Box>
//                 {user.unread > 0 && (
//                   <Badge badgeContent={user.unread} color="error" sx={{ marginLeft: 1 }} />
//                 )}
//               </Box>
//             ))}
//           </Box>
//         </Box>

//         {/* Chat area */}
//         <Box sx={{ flexGrow: 1, backgroundColor: '#8e24aa', display: 'flex', flexDirection: 'column' }}>
//           {/* Action buttons */}
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2, gap: 1 }}>
//             <button style={{ backgroundColor: '#7b1fa2', color: 'white', padding: '8px 16px', borderRadius: '9999px', fontSize: '0.875rem' }}>
//               CLEAR CHAT
//             </button>
//             <button style={{ backgroundColor: '#7b1fa2', color: 'white', padding: '8px 16px', borderRadius: '9999px', fontSize: '0.875rem' }}>
//               MORE
//             </button>
//           </Box>

//           {/* Messages */}
//           <Box sx={{ flexGrow: 1, padding: 2, overflowY: 'auto' }}>
//             {messages.map((message) => (
//               <Box
//                 key={message.id}
//                 sx={{
//                   display: 'flex',
//                   justifyContent: message.isSelf ? 'flex-end' : 'flex-start',
//                   marginBottom: 2,
//                 }}
//               >
//                 {!message.isSelf && (
//                   <Avatar src={message.avatar} alt={message.sender} sx={{ marginRight: 2 }} />
//                 )}
//                 <Box
//                   sx={{
//                     maxWidth: '80%',
//                     padding: 2,
//                     borderRadius: 2,
//                     backgroundColor: message.isSelf ? '#ff9800' : '#6a1b9a',
//                     color: message.isSelf ? '#4e342e' : 'white',
//                   }}
//                 >
//                   <Typography variant="body1" sx={{ marginBottom: 1 }}>{message.text}</Typography>
//                   {message.time && (
//                     <Typography variant="caption" sx={{ display: 'block', textAlign: 'right' }}>
//                       {message.time}
//                     </Typography>
//                   )}
//                 </Box>
//               </Box>
//             ))}
//           </Box>

//           {/* Message input */}
//           <Box sx={{ padding: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '50px', paddingX: 2, paddingY: 1 }}>
//               <IconButton size="small">
//                 <Smile size={20} />
//               </IconButton>
//               <InputBase
//                 placeholder="Type a message"
//                 sx={{ flexGrow: 1, marginLeft: 2 }}
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               />
//               <IconButton size="small" onClick={handleSendMessage}>
//                 <Send size={20} />
//               </IconButton>
//             </Box>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }


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
//   Smile, 
//   Bell, 
//   Settings, 
//   Home, 
//   Users, 
//   HelpCircle, 
//   FileText 
// } from 'lucide-react';

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

//   const sortedUsers = [...users].sort((a, b) => {
//     if (a.status === b.status) return 0;
//     return a.status === "online" ? -1 : 1;
//   });

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
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f0f0f0' }}>
//       <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
//         <Box sx={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '50%', backgroundColor: '#ffb74d', borderBottomRightRadius: '50%' }} />
//         <Box sx={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '50%', backgroundColor: '#90caf9', borderTopLeftRadius: '50%' }} />
//       </Box>

//       <Paper sx={{ margin: 'auto', width: '100%', maxWidth: '1200px', height: '100vh', display: 'flex', flexDirection: 'row', borderRadius: '16px', boxShadow: 3 }}>
//         <Box sx={{ width: '33%', minWidth: '256px', backgroundColor: '#6a1b9a', color: 'white', display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Box sx={{ backgroundColor: '#66bb6a', borderRadius: '50%', padding: 1 }}>
//                 <Typography variant="h6">•••</Typography>
//               </Box>
//               <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ChatBOT</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <IconButton sx={{ color: 'white' }} size="small"><Home size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small" style={{ borderBottom: '2px solid white' }}><Users size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><Settings size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><HelpCircle size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><FileText size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><Search size={18} /></IconButton>
//               <Badge badgeContent={1} color="error">
//                 <IconButton sx={{ color: 'white' }} size="small"><Bell size={18} /></IconButton>
//               </Badge>
//             </Box>
//           </Box>

//           <Box sx={{ paddingX: 2, marginY: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#8e24aa', borderRadius: '9999px', paddingX: 2, paddingY: 1 }}>
//               <Search size={20} style={{ color: '#e1bee7' }} />
//               <InputBase
//                 placeholder="SEARCH"
//                 sx={{ color: '#e1bee7', fontSize: '0.875rem', flexGrow: 1, marginLeft: 2 }}
//               />
//             </Box>
//           </Box>

//           <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//             {sortedUsers.map((user) => (
//               <Box
//                 key={user.id}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   paddingX: 2,
//                   paddingY: 1,
//                   cursor: 'pointer',
//                   '&:hover': {
//                     backgroundColor: '#8e24aa',
//                     transition: 'background-color 0.3s ease',
//                   },
//                   backgroundColor: activeUser === user.name ? '#8e24aa' : 'transparent',
//                 }}
//                 onClick={() => setActiveUser(user.name)}
//               >
//                 <Box sx={{ position: 'relative', marginRight: 2 }}>
//                   <Avatar src={user.avatar} alt={user.name} />
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       bottom: 0,
//                       right: 0,
//                       width: 12,
//                       height: 12,
//                       borderRadius: '50%',
//                       border: '2px solid #6a1b9a',
//                       backgroundColor: user.status === 'online' ? '#4caf50' : '#f44336',
//                     }}
//                   />
//                 </Box>
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
//                     <Typography variant="caption" sx={{ color: '#e1bee7' }}>{user.time}</Typography>
//                   </Box>
//                   <Typography variant="body2" sx={{ color: '#e1bee7' }}>{user.message}</Typography>
//                 </Box>
//                 {user.unread > 0 && (
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f44336', borderRadius: '50%', width: 24, height: 24 }}>
//                     <Typography variant="caption" sx={{ color: 'white' }}>{user.unread}</Typography>
//                   </Box>
//                 )}
//               </Box>
//             ))}
//           </Box>
//         </Box>

//         <Box sx={{ width: '67%', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ padding: 2, borderBottom: '1px solid #f0f0f0' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Avatar src={messages[0].avatar} alt={messages[0].sender} />
//               <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{activeUser}</Typography>
//             </Box>
//           </Box>

//           <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
//             {messages.map((message) => (
//               <Box
//                 key={message.id}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: message.isSelf ? 'row-reverse' : 'row',
//                   marginBottom: 2,
//                 }}
//               >
//                 <Avatar src={message.avatar} alt={message.sender} sx={{ marginLeft: 2, marginRight: 2 }} />
//                 <Box sx={{ maxWidth: '80%' }}>
//                   <Typography variant="body2" sx={{ fontWeight: message.isSelf ? 'bold' : 'normal' }}>
//                     {message.sender}
//                   </Typography>
//                   <Paper sx={{ padding: 1, marginTop: 0.5, backgroundColor: message.isSelf ? '#4caf50' : '#8e24aa', color: 'white', borderRadius: 2 }}>
//                     <Typography variant="body2">{message.text}</Typography>
//                   </Paper>
//                 </Box>
//               </Box>
//             ))}
//           </Box>

//           <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//             <IconButton sx={{ color: '#8e24aa' }}><Smile size={18} /></IconButton>
//             <IconButton sx={{ color: '#8e24aa' }}><Paperclip size={18} /></IconButton>
//             <InputBase
//               sx={{ flexGrow: 1, border: '1px solid #ddd', borderRadius: 2, paddingX: 2, paddingY: 1 }}
//               placeholder="Type a message"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <IconButton sx={{ color: '#8e24aa' }} onClick={handleSendMessage}><Send size={18} /></IconButton>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }


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
//   Smile, 
//   Bell, 
//   Settings, 
//   Home, 
//   Users, 
//   HelpCircle, 
//   FileText 
// } from 'lucide-react';

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

//   const sortedUsers = [...users].sort((a, b) => {
//     if (a.status === b.status) return 0;
//     return a.status === "online" ? -1 : 1;
//   });

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
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f0f0f0' }}>
//       <Paper sx={{ margin: 'auto', width: '100%', maxWidth: '1200px', height: '100vh', display: 'flex', flexDirection: 'row', borderRadius: '16px', boxShadow: 3 }}>
        
//         {/* Left Sidebar */}
//         <Box sx={{ width: '300px', backgroundColor: '#6a1b9a', color: 'white', display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Box sx={{ backgroundColor: '#66bb6a', borderRadius: '50%', padding: 1 }}>
//                 <Typography variant="h6">•••</Typography>
//               </Box>
//               <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ChatBOT</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <IconButton sx={{ color: 'white' }} size="small"><Home size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small" style={{ borderBottom: '2px solid white' }}><Users size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><Settings size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><HelpCircle size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><FileText size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><Search size={18} /></IconButton>
//               <Badge badgeContent={1} color="error">
//                 <IconButton sx={{ color: 'white' }} size="small"><Bell size={18} /></IconButton>
//               </Badge>
//             </Box>
//           </Box>

//           <Box sx={{ paddingX: 2, marginY: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#8e24aa', borderRadius: '9999px', paddingX: 2, paddingY: 1 }}>
//               <Search size={20} style={{ color: '#e1bee7' }} />
//               <InputBase
//                 placeholder="SEARCH"
//                 sx={{ color: '#e1bee7', fontSize: '0.875rem', flexGrow: 1, marginLeft: 2 }}
//               />
//             </Box>
//           </Box>

//           <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//             {sortedUsers.map((user) => (
//               <Box
//                 key={user.id}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   paddingX: 2,
//                   paddingY: 1,
//                   cursor: 'pointer',
//                   '&:hover': {
//                     backgroundColor: '#8e24aa',
//                     transition: 'background-color 0.3s ease',
//                   },
//                   backgroundColor: activeUser === user.name ? '#8e24aa' : 'transparent',
//                 }}
//                 onClick={() => setActiveUser(user.name)}
//               >
//                 <Box sx={{ position: 'relative', marginRight: 2 }}>
//                   <Avatar src={user.avatar} alt={user.name} />
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       bottom: 0,
//                       right: 0,
//                       width: 12,
//                       height: 12,
//                       borderRadius: '50%',
//                       border: '2px solid #6a1b9a',
//                       backgroundColor: user.status === 'online' ? '#4caf50' : '#f44336',
//                     }}
//                   />
//                 </Box>
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
//                     <Typography variant="caption" sx={{ color: '#e1bee7' }}>{user.time}</Typography>
//                   </Box>
//                   <Typography variant="body2" sx={{ color: '#e1bee7' }}>{user.message}</Typography>
//                 </Box>
//                 {user.unread > 0 && (
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f44336', borderRadius: '50%', width: 24, height: 24 }}>
//                     <Typography variant="caption" sx={{ color: 'white' }}>{user.unread}</Typography>
//                   </Box>
//                 )}
//               </Box>
//             ))}
//           </Box>
//         </Box>

//         {/* Chat Area */}
//         <Box sx={{ width: 'calc(100% - 300px)', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ padding: 2, borderBottom: '1px solid #f0f0f0' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Avatar src={messages[0].avatar} alt={messages[0].sender} />
//               <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{activeUser}</Typography>
//             </Box>
//           </Box>

//           <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
//             {messages.map((message) => (
//               <Box
//                 key={message.id}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: message.isSelf ? 'row-reverse' : 'row',
//                   marginBottom: 2,
//                 }}
//               >
//                 <Avatar src={message.avatar} alt={message.sender} sx={{ marginLeft: 2, marginRight: 2 }} />
//                 <Box sx={{ maxWidth: '80%' }}>
//                   <Typography variant="body2" sx={{ fontWeight: message.isSelf ? 'bold' : 'normal' }}>
//                     {message.sender}
//                   </Typography>
//                   <Paper sx={{ padding: 1, marginTop: 0.5, backgroundColor: message.isSelf ? '#4caf50' : '#8e24aa', color: 'white', borderRadius: 2 }}>
//                     <Typography variant="body2">{message.text}</Typography>
//                   </Paper>
//                 </Box>
//               </Box>
//             ))}
//           </Box>

//           <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 1, backgroundColor: '#f5f5f5' }}>
//             <IconButton sx={{ color: '#8e24aa' }}><Paperclip size={20} /></IconButton>
//             <IconButton sx={{ color: '#8e24aa' }}><Smile size={20} /></IconButton>
//             <InputBase
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//               sx={{ flexGrow: 1, backgroundColor: '#e1bee7', borderRadius: '20px', padding: '8px 12px' }}
//             />
//             <IconButton sx={{ color: '#8e24aa' }} onClick={handleSendMessage}><Send size={20} /></IconButton>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }


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
//   Smile, 
//   Bell, 
//   Settings, 
//   Home, 
//   Users, 
//   HelpCircle, 
//   FileText 
// } from 'lucide-react';

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

//   const sortedUsers = [...users].sort((a, b) => {
//     if (a.status === b.status) return 0;
//     return a.status === "online" ? -1 : 1;
//   });

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
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f0f0f0' }}>
//       <Paper sx={{ margin: 'auto', width: '100%', maxWidth: '1200px', height: '100vh', display: 'flex', flexDirection: 'row', borderRadius: '16px', boxShadow: 3 }}>
        
//         {/* Left Sidebar */}
//         <Box sx={{ width: '300px', backgroundColor: '#6a1b9a', color: 'white', display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Box sx={{ backgroundColor: '#66bb6a', borderRadius: '50%', padding: 1 }}>
//                 <Typography variant="h6">•••</Typography>
//               </Box>
//               <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ChatBOT</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <IconButton sx={{ color: 'white' }} size="small"><Home size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small" style={{ borderBottom: '2px solid white' }}><Users size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><Settings size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><HelpCircle size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><FileText size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><Search size={18} /></IconButton>
//               <Badge badgeContent={1} color="error">
//                 <IconButton sx={{ color: 'white' }} size="small"><Bell size={18} /></IconButton>
//               </Badge>
//             </Box>
//           </Box>

//           <Box sx={{ paddingX: 2, marginY: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#8e24aa', borderRadius: '9999px', paddingX: 2, paddingY: 1 }}>
//               <Search size={20} style={{ color: '#e1bee7' }} />
//               <InputBase
//                 placeholder="SEARCH"
//                 sx={{ color: '#e1bee7', fontSize: '0.875rem', flexGrow: 1, marginLeft: 2 }}
//               />
//             </Box>
//           </Box>

//           <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//             {sortedUsers.map((user) => (
//               <Box
//                 key={user.id}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   paddingX: 2,
//                   paddingY: 1,
//                   cursor: 'pointer',
//                   '&:hover': {
//                     backgroundColor: '#8e24aa',
//                     transition: 'background-color 0.3s ease',
//                   },
//                   backgroundColor: activeUser === user.name ? '#8e24aa' : 'transparent',
//                 }}
//                 onClick={() => setActiveUser(user.name)}
//               >
//                 <Box sx={{ position: 'relative', marginRight: 2 }}>
//                   <Avatar src={user.avatar} alt={user.name} />
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       bottom: 0,
//                       right: 0,
//                       width: 12,
//                       height: 12,
//                       borderRadius: '50%',
//                       border: '2px solid #6a1b9a',
//                       backgroundColor: user.status === 'online' ? '#4caf50' : '#f44336',
//                     }}
//                   />
//                 </Box>
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
//                     <Typography variant="caption" sx={{ color: '#e1bee7' }}>{user.time}</Typography>
//                   </Box>
//                   <Typography variant="body2" sx={{ color: '#e1bee7' }}>{user.message}</Typography>
//                 </Box>
//                 {user.unread > 0 && (
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f44336', borderRadius: '50%', width: 24, height: 24 }}>
//                     <Typography variant="caption" sx={{ color: 'white' }}>{user.unread}</Typography>
//                   </Box>
//                 )}
//               </Box>
//             ))}
//           </Box>
//         </Box>

//         {/* Chat Area */}
//         <Box sx={{ width: 'calc(100% - 300px)', background: 'linear-gradient(180deg, #6a1b9a 0%, #ab47bc 100%)', display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ padding: 2, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Avatar src={messages[0].avatar} alt={messages[0].sender} />
//               <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>{activeUser}</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Typography sx={{ color: '#8e24aa', fontSize: '0.875rem', cursor: 'pointer', padding: '4px 8px', border: '1px solid #8e24aa', borderRadius: '20px' }}>
//                 CLEAR CHAT
//               </Typography>
//               <Typography sx={{ color: '#8e24aa', fontSize: '0.875rem', cursor: 'pointer', padding: '4px 8px', border: '1px solid #8e24aa', borderRadius: '20px' }}>
//                 MORE
//               </Typography>
//             </Box>
//           </Box>

//           <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
//             {messages.map((message) => (
//               <Box
//                 key={message.id}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: message.isSelf ? 'row-reverse' : 'row',
//                   marginBottom: 2,
//                 }}
//               >
//                 <Avatar src={message.avatar} alt={message.sender} sx={{ marginLeft: 2, marginRight: 2 }} />
//                 <Box sx={{ maxWidth: '80%' }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
//                     padding: 1, 
//                     marginTop: 0.5, 
//                     backgroundColor: message.isSelf ? '#ffccbc' : '#8e24aa', 
//                     color: 'white', 
//                     borderRadius: 2 
//                   }}>
//                     <Typography variant="body2">{message.text}</Typography>
//                   </Paper>
//                 </Box>
//               </Box>
//             ))}
//           </Box>

//           <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 1, backgroundColor: 'white', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
//             <IconButton sx={{ color: '#8e24aa' }}><Paperclip size={20} /></IconButton>
//             <IconButton sx={{ color: '#8e24aa' }}><Smile size={20} /></IconButton>
//             <InputBase
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//               sx={{ flexGrow: 1, backgroundColor: 'white', borderRadius: '20px', padding: '8px 12px', border: '1px solid #e0e0e0' }}
//             />
//             <IconButton sx={{ color: '#26c6da' }} onClick={handleSendMessage}><Send size={20} /></IconButton>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

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
//   Smile, 
//   Bell, 
//   Settings, 
//   Home, 
//   Users, 
//   HelpCircle, 
//   FileText 
// } from 'lucide-react';

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

//   const sortedUsers = [...users].sort((a, b) => {
//     if (a.status === b.status) return 0;
//     return a.status === "online" ? -1 : 1;
//   });

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
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f0f0f0' }}>
//       <Paper sx={{ margin: 'auto', width: '100%', maxWidth: '1200px', height: '100vh', display: 'flex', flexDirection: 'row', borderRadius: '16px', boxShadow: 3 }}>
        
//         {/* Left Sidebar */}
//         <Box sx={{ width: '300px', backgroundColor: '#6a1b9a', color: 'white', display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Box sx={{ backgroundColor: '#66bb6a', borderRadius: '50%', padding: 1 }}>
//                 <Typography variant="h6">•••</Typography>
//               </Box>
//               <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ChatBOT</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 1.5 }}>
//               <IconButton sx={{ color: 'white' }} size="small"><Home size={18} /></IconButton>
//               <IconButton sx={{ color: 'white', borderBottom: '3px solid white', borderRadius: 0 }} size="small"><Users size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><Settings size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><HelpCircle size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><FileText size={18} /></IconButton>
//               <IconButton sx={{ color: 'white' }} size="small"><Search size={18} /></IconButton>
//               <Badge badgeContent={1} color="error">
//                 <IconButton sx={{ color: 'white' }} size="small"><Bell size={18} /></IconButton>
//               </Badge>
//             </Box>
//           </Box>

//           <Box sx={{ paddingX: 2, marginY: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#8e24aa', borderRadius: '9999px', paddingX: 2, paddingY: 1 }}>
//               <Search size={20} style={{ color: '#e1bee7' }} />
//               <InputBase
//                 placeholder="SEARCH"
//                 sx={{ color: '#e1bee7', fontSize: '0.875rem', flexGrow: 1, marginLeft: 2 }}
//               />
//             </Box>
//           </Box>

//           <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//             {sortedUsers.map((user) => (
//               <Box
//                 key={user.id}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   paddingX: 2,
//                   paddingY: 1.5,
//                   cursor: 'pointer',
//                   '&:hover': {
//                     backgroundColor: '#8e24aa',
//                     transition: 'background-color 0.3s ease',
//                   },
//                   backgroundColor: activeUser === user.name ? '#8e24aa' : 'transparent',
//                 }}
//                 onClick={() => setActiveUser(user.name)}
//               >
//                 <Box sx={{ position: 'relative', marginRight: 2 }}>
//                   <Avatar src={user.avatar} alt={user.name} sx={{ width: 48, height: 48 }} />
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       bottom: 0,
//                       right: 0,
//                       width: 16,
//                       height: 16,
//                       borderRadius: '50%',
//                       border: '2px solid #6a1b9a',
//                       backgroundColor: user.status === 'online' ? '#4caf50' : '#f44336',
//                     }}
//                   />
//                 </Box>
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>{user.name}</Typography>
//                     <Typography variant="caption" sx={{ color: '#e1bee7' }}>{user.time}</Typography>
//                   </Box>
//                   <Typography variant="body2" sx={{ color: '#e1bee7', marginTop: 0.5 }}>{user.message}</Typography>
//                 </Box>
//                 {user.unread > 0 && (
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f44336', borderRadius: '50%', width: 24, height: 24 }}>
//                     <Typography variant="caption" sx={{ color: 'white' }}>{user.unread}</Typography>
//                   </Box>
//                 )}
//               </Box>
//             ))}
//           </Box>
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




// import React from 'react';
// import { 
//   Box, 
//   Typography, 
//   IconButton, 
//   Badge 
// } from '@mui/material'; 
// import { 
//   Home, 
//   Users, 
//   Settings, 
//   HelpCircle, 
//   FileText, 
//   Search, 
//   Bell 
// } from 'lucide-react';

// export default function ChatNavbar() {
//   return (
//     <Box sx={{ 
//       backgroundColor: '#6a1b9a', 
//       padding: 2, 
//       display: 'flex', 
//       justifyContent: 'space-between', 
//       alignItems: 'center',
//       width: '100%' // Matches the sidebar width from the design
//     }}>
//       {/* Left Section: Logo/Title */}
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         <Box sx={{ 
//           backgroundColor: '#66bb6a', 
//           borderRadius: '50%', 
//           padding: 1,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           width: 24,
//           height: 24
//         }}>
//           <Typography sx={{ color: 'white', fontSize: '1.25rem', lineHeight: 1 }}>
//             •••
//           </Typography>
//         </Box>
//         <Typography 
//           variant="h6" 
//           sx={{ 
//             fontWeight: 'bold', 
//             color: 'white',
//             fontSize: '1.25rem' // Matches the design's font size
//           }}
//         >
//           ChatBOT
//         </Typography>
//       </Box>

//       {/* Right Section: Navigation Icons */}
//       <Box sx={{ display: 'flex', gap: 1.5 }}>
//         <IconButton sx={{ color: 'white' }} size="small">
//           <Home size={18} />
//         </IconButton>
//         <IconButton 
//           sx={{ 
//             color: 'white', 
//             borderBottom: '3px solid white', 
//             borderRadius: 0,
//             paddingBottom: '4px'
//           }} 
//           size="small"
//         >
//           <Users size={18} />
//         </IconButton>
//         <IconButton sx={{ color: 'white' }} size="small">
//           <Settings size={18} />
//         </IconButton>
//         <IconButton sx={{ color: 'white' }} size="small">
//           <HelpCircle size={18} />
//         </IconButton>
//         <IconButton sx={{ color: 'white' }} size="small">
//           <FileText size={18} />
//         </IconButton>
//         <IconButton sx={{ color: 'white' }} size="small">
//           <Search size={18} />
//         </IconButton>
//         <Badge badgeContent={1} color="error">
//           <IconButton sx={{ color: 'white' }} size="small">
//             <Bell size={18} />
//           </IconButton>
//         </Badge>
//       </Box>
//     </Box>
//   );
// }

import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Badge 
} from '@mui/material'; 
import { 
  Home, 
  Users, 
  Settings, 
  HelpCircle, 
  FileText, 
  Search, 
  Bell 
} from 'lucide-react';

export default function ChatNavbar() {
  return (
    <Box sx={{ 
      backgroundColor: '#6a1b9a', 
      px: 2, // Horizontal padding (left & right)
      py: 2, // Vertical padding (top & bottom)
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      width: '100%'
    }}>
      {/* Left Section: Logo/Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ 
          backgroundColor: '#66bb6a', 
          borderRadius: '50%', 
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28
        }}>
          <Typography sx={{ color: 'white', fontSize: '1.5rem', lineHeight: 1 }}>
            •••
          </Typography>
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'white',
            fontSize: '1.5rem'
          }}
        >
          familYchaT
        </Typography>
      </Box>

      {/* Right Section: Navigation Icons */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <IconButton sx={{ color: 'white' }} size="medium">
          <Home size={20} />
        </IconButton>
        <IconButton 
          sx={{ 
            color: 'white', 
            borderBottom: '3px solid white', 
            borderRadius: 0,
            paddingBottom: '4px'
          }} 
          size="medium"
        >
          <Users size={20} />
        </IconButton>
        <IconButton sx={{ color: 'white' }} size="medium">
          <Settings size={20} />
        </IconButton>
        <IconButton sx={{ color: 'white' }} size="medium">
          <HelpCircle size={20} />
        </IconButton>
        <IconButton sx={{ color: 'white' }} size="medium">
          <FileText size={20} />
        </IconButton>
        <IconButton sx={{ color: 'white' }} size="medium">
          <Search size={20} />
        </IconButton>
        <Badge badgeContent={1} color="error">
          <IconButton sx={{ color: 'white' }} size="medium">
            <Bell size={20} />
          </IconButton>
        </Badge>
      </Box>
    </Box>
  );
}
