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
