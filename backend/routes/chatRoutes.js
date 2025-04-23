// // routes/chatRoutes.js
// import express from 'express';
// import { getChatHistory, sendMessage } from '../controllers/chatController.js';
// import { authenticate } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// router.get('/history/:userId', authenticate, getChatHistory); // for direct chat
// router.get('/history/:userId/room/:room', authenticate, getChatHistory); // for room chat
// router.post('/send', authenticate, sendMessage);

// export default router;

// routes/chatRoutes.js
// import express from 'express';
// import { getChatHistory, sendMessage } from '../controllers/chatController.js';
// import { authenticate } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Get chat history
// // For private chat: /history/:userId
// // For room chat: /history/:userId/room/:room
// router.get('/history/:userId', authenticate, getChatHistory); // private chat
// router.get('/history/:userId/room/:room', authenticate, getChatHistory); // room chat

// // Send message (either private or room)
// router.post('/send', authenticate, sendMessage);

// export default router;

// routes/chatRoutes.js
import express from 'express';
import { getPrivateChatHistory, getRoomChatHistory, sendMessage } from '../controllers/chatController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();

// Fetch private chat history
router.get('/history/:userId', authenticate, getPrivateChatHistory); // for direct chat
router.get('/history/:userId/room/:room', authenticate, getRoomChatHistory); // for room chat
router.post('/send', authenticate, sendMessage); // for sending a message
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
    try {
      const fileUrl = `/uploads/${req.file.filename}`;
  
      // Save the file as a message
      const message = new Message({
        userId: req.user._id,
        text: '', // optional
        fileUrl,
        recipientId: req.body.recipientId || null,
        room: req.body.room || null,
      });
  
      await message.save();
      res.status(200).json({ message: 'File sent successfully', fileUrl });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
export default router;
