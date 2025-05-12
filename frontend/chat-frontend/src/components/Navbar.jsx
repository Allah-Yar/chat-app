// Navbar.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  Switch,
  Divider,
  useMediaQuery,
  useTheme,
  alpha,
  Button
} from '@mui/material';

import {
  Home,
  Users,
  Settings,
  HelpCircle,
  FileText,
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  User,
  Menu as MenuIcon
} from 'lucide-react';
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutDialog from "../components/LogoutDialog";
import { getUserData } from '../utils/auth';

// Import the ColorModeContext from the App component
import { ColorModeContext } from '../App'; // Adjust the path as needed

function Navbar({ activeTab = 'chat', onTabChange, recipientId }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Guest',
    email: '',
    initials: 'G'
  });
  
  // Access the color mode context
  const colorMode = useContext(ColorModeContext);
  const isDarkMode = theme.palette.mode === 'dark';



   useEffect(() => {
    // Get the logged-in user data
    const { username, userId, email } = getUserData();
    
    // Use available data with fallbacks
    const displayName = username || userId || recipientId || "Guest";
    const userEmail = email || "";
    
    // Format the name to be proper case (capitalize first letter of each word)
    const formattedName = displayName.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    // Generate initials from the name (first letter of first and last name)
    const nameParts = formattedName.split(' ');
    let initials = nameParts[0].charAt(0).toUpperCase();
    
    if (nameParts.length > 1) {
      initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    }
    
    setUserData({
      name: formattedName,
      email: userEmail,
      initials: initials
    });
    
    console.log("User data loaded:", { username, userId, email, formattedName, initials });
  }, [recipientId]);


  // Handle profile menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle mobile menu
  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  // Handle notifications
  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("email");
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
  };

  // Handle tab change
  const handleNavItemClick = (tab) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    handleMobileMenuClose();
  };

  // Create gradient based on color mode
  const navbarBackground = isDarkMode
    ? 'linear-gradient(to right, #4a148c, #6a1b9a)'
    : 'linear-gradient(to right, #8e24aa, #6a1b9a)';

  // Get icon color based on active state
  const getIconColor = (tabName) => {
    if (activeTab === tabName) {
      return theme.palette.secondary.light;
    }
    return 'white';
  };

  // Get active indicator style
  const getActiveStyle = (tabName) => {
    if (activeTab === tabName) {
      return {
        borderBottom: `3px solid ${theme.palette.secondary.light}`,
        borderRadius: 0,
        paddingBottom: '4px'
      };
    }
    return {};
  };

  return (
    <Box sx={{
      background: navbarBackground,
      px: { xs: 1.5, sm: 2 },
      py: 1.5,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1100,
    }}>
      {/* Left Section: Logo/Title */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1.5 
      }}>
        {isMobile && (
          <IconButton 
            color="inherit" 
            edge="start" 
            onClick={handleMobileMenuOpen}
            sx={{ color: 'white', mr: 1 }}
          >
            <MenuIcon size={24} />
          </IconButton>
        )}
        
        <Box sx={{
          background: `linear-gradient(135deg, ${theme.palette.secondary.light}, #66bb6a)`,
          borderRadius: '50%',
          padding: 0.8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }}>
          <Typography sx={{ 
            color: 'white', 
            fontSize: '1.2rem', 
            lineHeight: 1,
            fontWeight: 'bold',
          }}>
            •••
          </Typography>
        </Box>
        
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
            fontFamily: "'Poppins', sans-serif",
            display: { xs: 'none', sm: 'block' }
          }}
        >
          familYchaT
        </Typography>
      </Box>

      {/* Middle Section: Navigation Icons (hidden on mobile) */}
      {!isMobile && (
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 1, sm: 1.5, md: 2 }, 
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <Tooltip title="Home">
            <IconButton 
              sx={{ 
                color: getIconColor('home'),
                ...getActiveStyle('home'),
                transition: 'all 0.2s'
              }} 
              size="medium"
              onClick={() => handleNavItemClick('home')}
            >
              <Home size={20} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Chat">
            <IconButton
              sx={{
                color: getIconColor('chat'),
                ...getActiveStyle('chat'),
                transition: 'all 0.2s'
              }}
              size="medium"
              onClick={() => handleNavItemClick('chat')}
            >
              <Users size={20} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Settings">
            <IconButton 
              sx={{ 
                color: getIconColor('settings'),
                ...getActiveStyle('settings'),
                transition: 'all 0.2s'
              }} 
              size="medium"
              onClick={() => handleNavItemClick('settings')}
            >
              <Settings size={20} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Help">
            <IconButton 
              sx={{ 
                color: getIconColor('help'),
                ...getActiveStyle('help'),
                transition: 'all 0.2s'
              }} 
              size="medium"
              onClick={() => handleNavItemClick('help')}
            >
              <HelpCircle size={20} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Documents">
            <IconButton 
              sx={{ 
                color: getIconColor('documents'),
                ...getActiveStyle('documents'),
                transition: 'all 0.2s' 
              }} 
              size="medium"
              onClick={() => handleNavItemClick('documents')}
            >
              <FileText size={20} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* Right Section: Action Icons */}
      <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1.5 }, alignItems: 'center' }}>
        <Tooltip title="Search">
          <IconButton 
            sx={{ 
              color: 'white',
              backgroundColor: alpha('#ffffff', 0.1),
              '&:hover': {
                backgroundColor: alpha('#ffffff', 0.2),
              }
            }} 
            size="small"
          >
            <Search size={18} />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Notifications">
          <IconButton 
            sx={{ 
              color: 'white',
              backgroundColor: alpha('#ffffff', 0.1),
              '&:hover': {
                backgroundColor: alpha('#ffffff', 0.2),
              } 
            }} 
            size="small"
            onClick={handleNotificationsOpen}
          >
            <Badge 
              badgeContent={3} 
              color="error" 
              sx={{ 
                '& .MuiBadge-badge': {
                  backgroundColor: theme.palette.secondary.light,
                  border: `2px solid ${theme.palette.primary.dark}`,
                }
              }}
            >
              <Bell size={18} />
            </Badge>
          </IconButton>
        </Tooltip>
        
        <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          <IconButton 
            onClick={colorMode.toggleColorMode}
            sx={{ 
              color: 'white',
              backgroundColor: alpha('#ffffff', 0.1),
              '&:hover': {
                backgroundColor: alpha('#ffffff', 0.2),
              }
            }} 
            size="small"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>
        </Tooltip>
        
        <Box 
          onClick={handleProfileMenuOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: alpha('#ffffff', 0.1),
            borderRadius: 20,
            padding: '4px 8px 4px 4px',
            ml: 0.5,
            '&:hover': {
              backgroundColor: alpha('#ffffff', 0.2),
            }
          }}
        >
          <Box 
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: theme.palette.secondary.light,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: { xs: 0, sm: 1 }
            }}
          >
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>
              {userData.initials}
            </Typography>
          </Box>
          
          {!isMobile && (
            <>
              <Typography sx={{ color: 'white', fontSize: '0.9rem', fontWeight: 500 }}>
                {userData.name}
              </Typography>
              <ChevronDown size={16} color="white" style={{ marginLeft: 4 }} />
            </>
          )}
        </Box>
      </Box>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        sx={{ mt: 1.5 }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            width: 320,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
            maxHeight: 400,
            overflow: 'auto',
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', color: isDarkMode ? 'white' : 'inherit' }}>
            Notifications
          </Typography>
        </Box>
        
        <MenuItem 
          sx={{ 
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.15) },
            py: 1.5
          }} 
          onClick={handleNotificationsClose}
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="subtitle2" fontWeight="bold" color={isDarkMode ? 'white' : 'inherit'}>
                New Message
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 min ago
              </Typography>
            </Box>
            <Typography variant="body2" noWrap color={isDarkMode ? 'rgba(255,255,255,0.7)' : 'inherit'}>
              Sarah sent you a message: "Hey, are you available for..."
            </Typography>
          </Box>
        </MenuItem>
        
        <MenuItem sx={{ py: 1.5 }} onClick={handleNotificationsClose}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="subtitle2" fontWeight="bold" color={isDarkMode ? 'white' : 'inherit'}>
                File Shared
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 hour ago
              </Typography>
            </Box>
            <Typography variant="body2" noWrap color={isDarkMode ? 'rgba(255,255,255,0.7)' : 'inherit'}>
              Mike shared a document with you: "Project Report.pdf"
            </Typography>
          </Box>
        </MenuItem>
        
        <MenuItem sx={{ py: 1.5 }} onClick={handleNotificationsClose}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="subtitle2" fontWeight="bold" color={isDarkMode ? 'white' : 'inherit'}>
                Room Invitation
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Yesterday
              </Typography>
            </Box>
            <Typography variant="body2" noWrap color={isDarkMode ? 'rgba(255,255,255,0.7)' : 'inherit'}>
              You've been invited to join "Design Team" room
            </Typography>
          </Box>
        </MenuItem>
        
        <Box sx={{ p: 1.5, textAlign: 'center', borderTop: '1px solid', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
          <Typography 
            sx={{ 
              fontSize: '0.875rem', 
              color: theme.palette.primary.main, 
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            See all notifications
          </Typography>
        </Box>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        sx={{ mt: 1.5 }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            minWidth: 200,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            backgroundColor: isDarkMode ? '#2d2d2d' : 'white'
          }
        }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box 
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
              {userData.initials}
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight="bold" color={isDarkMode ? 'white' : 'inherit'}>
              {userData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.email}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <MenuItem onClick={handleProfileMenuClose} sx={{ gap: 1.5, py: 1 }}>
          <User size={16} />
          <Typography>Profile</Typography>
        </MenuItem>
        
        <MenuItem onClick={handleProfileMenuClose} sx={{ gap: 1.5, py: 1 }}>
          <Settings size={16} />
          <Typography>Account Settings</Typography>
        </MenuItem>
        
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography>Dark Mode</Typography>
          <Switch 
            checked={isDarkMode}
            onChange={colorMode.toggleColorMode}
            color="secondary"
          />
        </Box>

        <Divider />

        <MenuItem 
          onClick={() => {
            handleProfileMenuClose();
            setShowLogout(true);
          }} 
          sx={{ 
            color: theme.palette.error.main, 
            gap: 1.5, 
            py: 1
          }}
        >
          <LogoutIcon size={16} />
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        sx={{ mt: 1.5 }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            width: 200,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            backgroundColor: isDarkMode ? '#2d2d2d' : 'white'
          }
        }}
      >
        <MenuItem 
          onClick={() => handleNavItemClick('home')}
          sx={{ 
            backgroundColor: activeTab === 'home' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
            color: activeTab === 'home' ? theme.palette.primary.main : 'inherit',
            gap: 1.5,
            py: 1
          }}
        >
          <Home size={18} />
          <Typography>Home</Typography>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleNavItemClick('chat')}
          sx={{ 
            backgroundColor: activeTab === 'chat' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
            color: activeTab === 'chat' ? theme.palette.primary.main : 'inherit',
            gap: 1.5,
            py: 1
          }}
        >
          <Users size={18} />
          <Typography>Chat</Typography>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleNavItemClick('settings')}
          sx={{ 
            backgroundColor: activeTab === 'settings' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
            color: activeTab === 'settings' ? theme.palette.primary.main : 'inherit',
            gap: 1.5,
            py: 1
          }}
        >
          <Settings size={18} />
          <Typography>Settings</Typography>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleNavItemClick('help')}
          sx={{ 
            backgroundColor: activeTab === 'help' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
            color: activeTab === 'help' ? theme.palette.primary.main : 'inherit',
            gap: 1.5,
            py: 1
          }}
        >
          <HelpCircle size={18} />
          <Typography>Help</Typography>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleNavItemClick('documents')}
          sx={{ 
            backgroundColor: activeTab === 'documents' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
            color: activeTab === 'documents' ? theme.palette.primary.main : 'inherit',
            gap: 1.5,
            py: 1
          }}
        >
          <FileText size={18} />
          <Typography>Documents</Typography>
        </MenuItem>
      </Menu>
      
      {/* Logout Dialog */}
      <LogoutDialog open={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} />
    </Box>
  );
}

export default Navbar;

//................................................

// Navbar.jsx
// import React, { useState, useContext, useEffect } from 'react';
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
//   Button,
//   Avatar
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
//   Menu as MenuIcon,
//   MessageCircle
// } from 'lucide-react';
// import LogoutIcon from "@mui/icons-material/Logout";
// import LogoutDialog from "../components/LogoutDialog";
// import { getUserData } from '../utils/auth';

// // Import the ColorModeContext from the App component
// import { ColorModeContext } from '../App'; // Adjust the path as needed

// function Navbar({ activeTab = 'chat', onTabChange, recipientId, unreadMessages = [] }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
//   const [notificationsAnchor, setNotificationsAnchor] = useState(null);
//   const [showLogout, setShowLogout] = useState(false);
//   const [userData, setUserData] = useState({
//     name: 'Guest',
//     email: '',
//     initials: 'G'
//   });
  
//   // Access the color mode context
//   const colorMode = useContext(ColorModeContext);
//   const isDarkMode = theme.palette.mode === 'dark';

//   // State to track notifications
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);

//   useEffect(() => {
//     // Get the logged-in user data
//     const { username, userId, email } = getUserData();
    
//     // Use available data with fallbacks
//     const displayName = username || userId || recipientId || "Guest";
//     const userEmail = email || "";
    
//     // Format the name to be proper case (capitalize first letter of each word)
//     const formattedName = displayName.split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(' ');
    
//     // Generate initials from the name (first letter of first and last name)
//     const nameParts = formattedName.split(' ');
//     let initials = nameParts[0].charAt(0).toUpperCase();
    
//     if (nameParts.length > 1) {
//       initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
//     }
    
//     setUserData({
//       name: formattedName,
//       email: userEmail,
//       initials: initials
//     });
    
//     console.log("User data loaded:", { username, userId, email, formattedName, initials });
//   }, [recipientId]);

//   // Effect to handle unread message notifications
//   useEffect(() => {
//     if (unreadMessages && unreadMessages.length > 0) {
//       // Process unread messages into notifications
//       const newNotifications = unreadMessages.map(msg => ({
//         id: msg.id || Math.random().toString(36).substring(2),
//         type: 'message',
//         senderName: msg.senderName || 'Unknown User',
//         senderId: msg.senderId,
//         message: msg.content || 'New message',
//         timestamp: msg.timestamp || new Date(),
//         read: false,
//         avatarInitials: getInitialsFromName(msg.senderName || 'Unknown User')
//       }));
      
//       // Add new notifications to existing ones
//       setNotifications(prev => {
//         // Combine and remove duplicates by ID
//         const combined = [...newNotifications, ...prev];
//         return combined.filter((notification, index, self) => 
//           index === self.findIndex(n => n.id === notification.id)
//         );
//       });
      
//       // Update unread count
//       setUnreadCount(prev => prev + newNotifications.length);
//     }
//   }, [unreadMessages]);

//   // Helper to get initials from name
//   const getInitialsFromName = (name) => {
//     const nameParts = name.split(' ');
//     let initials = nameParts[0].charAt(0).toUpperCase();
    
//     if (nameParts.length > 1) {
//       initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
//     }
    
//     return initials;
//   };

//   // Format timestamp to relative time (e.g., "2 min ago")
//   const formatRelativeTime = (timestamp) => {
//     const now = new Date();
//     const date = new Date(timestamp);
//     const diffInSeconds = Math.floor((now - date) / 1000);
    
//     if (diffInSeconds < 60) {
//       return 'Just now';
//     }
    
//     const diffInMinutes = Math.floor(diffInSeconds / 60);
//     if (diffInMinutes < 60) {
//       return `${diffInMinutes} min ago`;
//     }
    
//     const diffInHours = Math.floor(diffInMinutes / 60);
//     if (diffInHours < 24) {
//       return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
//     }
    
//     const diffInDays = Math.floor(diffInHours / 24);
//     if (diffInDays === 1) {
//       return 'Yesterday';
//     }
    
//     if (diffInDays < 7) {
//       return `${diffInDays} days ago`;
//     }
    
//     // For older dates, return the actual date
//     return date.toLocaleDateString();
//   };

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
//     // Mark all notifications as read when closing the menu
//     if (notifications.some(notif => !notif.read)) {
//       setNotifications(notifications.map(notif => ({ ...notif, read: true })));
//       setUnreadCount(0);
//     }
//   };

//   // Handle clicking on a notification
//   const handleNotificationClick = (notification) => {
//     // Mark the specific notification as read
//     setNotifications(notifications.map(notif => 
//       notif.id === notification.id ? { ...notif, read: true } : notif
//     ));
    
//     // Update unread count
//     setUnreadCount(prev => Math.max(0, prev - 1));
    
//     // Open the chat with this sender
//     if (notification.type === 'message' && notification.senderId) {
//       if (onTabChange) {
//         onTabChange('chat', notification.senderId);
//       }
//     }
    
//     handleNotificationsClose();
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("userId");
//     sessionStorage.removeItem("email");
//     localStorage.removeItem("token");
//     window.location.href = "/login"; // Redirect to login page
//   };

//   // Handle tab change
//   const handleNavItemClick = (tab, params) => {
//     if (onTabChange) {
//       onTabChange(tab, params);
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

//   // Default notification examples - combine with unread messages
//   const defaultNotifications = [
//     {
//       id: 'notification1',
//       type: 'message',
//       senderName: 'Sarah',
//       senderId: 'sarah123',
//       message: 'Hey, are you available for...',
//       timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
//       read: false,
//       avatarInitials: 'SA'
//     },
//     {
//       id: 'notification2',
//       type: 'file',
//       senderName: 'Mike',
//       senderId: 'mike456',
//       message: 'Shared a document: "Project Report.pdf"',
//       timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
//       read: true,
//       avatarInitials: 'MI'
//     },
//     {
//       id: 'notification3',
//       type: 'invitation',
//       senderName: 'System',
//       message: 'You\'ve been invited to join "Design Team" room',
//       timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
//       read: true,
//       avatarInitials: 'SY'
//     }
//   ];

//   // Combine default notifications with user's unread messages
//   const allNotifications = [...notifications, ...defaultNotifications]
//     .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

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
//               badgeContent={unreadCount + 3} // Default (3) + unread message count
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
//               {userData.initials}
//             </Typography>
//           </Box>
          
//           {!isMobile && (
//             <>
//               <Typography sx={{ color: 'white', fontSize: '0.9rem', fontWeight: 500 }}>
//                 {userData.name}
//               </Typography>
//               <ChevronDown size={16} color="white" style={{ marginLeft: 4 }} />
//             </>
//           )}
//         </Box>
//       </Box>

//       {/* Enhanced Notifications Menu */}
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
//         <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', color: isDarkMode ? 'white' : 'inherit' }}>
//             Notifications
//           </Typography>
//           {unreadCount > 0 && (
//             <Typography variant="caption" sx={{ color: theme.palette.secondary.main }}>
//               {unreadCount} new
//             </Typography>
//           )}
//         </Box>
        
//         {allNotifications.length > 0 ? (
//           allNotifications.map((notification) => (
//             <MenuItem 
//               key={notification.id}
//               sx={{ 
//                 backgroundColor: !notification.read ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
//                 '&:hover': { backgroundColor: !notification.read ? alpha(theme.palette.primary.main, 0.15) : alpha(theme.palette.primary.main, 0.05) },
//                 py: 1.5,
//                 borderLeft: !notification.read ? `4px solid ${theme.palette.secondary.main}` : 'none',
//                 pl: !notification.read ? 1.5 : 2
//               }} 
//               onClick={() => handleNotificationClick(notification)}
//             >
//               <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
//                 <Avatar 
//                   sx={{ 
//                     width: 40, 
//                     height: 40, 
//                     bgcolor: notification.type === 'message' 
//                       ? theme.palette.primary.main 
//                       : notification.type === 'file' 
//                         ? theme.palette.info.main 
//                         : theme.palette.warning.main
//                   }}
//                 >
//                   {notification.type === 'message' ? (
//                     <MessageCircle size={18} />
//                   ) : notification.type === 'file' ? (
//                     <FileText size={18} />
//                   ) : (
//                     <Users size={18} />
//                   )}
//                 </Avatar>
                
//                 <Box sx={{ width: 'calc(100% - 56px)' }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//                     <Typography 
//                       variant="subtitle2" 
//                       fontWeight={!notification.read ? "bold" : "medium"} 
//                       color={isDarkMode ? 'white' : 'inherit'}
//                       noWrap
//                       sx={{ maxWidth: '70%' }}
//                     >
//                       {notification.senderName}
//                       {notification.senderId && <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
//                         • ID: {notification.senderId.substring(0, 5)}...
//                       </Typography>}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {formatRelativeTime(notification.timestamp)}
//                     </Typography>
//                   </Box>
//                   <Typography 
//                     variant="body2" 
//                     color={isDarkMode ? 'rgba(255,255,255,0.7)' : 'inherit'}
//                     sx={{
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                     }}
//                   >
//                     {notification.message}
//                   </Typography>
//                 </Box>
//               </Box>
//             </MenuItem>
//           ))
//         ) : (
//           <Box sx={{ p: 3, textAlign: 'center' }}>
//             <Typography color="text.secondary">No notifications</Typography>
//           </Box>
//         )}
        
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
//               {userData.initials}
//             </Typography>
//           </Box>
//           <Box>
//             <Typography fontWeight="bold" color={isDarkMode ? 'white' : 'inherit'}>
//               {userData.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {userData.email}
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
//           onClick={() => {
//             handleProfileMenuClose();
//             setShowLogout(true);
//           }} 
//           sx={{ 
//             color: theme.palette.error.main, 
//             gap: 1.5, 
//             py: 1
//           }}
//         >
//           <LogoutIcon size={16} />
//           <Typography>Logout</Typography>
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
      
//       {/* Logout Dialog */}
//       <LogoutDialog open={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} />
//     </Box>
//   );
// }

// export default Navbar;