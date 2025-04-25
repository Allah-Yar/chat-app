import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  saveMessage,
  getMessages,
  exportChatHistory,
  clearOldMessages,
  importChatHistory,
} from '../storage/chatStorage';
import { setSharedKey } from '../storage/sharedKey';
import { generateKey } from '../utils/generateKey';

const socket = io('http://localhost:3000'); // Replace with your server URL

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [newKey, setNewKey] = useState('');

  const loadMessages = async () => {
    const msgs = await getMessages();
    setChats(msgs);
  };

  const handleSend = async () => {
    const msg = { text: message, timestamp: new Date().toISOString() };
    socket.emit('sendMessage', msg);
    await saveMessage(msg);
    setChats((prev) => [...prev, msg]);
    setMessage('');
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await importChatHistory(file);
      loadMessages();
    }
  };

  const handleSetKey = () => {
    setSharedKey(newKey);
    alert('Shared key set!');
  };

  useEffect(() => {
    loadMessages();
    clearOldMessages(60); // 60 min expiry

    socket.on('receiveMessage', async (msg) => {
      await saveMessage(msg);
      setChats((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📩 Local Chat</h2>
      <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {chats.map((m, i) => (
          <div key={i}>• {m.text}</div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '100%', marginTop: '10px' }}
      />
      <button onClick={handleSend}>Send</button>
      <button onClick={exportChatHistory} style={{ marginLeft: '10px' }}>
        Export Chat
      </button>
      <input
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: 'block', marginTop: '10px' }}
      />

      <div style={{ marginTop: '20px' }}>
        <h4>🔐 End-to-End Encryption Key</h4>
        <input
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="Enter shared secret"
          style={{ width: '60%' }}
        />
        <button onClick={handleSetKey}>Set Key</button>
        <button onClick={() => setNewKey(generateKey())} style={{ marginLeft: '10px' }}>
          Generate Random Key
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
