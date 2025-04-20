// controllers/chatController.js
import Chat from '../models/Chat.js';

export const getChatHistory = async (req, res) => {
  const { room, userId } = req.params;

  try {
    let chatHistory;

    if (room) {
      chatHistory = await Chat.find({ room });
    } else {
      chatHistory = await Chat.find({ $or: [{ sender: userId }, { receiver: userId }] });
    }

    res.status(200).json(chatHistory);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching chat history', error: err });
  }
};

export const sendMessage = async (req, res) => {
  const { sender, receiver, room, text } = req.body;

  try {
    const newMessage = new Chat({ sender, receiver, room, text });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: 'Error sending message', error: err });
  }
};


  