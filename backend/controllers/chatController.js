// // controllers/chatController.js
// import Chat from '../models/Chat.js';

// export const getChatHistory = async (req, res) => {
//   const { room, userId } = req.params;

//   try {
//     let chatHistory;

//     if (room) {
//       chatHistory = await Chat.find({ room });
//     } else {
//       chatHistory = await Chat.find({ $or: [{ sender: userId }, { receiver: userId }] });
//     }

//     res.status(200).json(chatHistory);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching chat history', error: err });
//   }
// };

// export const sendMessage = async (req, res) => {
//   const { sender, receiver, room, text } = req.body;

//   try {
//     const newMessage = new Chat({ sender, receiver, room, text });
//     await newMessage.save();

//     res.status(201).json(newMessage);
//   } catch (err) {
//     res.status(500).json({ message: 'Error sending message', error: err });
//   }
// };


  
// import Chat from '../models/Chat.js';

// export const getChatHistory = async (req, res) => {
//   const { room, userId } = req.params;

//   try {
//     let chatHistory;

//     if (room) {
//       chatHistory = await Chat.find({ room });
//     } else {
//       chatHistory = await Chat.find({ 
//         $or: [{ sender: userId }, { receiver: userId }] 
//       });
//     }

//     res.status(200).json(chatHistory);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching chat history', error: err });
//   }
// };

// export const sendMessage = async (req, res) => {
//   const { sender, receiver, room, text } = req.body;

//   try {
//     const newMessage = new Chat({ sender, receiver, room, text });
//     await newMessage.save();

//     res.status(201).json(newMessage);
//   } catch (err) {
//     res.status(500).json({ message: 'Error sending message', error: err });
//   }
// };

// controllers/chatController.js
import Message from '../models/Chat.js';

// Fetch chat history for private chat
export const getPrivateChatHistory = async (req, res) => {
  const { userId, recipientId } = req.params;

  try {
    // Find messages between the user and the recipient
    const messages = await Message.find({
      $or: [
        { userId, recipientId },
        { userId: recipientId, recipientId: userId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch chat history for room chat
export const getRoomChatHistory = async (req, res) => {
  const { userId, room } = req.params;

  try {
    // Find all messages in the specified room
    const messages = await Message.find({ room }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send a message (either private or room)
export const sendMessage = async (req, res) => {
  const { userId, text, recipientId, room } = req.body;

  try {
    const message = new Message({
      userId,
      text,
      recipientId: recipientId || null, // null for room chat
      room: room || null, // null for private chat
    });

    await message.save();

    res.status(200).json({ message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
