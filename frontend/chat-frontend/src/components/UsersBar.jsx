import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  InputBase, 
  Badge, 
  IconButton,
  Divider 
} from '@mui/material'; 
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile 
} from 'lucide-react';

// Users Bar Component with Search Bar
function UsersBar({ users, activeUser, setActiveUser }) {
  const sortedUsers = [...users].sort((a, b) => {
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
            key={user.id}
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
              backgroundColor: activeUser === user.name ? '#8e24aa' : 'transparent',
            }}
            onClick={() => setActiveUser(user.name)}
          >
            <Box sx={{ position: 'relative', marginRight: 2 }}>
              <Avatar src={user.avatar} alt={user.name} sx={{ width: 48, height: 48 }} />
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
                  {user.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#e1bee7' }}>
                  {user.time}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#e1bee7', marginTop: 0.5 }}>
                {user.message}
              </Typography>
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
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", message: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", status: "online", unread: 0 },
    { id: 2, name: "Jessie Woo", message: "Working with you like dream!", time: "08:50", avatar: "/api/placeholder/80/80", status: "online", unread: 5 },
    { id: 3, name: "Amelia Nelson", message: "Hi there, How are you?", time: "08:30", avatar: "/api/placeholder/80/80", status: "offline", unread: 5 },
    { id: 4, name: "Samantha Martin", message: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
    { id: 5, name: "Chies Lie", message: "Working with you like dream!", time: "08:50", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
    { id: 6, name: "Nicolas Plum", message: "Hi there, How are you?", time: "08:30", avatar: "/api/placeholder/80/80", status: "online", unread: 0 },
    { id: 7, name: "Alexa Doe", message: "Cool!! Looks good...", time: "08:30", avatar: "/api/placeholder/80/80", status: "offline", unread: 0 },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: "John Doe", text: "Hi there, How are you?", time: "09:00", avatar: "/api/placeholder/80/80", isSelf: false },
    { id: 2, sender: "You", text: "Waiting for your reply. As I have to go back soon. I have to travel long distance.", time: "", avatar: "", isSelf: true },
    { id: 3, sender: "You", text: "Hi, I am coming there in few minutes. Please wait!! I am in taxi right now.", time: "", avatar: "", isSelf: true },
    { id: 4, sender: "John Doe", text: "Thank you very much, I am waiting here at StarBuck cafe.", time: "09:15", avatar: "/api/placeholder/80/80", isSelf: false },
  ]);

  const [activeUser, setActiveUser] = useState("John Doe");
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "",
        isSelf: true
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <Box sx={{ display: 'flex',  flexDirection: 'column', height: '100vh', backgroundColor: '#6a1b9a' }}>
      <Paper sx={{ margin: 'auto', width: '100%', height: '100vh', display: 'flex', flexDirection: 'row', borderRadius: '16px', boxShadow: 3 }}>
        
        {/* Left Sidebar */}
        <Box sx={{ width: '300px', backgroundColor: '#6a1b9a', color: 'white', display: 'flex', flexDirection: 'column' }}>
          {/* Users Bar with Search Bar */}
          <UsersBar users={users} activeUser={activeUser} setActiveUser={setActiveUser} />
        </Box>

        {/* Chat Area */}
        <Box sx={{ width: 'calc(100% - 300px)', background: 'linear-gradient(180deg, #6a1b9a 0%, #ab47bc 100%)', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ padding: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src={messages[0].avatar} alt={messages[0].sender} sx={{ width: 40, height: 40 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'white' }}>{activeUser}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography sx={{ backgroundColor: 'white', color: '#8e24aa', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', padding: '4px 12px', borderRadius: '20px' }}>
                CLEAR CHAT
              </Typography>
              <Typography sx={{ backgroundColor: 'white', color: '#8e24aa', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', padding: '4px 12px', borderRadius: '20px' }}>
                MORE
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 3 }}>
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  flexDirection: message.isSelf ? 'row-reverse' : 'row',
                  marginBottom: 3,
                  alignItems: 'flex-start',
                }}
              >
                <Avatar src={message.avatar} alt={message.sender} sx={{ width: 40, height: 40, margin: message.isSelf ? '0 0 0 8px' : '0 8px 0 0' }} />
                <Box sx={{ maxWidth: '70%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                      {message.sender}
                    </Typography>
                    {message.time && (
                      <Typography variant="caption" sx={{ color: '#e1bee7', marginLeft: 1 }}>
                        {message.time}
                      </Typography>
                    )}
                  </Box>
                  <Paper sx={{ 
                    padding: '8px 12px', 
                    backgroundColor: message.isSelf ? '#ffccbc' : '#8e24aa', 
                    color: 'white', 
                    borderRadius: '16px',
                    boxShadow: 'none',
                  }}>
                    <Typography variant="body2">{message.text}</Typography>
                  </Paper>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 1, backgroundColor: 'white', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}>
            <IconButton sx={{ color: '#8e24aa' }}><Smile size={20} /></IconButton>
            <IconButton sx={{ color: '#8e24aa' }}><Paperclip size={20} /></IconButton>
            <InputBase
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              sx={{ flexGrow: 1, backgroundColor: 'white', borderRadius: '20px', padding: '8px 16px', border: '1px solid #d1d1d1', fontSize: '0.875rem' }}
            />
            <IconButton sx={{ backgroundColor: '#26c6da', color: 'white', '&:hover': { backgroundColor: '#26c6da' } }} onClick={handleSendMessage}>
              <Send size={20} />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}


